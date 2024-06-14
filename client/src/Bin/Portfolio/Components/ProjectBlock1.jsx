import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import ProjectVideo from "./ProjectVideo";
import ProjectImageList from "./ProjectImageList";
import ProjectBlockContainer from "./ProjectBlockContainer";

export default function ProjectBlock1({ blockData, setCarouselImages }) {
  const theme = useTheme();
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
      })}
      className="projectBlock1"
    >
      <ProjectBlockContainer
        sx={{ flexDirection: "column", flexWrap: "no-wrap" }}
      >
        <Box
          className="utilCenter"
          sx={{ flexGrow: 1, width: "100%" }}
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
        {blockData.header || blockData.p ? (
          <Box className="utilCenter" sx={{ p: { xs: 2, md: 5 } }}>
            {blockData.header ? (
              <Box width="100%">
                <Typography variant="h3">{blockData.header}</Typography>
              </Box>
            ) : null}
            {blockData.p ? (
              <Box width="100%">
                <Typography whiteSpace="pre-line" variant="p">
                  {blockData.p}
                </Typography>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </ProjectBlockContainer>
    </Box>
  );
}
