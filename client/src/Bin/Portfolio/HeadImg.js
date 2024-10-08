import React, { useRef, useState } from "react";
import FrameA from "../../Images/Portfolio/1.png";
import FrameB from "../../Images/Portfolio/2.png";
import FrameC from "../../Images/Portfolio/3.png";
import FrameD from "../../Images/Portfolio/4.png";
import FrameE from "../../Images/Portfolio/5.png";
import FrameF from "../../Images/Portfolio/6.png";
import FrameG from "../../Images/Portfolio/7.png";
import FrameH from "../../Images/Portfolio/8.png";
import FrameI from "../../Images/Portfolio/9.png";
import FrameJ from "../../Images/Portfolio/10.png";
import FrameK from "../../Images/Portfolio/11.png";
import FrameL from "../../Images/Portfolio/12.png";
import FrameM from "../../Images/Portfolio/13.png";
import FrameN from "../../Images/Portfolio/14.png";
import FrameO from "../../Images/Portfolio/15.png";
import FrameP from "../../Images/Portfolio/16.png";
import FrameQ from "../../Images/Portfolio/17.png";
import FrameR from "../../Images/Portfolio/18.png";
import FrameS from "../../Images/Portfolio/19.png";
import FrameT from "../../Images/Portfolio/20.png";
import FrameU from "../../Images/Portfolio/21.png";
import FrameV from "../../Images/Portfolio/22.png";
import FrameW from "../../Images/Portfolio/23.png";
import FrameX from "../../Images/Portfolio/24.png";
import { Box, CircularProgress, styled, useMediaQuery } from "@mui/material";
import { red, green, blue } from "@mui/material/colors";
import FrameButtonArr from "./FrameButtonArr";
import styles from "../../StyleSheets/Portfolio/Homepage.scss";
import { useTheme } from "@emotion/react";
import { animated, to } from "react-spring";
import zIndex from "@mui/material/styles/zIndex";
import Head from "./Pages/Head";
const { frameLineOpacity } = styles;
let GalleryArr = [
  FrameA,
  FrameB,
  FrameC,
  FrameD,
  FrameE,
  FrameF,
  FrameG,
  FrameH,
  FrameI,
  FrameJ,
  FrameK,
  FrameL,
  FrameM,
  FrameN,
  FrameO,
  FrameP,
  FrameQ,
  FrameR,
  FrameS,
  FrameT,
  FrameU,
  FrameV,
  FrameW,
  FrameX,
];

const HeadImg = ({ gridSprings, ticksSprings, loadSprings }) => {
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));

  const breakpointStyles = () => {
    const xsStyle = {
      container: {
        height: "150px",
        width: "150px",
      },
      circles: {
        A: 115,
        B: 115 - 5,
      },
    };
    const smStyle = {
      container: {
        ...xsStyle.container,
      },
      // circles: { A: 160, B: 160 - theme.shape.hudThickness * 3 },
      circles: { ...xsStyle.circles },
    };
    const mdStyle = {
      container: {
        ...smStyle.container,
        height: "200px",
        width: "200px",
      },
      circles: {
        ...smStyle.circles,
        A: 150,
        B: 150 - theme.shape.hudThickness * 3,
      },
    };
    const lgStyle = {
      container: {
        ...mdStyle.container,
        height: "300px",
        width: "300px",
      },
      circles: {
        ...mdStyle.circles,
        A: 200,
        B: 200 - theme.shape.hudThickness * 3,
      },
    };
    const xlStyle = {
      container: {
        ...lgStyle.container,
      },
      circles: {
        ...lgStyle.circles,
      },
    };

    return xs ? xsStyle : sm ? smStyle : md ? mdStyle : lg ? lgStyle : xlStyle;
  };

  const HeadBounds = styled("div")(({ theme }) => ({
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...breakpointStyles().container,
    position: "relative",
  }));

  const AniamtedCircle = ({ radius = 80, gridSpring }) => {
    return (
      <Box sx={{ zIndex: 11 }}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={`${radius * 2}`}
          height={`${radius * 2}`}
          transform="rotate(-90)"
          viewBox={`0 0 ${(radius + theme.shape.hudThickness * 2) * 2} ${
            (radius + theme.shape.hudThickness * 2) * 2
          }`}
        >
          <animated.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            vectorEffect="non-scaling-stroke"
            stroke={theme.palette.common.white}
            strokeWidth={theme.shape.hudThickness}
            strokeDasharray={3.14159 * 2 * radius}
            strokeDashoffset={to(
              [gridSpring.c1],
              (c1) => `${c1 * 3.14159 * 2 * radius}`
            )}
          ></animated.circle>
        </svg>
      </Box>
    );
  };

  return (
    <HeadBounds>
      <Head
        sx={{ ...breakpointStyles().container }}
        ticksSprings={ticksSprings}
        loadSprings={loadSprings}
      />

      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <Box
          sx={{ position: "absolute", width: "100%", height: "100%" }}
          className="utilCenter"
        >
          <AniamtedCircle
            radius={breakpointStyles().circles.A}
            gridSpring={gridSprings[7]}
          />
        </Box>
        <Box
          sx={{ position: "absolute", width: "100%", height: "100%" }}
          className="utilCenter"
        >
          <AniamtedCircle
            radius={breakpointStyles().circles.B}
            gridSpring={gridSprings[8]}
          />
        </Box>
      </Box>
    </HeadBounds>
  );
};

export default HeadImg;
