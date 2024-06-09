import { Box, Typography } from "@mui/material";
import React from "react";

export default function Scroller({
  loopers = 3,
  sx = {},
  variant = "p",
  labels = ["looper"],
  duration = 15,
}) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        height: "fit-content",
        top: 0,
        bottom: 0,
        ...sx,
        "& .loopContainer": {
          aniamtion: "animation: loopText 1s infinite linear;",
        },
      }}
      className="loopersContianer"
    >
      <section className="loopContainer">
        {new Array(loopers).fill("").map((_, lIndex) => (
          <span
            className="loopElem"
            key={lIndex}
            style={{ animationDuration: `${duration}s` }}
          >
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                ...sx,
              }}
              variant={variant}
            >
              {labels.map((v, i) => (
                <span key={i}>{v}</span>
              ))}
            </Typography>
          </span>
        ))}
      </section>
    </Box>
  );
}
