import { Box } from "@mui/material";
import React from "react";

export default function ProjectBlockContainer({ children, sx }) {
  return (
    <Box
      className="ProjectBlockContainer utilCenter"
      sx={(theme) => ({
        width: "100%",
        padding: (theme) => `${theme.spacing(2)} ${theme.spacing(5)}`,
        [theme.breakpoints.up("md")]: {
          width: "50%",
          ...sx,
        },
      })}
    >
      {children}
    </Box>
  );
}
