import { Box, Typography } from "@mui/material";
import React from "react";
import ProjectVideo from "./ProjectVideo";
import ProjectBlockContainer from "./ProjectBlockContainer";

export default function ProjectBlock0({ blockData }) {
  return (
    <Box
      className="projectBlock0"
      sx={{
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        pb: 5,
      }}
    >
      <Box className="utilCenter">
        {blockData?.videos?.map((v, i) => (
          <ProjectVideo
            key={i}
            src={v.src}
            alt={v.alt}
            priority={v.priority}
          ></ProjectVideo>
        ))}
        {blockData?.images ? (
          <Box
            className="utilCenter"
            sx={{ width: "100%", maxHeight: "20vh", overflow: "hidden" }}
          >
            <img
              style={{ width: "100%", opacity: 0.5 }}
              src={blockData.images[0].src}
              alt={blockData.images[0].alt}
            ></img>
            {blockData.images[0].title ? (
              <Box sx={{ position: "absolute" }}>
                <Typography variant={"h1"} className="ProjectHeroTitle">
                  {blockData.images[0].title}
                </Typography>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
