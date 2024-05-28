import { Box } from "@mui/material";
import React from "react";

export default function Grid({ gridSize = 50 }) {
  return (
    <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <rect width={gridSize} height={gridSize} fill="url(#smallGrid)" />
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={theme.palette.common.whiteLowContrast}
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </Box>
  );
}
