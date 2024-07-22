import { useOutletContext, useParams } from "react-router-dom";
import { Box, Divider, Grid, Pagination } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DashSidebar from "./DashSidebar";
import { ApiClient } from "../../apiClient";
import { toast } from "react-toastify";
import {
  paramsExtraction,
  toastrConfig,
  pageSize,
  darkTheme,
  syncTrackedPosts,
} from "../Utility";
import { useNavigate } from "react-router-dom";
import StreamTable from "../StreamTable";
import { Link } from "react-router-dom";
import DashFilters from "./DashFilters";

export default function DashConsole({ client, credentials }) {
  // const { client, credentials } = useOutletContext();

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

  const handleChange = (event, value) => {
    setPage(value);
    changeDisplayPosts();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    loadTaggedData(value);
  };

  const params = useParams();

  const loadTaggedData = async (page = 1, reset = false) => {
    if (reset) {
      setPage(1);
      page = 1;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const ret = await client.getTaggedPosts(activeTags, page, trackedStream);
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
      changeDisplayPosts({ posts: [] });
      setPages(1);
    }
  };

  const loadStreams = async (index = trackedStream) => {
    //setup overhad initialization
    const streamOverhead = await client.getStreamHeaders(index);
    changeStreamHeaders(streamOverhead ? streamOverhead?.data : []);
    // if streams are being tracked, this should updated them as well
    // if (index.length > 0) {
    //   syncTrackedPosts(
    //     changeTrackedStream,
    //     streamOverhead ? streamOverhead?.data : []
    //   );
    // }
    const uniqueTags = [
      ...new Set(
        streamOverhead
          ? streamOverhead.data.reduce(
              (acc, next) => [...acc, ...next.tags],
              []
            )
          : []
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

  useEffect(() => {
    const [accessToken, _id] = [
      localStorage.getItem("accessToken"),
      localStorage.getItem("user_id"),
    ];
    if (accessToken && _id) {
      client.credentialsManager(accessToken, _id);
    }

    let { tags, streams } = paramsExtraction(params);
    changeDisplayPosts([]);
    changeActiveTags(tags || []);
    changeTrackedStream(streams || []);
    loadStreams(streams || []);
    changeInitialized(true);
  }, [params.streams, params.tags]);

  useEffect(() => {
    if (initialized) {
      if (trackedStream.length > 0) {
        setPage(1);
        loadTaggedData(1);
      } else {
        setPage(storedPage);
        loadTaggedData(storedPage);
      }
    }
  }, [trackedStream, activeTags]);
  return (
    <Box sx={{ width: "100%" }}>
      <DashFilters tags={tags} streamHeaders={streamHeaders} />
      <Divider
        flexItem
        variant="middle"
        sx={{
          bgcolor: "secondary.light",
        }}
      />
      <StreamTable
        activeTags={activeTags}
        client={client}
        trackedStream={trackedStream}
        // changeTrackedStream={changeTrackedStream}
        changeTrackedStream={() => {}}
        streamData={displayPosts?.posts}
        streamHeaders={streamHeaders}
        changeScrollRef={changeScrollRef}
        scrollRef={scrollRef}
        credentials={credentials}
        tags={tags}
        params={useParams()}
      />
      <Grid container>
        <Grid item xs={12} container justifyContent={"center"}>
          <Grid item>
            <br />
            <Pagination
              variant="outlined"
              shape="rounded"
              showFirstButton={page != 1}
              showLastButton={page != pages}
              page={page}
              size="large"
              onChange={handleChange}
              count={pages}
            />
          </Grid>
        </Grid>
      </Grid>
      ;
    </Box>
  );
}
