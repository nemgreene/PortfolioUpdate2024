import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProjectVideo from "./ProjectVideo";
import ProjectBlockContainer from "./ProjectBlockContainer";
import ProjectImageList from "./ProjectImageList";

export default function ProjectBlock2({ blockData, index, setCarouselImages }) {
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
      className="projectBlock3"
    >
      <Box
        className="utilCenter"
        sx={(theme) => ({
          flexDirection: "column",
          [theme.breakpoints.up("md")]: {
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          },
        })}
      >
        <ProjectBlockContainer>
          <Grid container sx={{ flexDirection: "inherit" }}>
            <Grid item xs={12} lg={6}>
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
                  images={blockData.images}
                  setCarouselImages={setCarouselImages}
                />
              ) : null}
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 2, md: 3, lg: 4 },
              }}
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
        </ProjectBlockContainer>
      </Box>
    </Box>
  );
}
