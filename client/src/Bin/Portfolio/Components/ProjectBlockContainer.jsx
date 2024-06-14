import { Box } from "@mui/material";
import React from "react";
import Rail from "../Components/Rail";

export default function ProjectBlockContainer({ children, sx, rail = true }) {
  return (
    <Box
      className="ProjectBlockContainer utilCenter"
      sx={(theme) => ({
        height: "fit-content",
        minHeight: { xs: "400px", md: "100vh" },
        pl: { xs: 3, md: 5, lg: 8 },
        pr: { xs: 3, md: 5, lg: 8 },
        position: "relative",
        ...sx,
      })}
    >
      {children}
    </Box>
  );
}
