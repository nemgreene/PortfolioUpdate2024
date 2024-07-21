import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BioDrawer from "../BioBar";
import TagSelect from "../TagSelect";
import { drawerWidth, paramsExtraction, taggedParams } from "../Utility";
import StreamSelect from "../StreamSelect";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

export default function DashFilters({ activeTags, tags, streamHeaders }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleTagChange = (e) => {
    const { tags, streams } = paramsExtraction(params);
    const url = taggedParams({
      url: location,
      tags: e,
      streams,
    });
    navigate(url);
  };
  const handleStreamChange = (e) => {
    const { tags, streams } = paramsExtraction(params);

    navigate(
      taggedParams({ url: location, tags, streams: e.map((v) => v.streamId) })
    );
    // changeTrackedStream(e);
  };

  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={1}></Grid>
      <Grid
        item
        container
        sx={{
          hieght: "100%",
          alignItems: "center",
          padding: "0px 10px",
        }}
        xs={5}
      >
        <TagSelect
          options={tags || []}
          value={paramsExtraction(params)?.tags?.filter((v) => v !== "*") || []}
          // setValue={changeActiveTags}
          setValue={handleTagChange}
          label={"Filter posts by tag..."}
        />
      </Grid>
      <Grid
        item
        container
        sx={{
          hieght: "100%",
          alignItems: "center",
          padding: "0px 10px",
        }}
        xs={5}
      >
        <StreamSelect
          options={streamHeaders}
          // options={streamHeaders.map((stream) => stream.streamName)}

          value={
            streamHeaders.filter((v) =>
              paramsExtraction(params)?.streams?.includes(v.streamId)
            ) || []
          }
          setValue={(e) => {
            handleStreamChange(e);
            // changeTrackedStream(e);
          }}
          label={"Filter posts by Stream..."}
        ></StreamSelect>
      </Grid>
    </Grid>
  );
}
