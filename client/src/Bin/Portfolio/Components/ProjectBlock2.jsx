import { Box, ImageListItemBar, Typography } from "@mui/material";
import React from "react";
import ProjectVideo from "./ProjectVideo";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ProjectBlockContainer from "./ProjectBlockContainer";
import ProjectImageList from "./ProjectImageList";

export default function ProjectBlock3({ blockData, index, setCarouselImages }) {
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
        <ProjectBlockContainer sx={{ width: "66%" }}>
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
        </ProjectBlockContainer>
        <ProjectBlockContainer sx={{ width: "33%" }}>
          <Box>
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
          </Box>
        </ProjectBlockContainer>
      </Box>
    </Box>
  );
}
