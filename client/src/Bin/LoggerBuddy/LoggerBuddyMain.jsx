// import React from "react";

// export default function LoggerBuddyMain() {
//   return <div>LoggerBuddyMain</div>;
// }

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiClient } from "./apiClient";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/Admin";
import LoginComponent from "./components/Login";
import ScrumBoard from "./components/pages/ScrumBoard/ScrumBoard";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import {
  toastrConfig,
  pageSize,
  darkTheme,
  syncTrackedPosts,
} from "./components/Utility";
import PostPage from "./components/pages/ScrumBoard/PostPage";

// import LoginComponent from "./components/public/LoginComponent";
// import RegisterCard from "./components/public/RegisterCard";
const modalHandler = (status, message, config = undefined) => {
  if (status < 300) {
    toast.success(message, { ...toastrConfig });
  } else if (status >= 300 && status < 400) {
    toast.warning(message, { ...toastrConfig });
  } else {
    toast.error(message, { ...toastrConfig });
  }
};
function ProtectedRoute({ redirect = "/loggerBuddy/dash", children }) {
  const accessToken = localStorage.getItem("accessToken");
  // if (!accessToken) {
  //   return <Navigate to={redirect} replace />;
  // }
  return children;
}

function LoggerBuddyMain() {
  //#region Routing
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    accessToken: undefined,
    _id: undefined,
  });

  const credentialsManager = (accessToken, _id) => {
    setCredentials({
      accessToken,
      _id,
    });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user_id", _id);
  };

  const logoutHandler = async () => {
    setCredentials({
      accessToken: undefined,
      _id: undefined,
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    // modalHandler(200, "Logged out successful");
  };

  const redirectHandler = (url) => {
    navigate(url);
  };

  const [storedStream, changeStoredStream] = useState({});
  const [displayPosts, changeDisplayPosts] = useState();
  const [streamHeaders, changeStreamHeaders] = useState([]);
  const [trackedStream, changeTrackedStream] = useState([]);
  const [tags, changeTags] = useState([]);
  const [scrollRef, changeScrollRef] = useState();
  const [storedPage, changeStoredPage] = useState(1);
  const [activeTags, changeActiveTags] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    changeDisplayPosts();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    loadTaggedData(value);
  };

  const loadTaggedData = async (page = 1, reset = false) => {
    if (reset) {
      setPage(1);
      page = 1;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const ret = await client.getTaggedPosts(
      activeTags,
      page,
      trackedStream.map((v) => v.streamId)
    );
    if (ret.data) {
      const { streams, posts } = ret.data;
      changeDisplayPosts({ posts });

      setPages(
        Math.ceil(
          streams
            ? streams?.reduce((acc, next) => acc + next.posts, 0) / pageSize
            : 0
        )
      );
    } else {
      changeDisplayPosts([]);
      setPages(1);
    }
  };

  const loadStreams = async (index = trackedStream) => {
    //setup overhad initialization
    const streamOverhead = await client.getStreamHeaders(index);
    changeStreamHeaders(streamOverhead.data);
    //if streams are being tracked, this should updated them as well
    if (trackedStream.length > 0) {
      syncTrackedPosts(changeTrackedStream, streamOverhead.data);
    }
    const uniqueTags = [
      ...new Set(
        streamOverhead.data.reduce((acc, next) => [...acc, ...next.tags], [])
      ),
    ];
    changeTags(uniqueTags);

    const totalPages = Math.ceil(
      streamOverhead.data
        ? streamOverhead.data?.reduce((acc, next) => acc + next.posts, 0) /
            pageSize
        : 0
    );
    setPages(totalPages);
  };

  const client = new ApiClient(
    () => ({
      accessToken: credentials.accessToken,
      _id: credentials._id,
    }),
    () => logoutHandler(),
    modalHandler,
    redirectHandler,
    credentialsManager,
    loadTaggedData,
    loadStreams
  );

  return (
    <div className="appContainer">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Routes>
          <Route
            path="/login"
            element={
              <LoginComponent client={client} setCredentials={setCredentials} />
            }
          />
          {/* <Route path="/register" element={<RegisterCard client={client} />} /> */}
          {/* <Route
          path="/"
          element={
            <ProtectedRoute>
            <Dashboard client={client} logoutHandler={logoutHandler} />
            </ProtectedRoute>
            }
            /> */}
          <Route
            path="/"
            // path={["/", "/:tags", "/:stream", "/:tags/:stream"]}
            // path={["/project/:context", "/project/:context/:var1"]}
          >
            {["", ":tags?", ":tags?/:stream?"].map((v, i) => (
              <Route
                key={i}
                index={i === 0}
                path={v}
                element={
                  <ProtectedRoute>
                    <Dashboard
                      setPage={setPage}
                      loadTaggedData={loadTaggedData}
                      storedPage={storedPage}
                      activeTags={activeTags}
                      changeActiveTags={changeActiveTags}
                      tags={tags}
                      page={page}
                      pages={pages}
                      client={client}
                      scrollRef={scrollRef}
                      credentials={credentials}
                      loadStreams={loadStreams}
                      displayPosts={displayPosts}
                      trackedStream={trackedStream}
                      streamHeaders={streamHeaders}
                      handleChange={handleChange}
                      logoutHandler={logoutHandler}
                      changeScrollRef={changeScrollRef}
                      changeDisplayPosts={changeDisplayPosts}
                      changeTrackedStream={(e) => {
                        changeDisplayPosts();
                        if (!trackedStream) {
                          changeStoredPage(page);
                        }
                        changeTrackedStream(e);
                      }}
                    />
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>

          <Route
            path="/scrum/:trackedStream"
            element={<ScrumBoard client={client} credentials={credentials} />}
          />
          <Route
            path="/post/:postId"
            element={<PostPage client={client} credentials={credentials} />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard
                  tags={tags}
                  changeStreamHeaders={changeStreamHeaders}
                  client={client}
                  streamHeaders={streamHeaders}
                  storedStream={storedStream}
                  changeStoredStream={changeStoredStream}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/loggerBuddy/" />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default LoggerBuddyMain;
