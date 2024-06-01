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

const HeadImg = ({
  imageSet,
  handleHover,
  handleExit,
  gridSprings,
  ticksSprings,
}) => {
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));

  const breakpointStyles = () => {
    const xsStyle = {
      container: {
        height: "300px",
        width: "300px",
      },
      circles: {
        A: 150,
        B: 145,
      },
    };
    const smStyle = {
      container: {
        ...xsStyle.container,
        height: "500px",
        width: "500px",
      },
      circles: { A: 250, B: 240 },
    };
    const mdStyle = {
      container: {
        ...smStyle.container,
        height: "400px",
        width: "400px",
      },
      circles: { ...smStyle.circles, A: 200, B: 190 },
    };
    const lgStyle = {
      container: {
        ...mdStyle.container,
        // backgroundColor: red[100],
        height: "500px",
        width: "500px",
      },
      circles: { ...mdStyle.circles, A: 250, B: 240 },
    };
    const xlStyle = {
      container: {
        ...lgStyle.container,
        // backgroundColor: green[100],
        width: "500px",
        width: "500px",
      },
      circles: { ...lgStyle.circles, A: 250, B: 240 },
    };

    return xs ? xsStyle : sm ? smStyle : md ? mdStyle : lg ? lgStyle : xlStyle;
  };

  const HeadBounds = styled("div")(({ theme }) => ({
    //   padding: theme.spacing(1),
    borderRadius: "50%",
    // outline: `${theme.shape.hudThickness}px solid ${theme.shape.hudLowContrast}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...breakpointStyles().container,

    // [theme.breakpoints.only("md")]: {
    //   // backgroundColor: blue[500],
    //   height: "60vh",
    //   width: "60vh",
    //   minHeight: "400px",
    //   minWidth: "400px",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   // backgroundColor: green[500],
    //   height: "45vh",
    //   width: "45vh",
    //   minHeight: "45vh",
    //   minWidth: "45vh",
    // },
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
            stroke={theme.shape.hudLowContrast}
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
      <Box className="frameButtonArr" sx={{ zIndex: 15 }}>
        <FrameButtonArr
          handleHover={handleHover}
          handleExit={handleExit}
          ticksSprings={ticksSprings}
        />
      </Box>
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

      <img
        className="headImg"
        src={imageSet}
        alt="head"
        key="gif"
        style={{
          display: `${isNaN(imageSet) ? "inline" : "none"}`,
          position: "absolute",
          top: "10%",
          height: "80%",
          zIndex: 10,
        }}
      ></img>
      {GalleryArr.map((img) => {
        return (
          <img
            className="headImg"
            src={img}
            alt="head"
            key={img}
            style={{
              position: "absolute",
              top: "10%",
              height: "80%",
              // left: "-30%",
              zIndex: 15,
              display: img === GalleryArr[imageSet] ? "inline-block" : "none",
            }}
          ></img>
        );
      })}
    </HeadBounds>
  );
};

export default HeadImg;
