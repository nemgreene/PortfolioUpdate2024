import { Typography, styled } from "@mui/material";
import React from "react";

export default function ProjectImage({ image }) {
  const { priority, src, alt } = image;

  return (
    <ProjectImageBox className="utilCenter">
      {block?.title ? (
        <Typography
          className="ProjectHeroTitle"
          sx={{
            whiteSpace: "nowrap",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="h1"
        >
          {block?.title}
        </Typography>
      ) : null}
      <img
        src={src}
        alt={alt}
        style={{
          maxHeight: "100%",
        }}
      ></img>
    </ProjectImageBox>
  );
}
