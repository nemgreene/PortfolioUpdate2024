import React from "react";
import { styled } from "@mui/material";

export default function ProjectVideo({ src, alt, priority = -1 }) {
  const priorities = {
    // Hero banner
    0: (theme) => ({
      overflow: "hidden",
      width: "100%",
      height: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `${theme.spacing(5)} ${theme.spacing(0)}`,
      [theme.breakpoints.up("md")]: {
        height: "60vh",
        width: "70vw",
      },
    }),
  };

  const ProjectVideoBox = styled("div")(({ theme }) =>
    priorities[priority] ? priorities[priority](theme) : {}
  );

  return (
    <ProjectVideoBox>
      <embed
        width="100%"
        height="100%"
        src={src}
        title={src.alt}
        frameBorder="0"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </ProjectVideoBox>
  );
}
