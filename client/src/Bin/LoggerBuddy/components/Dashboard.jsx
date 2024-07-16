import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import HomeDrawer from "./HomeDrawer";
import StreamTable from "./StreamTable";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { drawerWidth } from "./Utility";

export default function Dashboard({
  tags,
  page,
  pages,
  client,
  scrollRef,
  credentials,
  activeTags,
  changeActiveTags,
  displayPosts,
  handleChange,
  streamHeaders,
  trackedStream,
  changeScrollRef,
  changeTrackedStream,
  loadStreams,
  setPage,
  loadTaggedData,
  storedPage,
}) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const [accessToken, _id] = [
      localStorage.getItem("accessToken"),
      localStorage.getItem("user_id"),
    ];
    if (accessToken && _id) {
      client.credentialsManager(accessToken, _id);
    }
    loadStreams();
  }, []);

  useEffect(() => {
    if (trackedStream.length > 0) {
      setPage(1);
      loadTaggedData(1);
    } else {
      setPage(storedPage);
      loadTaggedData(storedPage);
    }
  }, [trackedStream, activeTags]);

  return (
    <div className="LoggerBuddy">
      <HomeDrawer
        tags={tags}
        client={client}
        credentials={credentials}
        open={open}
        activeTags={activeTags}
        changeActiveTags={changeActiveTags}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        streamHeaders={streamHeaders}
        changeTrackedStream={changeTrackedStream}
        trackedStream={trackedStream}
      >
        <StreamTable
          drawerOpen={open}
          client={client}
          trackedStream={trackedStream}
          changeTrackedStream={changeTrackedStream}
          streamData={displayPosts?.posts}
          streamHeaders={streamHeaders}
          // streamData={displayPosts.posts}
          // streamData={[]}
          changeScrollRef={changeScrollRef}
          scrollRef={scrollRef}
          credentials={credentials}
          tags={tags}
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
      </HomeDrawer>
    </div>
  );
}
//
