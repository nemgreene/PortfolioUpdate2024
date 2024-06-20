import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { animated, useSpringValue } from "@react-spring/web";
import React, { useEffect, useRef } from "react";

import FrameA from "../../../Images/Portfolio/1.png";
import FrameB from "../../../Images/Portfolio/2.png";
import FrameC from "../../../Images/Portfolio/3.png";
import FrameD from "../../../Images/Portfolio/4.png";
import FrameE from "../../../Images/Portfolio/5.png";
import FrameF from "../../../Images/Portfolio/6.png";
import FrameG from "../../../Images/Portfolio/7.png";
import FrameH from "../../../Images/Portfolio/8.png";
import FrameI from "../../../Images/Portfolio/9.png";
import FrameJ from "../../../Images/Portfolio/10.png";
import FrameK from "../../../Images/Portfolio/11.png";
import FrameL from "../../../Images/Portfolio/12.png";
import FrameM from "../../../Images/Portfolio/13.png";
import FrameN from "../../../Images/Portfolio/14.png";
import FrameO from "../../../Images/Portfolio/15.png";
import FrameP from "../../../Images/Portfolio/16.png";
import FrameQ from "../../../Images/Portfolio/17.png";
import FrameR from "../../../Images/Portfolio/18.png";
import FrameS from "../../../Images/Portfolio/19.png";
import FrameT from "../../../Images/Portfolio/20.png";
import FrameU from "../../../Images/Portfolio/21.png";
import FrameV from "../../../Images/Portfolio/22.png";
import FrameW from "../../../Images/Portfolio/23.png";
import FrameX from "../../../Images/Portfolio/24.png";
import FrameButtonArr from "../FrameButtonArr";

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

export default function Head({ sx, ticksSprings, loadSprings }) {
  const theme = useTheme();
  const y = useSpringValue(0);
  let reversed = useRef(false);
  //   number of frames
  const number = GalleryArr.length;
  // used in interpolation range, generates an array with length of frames composed of discrete steps from 0 to 1
  // example:
  //Number = 5
  //RangeA = [0, .25, 0.5, 0.75, 1 ]
  const rangeA = new Array(number).fill("").map((v, i) => i / (number - 1));

  //used in interpolation, second range.
  //generates array with length of frames
  const rangeB = (index) =>
    new Array(number).fill("").map((v, i) => (i === index ? 100 : 0));

  const frameDuration = 100;

  let startPlaying;

  useEffect(() => {
    startPlaying(0);
    // setIndex(7);
  }, [startPlaying]);

  //Called to resume animation
  startPlaying = (index = 0) => {
    // if index == 0, reversed = false
    // if index == max, reversed = true
    // else reversed = !reversed
    reversed = index === 0 ? false : index === number - 1 ? true : !reversed;

    //calculate remaining time to other end
    // if index == 0 or index === max, frameDuration * GalleryArr.length
    // if reversed, frameDuration * index ()

    //5 and reversed = 5 * frameDuration
    //5 and !reversed (24 - 5) = 19 * frameDrration
    const remaingDuration =
      index === 0 || index === number - 1
        ? frameDuration * GalleryArr.length
        : reversed
        ? index * frameDuration
        : (number - 1 - index) * frameDuration;

    y.set(rangeA[index]);
    y.start(reversed ? 0 : 1, {
      config: { duration: remaingDuration },
      onRest: () => {
        startPlaying(reversed ? 0 : number - 1);
      },
    });
  };
  //show a specific frame
  const setIndex = (index) => {
    y.stop({ cancel: true });
    y.set(rangeA[index], { onRest: null });
    y.start({
      immediate: true,
      config: { duration: 0 },
    });
  };

  //   -----------------------------------------------------------------

  return (
    <Box
      className="headContainer"
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 100,
        ...sx,
      }}
    >
      <FrameButtonArr
        number={number}
        setIndex={setIndex}
        startPlaying={startPlaying}
        ticksSprings={ticksSprings}
      />
      {/* Head container */}
      <animated.div
        style={{
          height: "100%",
          width: "100%",
          opacity: loadSprings.opacity.to((v) => v),
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {GalleryArr.slice(0, number).map((v, i) => (
            <animated.div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                height: "100%",
                width: "100%",
                left: 0,
                backgroundColor: theme.palette.common.eerieBlack,
                borderRadius: "33%",
                overflow: "hidden",
                x: y.to(rangeA, rangeB(i)).to((v) => {
                  return v > 50 ? "0%" : "-100%";
                }),
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  alt={`headImage${i}`}
                  src={v}
                ></img>
              </Box>
            </animated.div>
          ))}
          <Box
            sx={{
              position: "relative",
              height: "50vh",
              width: "50vw",
            }}
          />
        </Box>
      </animated.div>
    </Box>
  );
}
