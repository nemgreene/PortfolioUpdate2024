import { Box, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";

export default memo(function LooperBG({ index }) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      className="loopersContianer"
    >
      {new Array(13).fill("").map((_, cIndex) => (
        <section className="loopContainer" key={cIndex}>
          {new Array(3).fill("").map((_, lIndex) => (
            <span className="loopElem" key={lIndex}>
              <Typography
                sx={(theme) => ({
                  lineHeight: 0.75,
                  fontFamily: '"Danfo", ' + theme.typography.fontFamily,
                  fontSize: `calc(${theme.typography.h1.fontSize} * 2.5)`,
                  color: theme.palette.common.eerieBlack,
                })}
                className="danfoOutlined"
              >
                <span>&nbsp;{index === 0 ? "Subject" : "Projects"}</span>
              </Typography>
            </span>
          ))}
        </section>
      ))}
    </Box>
  );
});
