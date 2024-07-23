import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  Outlet,
  useParams,
  useOutletContext,
} from "react-router-dom";
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
  paramsExtraction,
} from "./components/Utility";
import PostPage from "./components/pages/ScrumBoard/PostPage";
import Dev from "./Dev";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import DashSidebar from "./components/Dash/DashSidebar";
import DashConsole from "./components/Dash/DashConsole";
import DashContainer from "./components/Dash/DashContainer";

const modalHandler = (status, message, config = undefined) => {
  if (status < 300) {
    toast.success(message, { ...toastrConfig });
  } else if (status >= 300 && status < 400) {
    toast.warning(message, { ...toastrConfig });
  } else {
    toast.error(message, { ...toastrConfig });
  }
};
function ProtectedRoute({ redirect = "/loggerBuddy", children }) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return <Navigate to={redirect} replace />;
  }
  return children;
}

export default function LoggerBuddyMain2() {
  // #region

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    accessToken: undefined,
    _id: undefined,
  });
  const [storedStream, changeStoredStream] = useState({});
  const [displayPosts, changeDisplayPosts] = useState();
  const [streamHeaders, changeStreamHeaders] = useState([]);
  const [trackedStream, changeTrackedStream] = useState([]);
  const [tags, changeTags] = useState([]);
  const [scrollRef, changeScrollRef] = useState();
  const [storedPage, changeStoredPage] = useState(1);
  const [activeTags, changeActiveTags] = useState([]);
  const [initialized, changeInitialized] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

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

  const client = new ApiClient(
    () => ({
      accessToken: credentials.accessToken,
      _id: credentials._id,
    }),
    () => logoutHandler(),
    modalHandler,
    redirectHandler,
    credentialsManager
    // loadTaggedData,
    // loadStreams
  );
  // #endregion

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/scrum/:trackedStream"
          element={<ScrumBoard client={client} credentials={credentials} />}
        />
        <Route
          path="/login"
          element={
            <LoginComponent client={client} setCredentials={setCredentials} />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard client={client} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:postId"
          element={<PostPage client={client} credentials={credentials} />}
        />
        <Route
          path="/"
          element={<DashContainer credentials={credentials} client={client} />}
        >
          {["", ":tags?/:streams?/:page?"].map((v, i) => (
            <Route
              key={i}
              path={v}
              element={
                <DashConsole client={client} credentials={credentials} />
              }
            ></Route>
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

// import { useState, useEffect } from "react";
// import {
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   Outlet,
//   useParams,
//   useOutletContext,
// } from "react-router-dom";
// import { toast } from "react-toastify";
// import { ApiClient } from "./apiClient";
// import Dashboard from "./components/Dashboard";
// import AdminDashboard from "./components/Admin";
// import LoginComponent from "./components/Login";
// import ScrumBoard from "./components/pages/ScrumBoard/ScrumBoard";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   toastrConfig,
//   pageSize,
//   darkTheme,
//   syncTrackedPosts,
//   paramsExtraction,
// } from "./components/Utility";
// import PostPage from "./components/pages/ScrumBoard/PostPage";
// import Dev from "./Dev";
// import { Box, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import DashSidebar from "./components/Dash/DashSidebar";
// import DashConsole from "./components/Dash/DashConsole";
// import DashContainer from "./components/Dash/DashContainer";

// const modalHandler = (status, message, config = undefined) => {
//   if (status < 300) {
//     toast.success(message, { ...toastrConfig });
//   } else if (status >= 300 && status < 400) {
//     toast.warning(message, { ...toastrConfig });
//   } else {
//     toast.error(message, { ...toastrConfig });
//   }
// };

// export default function LoggerBuddyMain2() {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({
//     accessToken: undefined,
//     _id: undefined,
//   });
//   const [storedStream, changeStoredStream] = useState({});
//   const [displayPosts, changeDisplayPosts] = useState();
//   const [streamHeaders, changeStreamHeaders] = useState([]);
//   const [trackedStream, changeTrackedStream] = useState([]);
//   const [tags, changeTags] = useState([]);
//   const [scrollRef, changeScrollRef] = useState();
//   const [storedPage, changeStoredPage] = useState(1);
//   const [activeTags, changeActiveTags] = useState([]);
//   const [initialized, changeInitialized] = useState(false);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);

//   const credentialsManager = (accessToken, _id) => {
//     setCredentials({
//       accessToken,
//       _id,
//     });
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("user_id", _id);
//   };

//   const logoutHandler = async () => {
//     setCredentials({
//       accessToken: undefined,
//       _id: undefined,
//     });
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user_id");
//     // modalHandler(200, "Logged out successful");
//   };

//   const redirectHandler = (url) => {
//     navigate(url);
//   };

//   const client = new ApiClient(
//     () => ({
//       accessToken: credentials.accessToken,
//       _id: credentials._id,
//     }),
//     () => logoutHandler(),
//     modalHandler,
//     redirectHandler,
//     credentialsManager
//     // loadTaggedData,
//     // loadStreams
//   );

//   return (
//     <div className="appContainer">
//       <ThemeProvider theme={darkTheme}>
//         <CssBaseline />
//         <Routes>
//           <Route
//             path={"/"}
//             element={<DashContainer context={{ client, credentials }} />}
//           >
//             {["", ":tags?", ":tags?/:streams?"].map((v, i) => (
//               <Route
//                 key={i}
//                 index={i === 0}
//                 path={v}
//                 element={
//                   <DashConsole
//                     context={{
//                       client,
//                       credentials,
//                     }}
//                   />
//                 }
//               ></Route>
//             ))}
//           </Route>
//           <Route
//             path="/post/:postId"
//             element={<PostPage client={client} credentials={credentials} />}
//           />
//           <Route path="*" element={<Navigate to="/dev" />} />
//         </Routes>
//       </ThemeProvider>
//     </div>
//   );
// }
