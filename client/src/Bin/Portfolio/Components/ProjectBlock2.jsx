import { Box, Typography, Grid, useTheme } from "@mui/material";
import React from "react";
import ProjectVideo from "./ProjectVideo";
import ProjectBlockContainer from "./ProjectBlockContainer";
import ProjectImageList from "./ProjectImageList";

export default function ProjectBlock3({ blockData, index, setCarouselImages }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        // padding: (theme) => `${theme.spacing(5)} ${theme.spacing(0)}`,
      }}
      className="projectBlock2"
    >
      <Box
        className="utilCenter"
        sx={(theme) => ({
          flexDirection: index % 2 === 0 ? "column" : " column-reverse",
          [theme.breakpoints.up("md")]: {
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          },
        })}
      >
        <ProjectBlockContainer>
          <Grid container sx={{ flexDirection: "inherit" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              lg={9}
            >
              {blockData?.videos?.map((v, i) => (
                <ProjectVideo
                  key={i}
                  src={v.src}
                  alt={v.alt}
                  priority={v.priority}
                ></ProjectVideo>
              ))}
              {blockData?.images ? (
                <ProjectImageList
                  images={blockData?.images}
                  setCarouselImages={setCarouselImages}
                />
              ) : null}
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              lg={3}
              sx={{ p: { xs: 2, md: 5 } }}
            >
              {blockData.header ? (
                <Box display="flex" justifyContent="center">
                  <Typography p={(t) => `${t.spacing(5)}`} variant="h3">
                    {blockData.header}
                  </Typography>
                </Box>
              ) : null}
              {blockData.p ? (
                <Box>
                  <Typography whiteSpace="pre-line" variant="p">
                    {blockData.p}
                  </Typography>
                </Box>
              ) : null}
            </Grid>
          </Grid>
          <Box></Box>
        </ProjectBlockContainer>
      </Box>
    </Box>
  );
}
