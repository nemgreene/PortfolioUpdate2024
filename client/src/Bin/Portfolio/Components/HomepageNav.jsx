import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import HoverButton from "./HoverButton";
import { animated } from "react-spring";

export default function HomepageNav({ gridSprings }) {
  const theme = useTheme();
  const navButtonStyles = {
    position: "relative",
    // borderLeft: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
    // // borderRight: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
    // // borderTop: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
    // borderBottom: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
    // [theme.breakpoints.up("md")]: {
    //   // backgroundColor: red[500],
    //   borderLeft: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
    //   borderBottom: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
    // },
  };
  const flex = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const Rail = ({ x1, x2, y1, y2 }) => (
    <svg
      height="100%"
      width="100%"
      viewBox="0 0 100 100"
      style={{
        zIndex: 0,
        position: "absolute",
      }}
      preserveAspectRatio="none"
    >
      <animated.line
        x1={flex ? x1 : y1}
        x2={flex ? x2 : y2}
        y1={flex ? y1 : x1}
        y2={flex ? y2 : x2}
        vectorEffect="non-scaling-stroke"
        strokeWidth={theme.shape.hudThickness * 2}
        stroke={theme.shape.hudLowContrast}
      />
    </svg>
  );

  return (
    <Grid
      container
      sx={{
        flexDirection: "row-reverse",
        position: "relative",
      }}
    >
      <Rail
        x1={"0%"}
        y1={0}
        x2={gridSprings[0].x2.to((x2) => `${x2}%`)}
        y2={0}
      />
      <Rail
        x1={"0%"}
        y1={`100`}
        x2={gridSprings[1].x2.to((x2) => `${x2}%`)}
        y2={`100`}
      />
      <Rail
        x1={0}
        x2={0}
        y1={`0`}
        y2={gridSprings[2].x2.to((x2) => `${x2}%`)}
      />
      <Rail
        x1={100}
        x2={100}
        y1={`0`}
        y2={gridSprings[7].x2.to((x2) => `${x2}%`)}
      />

      <Grid container item xs={12} md={6}>
        <Grid sx={{ ...navButtonStyles }} item xs={12} md={2}>
          <Rail
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[3].x2.to((x2) => `${x2}%`)}
          />
          <HoverButton label={"Projects"} />
        </Grid>
        <Grid sx={{ ...navButtonStyles }} item xs={12} md={2}>
          <Rail
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[4].x2.to((x2) => `${x2}%`)}
          />
          <HoverButton label={"About"} />
        </Grid>
        <Grid sx={{ ...navButtonStyles, border: "0px" }} item xs={12} md={6}>
          <Rail
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[5].x2.to((x2) => `${x2}%`)}
          />
        </Grid>
        <Grid sx={{ ...navButtonStyles }} item xs={12} md={2}>
          <Rail
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[6].x2.to((x2) => `${x2}%`)}
          />

          <HoverButton label={"Contact"} />
        </Grid>
      </Grid>
      <Grid sx={{ ...navButtonStyles }} item xs={12} md={6}>
        Scrolling banner
      </Grid>
    </Grid>
  );
}
