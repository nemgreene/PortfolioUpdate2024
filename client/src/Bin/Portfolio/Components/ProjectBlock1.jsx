import { Box, Typography } from "@mui/material";
import React from "react";
import ProjectVideo from "./ProjectVideo";
import ProjectImageList from "./ProjectImageList";
import ProjectBlockContainer from "./ProjectBlockContainer";

export default function ProjectBlock1({ blockData, setCarouselImages }) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        // padding: ` ${theme.spacing(5)} `,
      })}
      className="test"
    >
      <ProjectBlockContainer sx={{ width: "100%" }}>
        <Box
          className="utilCenter"
          // sx={(theme) => ({
          //   // padding: ` ${theme.spacing(5)} `,
          // })}
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
              images={blockData.images}
              setCarouselImages={setCarouselImages}
            />
          ) : null}
        </Box>
      </ProjectBlockContainer>
      <ProjectBlockContainer sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {blockData.header ? (
            <Box>
              <Typography variant="h3">{blockData.header}</Typography>
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
  );
}
