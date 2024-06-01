import { Box, Button, Hidden, Typography, useTheme } from "@mui/material";
import React from "react";
export default function HoverButton({
  primary,
  secondary,
  label,
  sx = {},
  onClick,
}) {
  const theme = useTheme();
  primary = primary ? primary : theme.palette.common.eerieBlack;
  secondary = secondary ? secondary : theme.palette.common.white;

  const offset = 100;
  const duration = 0.5;
  return (
    <Box
      onClick={() => {
        setTimeout(() => {
          if (onClick) {
            onClick();
          }
        }, duration);
      }}
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        zIndex: 10,
        "& .hoverButtonSX": { width: "100%", p: 1 },

        "& .hoverButtonAperture": {
          transition: `${duration}s`,
          transform: `translateY(calc(${offset} * 1%))`,
          "& .hoverButtonSecondary": {
            transform: `translateY(calc(${offset} * -1%))`,
            transition: `${duration}s`,
          },
        },

        "&:hover": {
          "& .hoverButtonAperture": {
            transform: `translateY(0)`,
            bgcolor: secondary,
            transition: `${duration}s`,
            "& .hoverButtonSecondary": {
              transform: `translateY(0)`,
              transition: `${duration}s`,
            },
          },
        },
        ...sx,
      }}
    >
      <Box>
        <Box className="hoverButtonSX">
          <Typography
            variant="h5"
            align="center"
            sx={{ fontSize: "30px", color: secondary }}
          >
            {label}
          </Typography>
        </Box>
      </Box>
      <Box
        className="hoverButtonAperture"
        sx={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          className="hoverButtonSX hoverButtonSecondary"
          sx={{
            position: "absolute",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontSize: "30px", color: primary }}
          >
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
