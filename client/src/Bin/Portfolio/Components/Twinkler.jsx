import { Box, Button, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSpring, animated, useSprings, to, useScroll } from "react-spring";

// const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
//
const randomInRange = (max = 1) => Math.floor(Math.random() * max);

export default function Twinkler({
  layers = 3,
  number = 4,
  children,
  sx = {},
  target,
}) {
  function Twinkle({ style, height = 6 }) {
    const theme = useTheme();

    let doubleH = randomInRange(layers * number) > layers * number - 2;
    let doubleV = randomInRange(layers * number) > layers * number - 2;
    let colored = randomInRange(layers * number) > layers * number - 3;

    return (
      <Box
        sx={{
          height: `${height}px`,
          width: `${height}px`,
          overflow: "visible",
          position: "relative",
          "& .twinklerSVG": {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "-50%",
            left: "-50%",
          },
        }}
      >
        <animated.svg
          className="twinklerSVG"
          style={{
            ...style,
            transform: to(
              [style.x, style.y],
              // (x, y) => `translate(${x}vw, ${y}vh)`
              (x, y) => `translate(${x}vw, ${y}vh)`
            ),
          }}
        >
          <rect
            width="100%"
            height="100%"
            fill={
              colored
                ? theme.palette.common.lightCoral
                : theme.palette.common.white
            }
          />
        </animated.svg>
        {doubleH ? (
          <animated.svg
            className="twinklerSVG"
            style={{
              ...style,
              transform: to(
                [style.x, style.y],
                // (x, y) => `translate(${x}vw, ${y}vh)`
                (x, y) => `translate(calc(${x}vw + ${height * 1.5}px), ${y}vh)`
              ),
            }}
          >
            <rect
              width="100%"
              height="100%"
              fill={theme.palette.common.white}
            />
          </animated.svg>
        ) : doubleV ? (
          <animated.svg
            className="twinklerSVG"
            style={{
              ...style,
              transform: to(
                [style.x, style.y],
                (x, y) => `translate(${x}vw, calc(${y}vh + ${height * 1.5}px))`
              ),
            }}
          >
            <rect
              width="100%"
              height="100%"
              fill={theme.palette.common.white}
            />
          </animated.svg>
        ) : null}
      </Box>
    );
  }
  //   generate random coords on 12/12 grid to intiialize the nodes
  const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
      nums.add([
        Math.floor(
          (100 / 12) * Math.floor(Math.random() * (range - 1 + 1) + 1)
        ),
        Math.floor(
          (100 / 12) * Math.floor(Math.random() * (range - 1 + 1) + 1)
        ),
      ]);
    }
    return [...nums];
  };

  const range = randomUnique(11, layers * number);

  const [spring, api] = useSprings(layers * number, (index) => {
    let sx =
      index % layers === 0
        ? { dampener: 300, opacity: 0.5 }
        : index % 3 === 1
        ? { dampener: 600, opacity: 0.3 }
        : { dampener: 900, opacity: 0.1 };
    let offsetX = range[index][0];
    let offsetY = range[index][1];
    return {
      opacity: sx.opacity,
      x: offsetX - window.innerWidth / sx.dampener,
      y: offsetY - window.innerHeight / sx.dampener,
    };
  });

  return (
    <Box
      onMouseMove={({ clientX: x, clientY: y }) => {
        api.start((index) => {
          let sx =
            index % layers === 0
              ? { dampener: 300, opacity: 0.5 }
              : index % 3 === 1
              ? { dampener: 600, opacity: 0.3 }
              : { dampener: 900, opacity: 0.1 };
          let offsetX = range[index][0];
          let offsetY = range[index][1];
          return {
            opacity: sx.opacity,
            x: offsetX - (window.innerWidth - x) / sx.dampener,
            y: offsetY - (window.innerHeight - y) / sx.dampener,
          };
        });
      }}
      sx={{
        color: "white",
        // minHeight: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: 1,
      }}
    >
      <Box
        ref={target}
        className="scrollOverflow"
        sx={{
          zIndex: 10,
          position: "fixed",
          overflow: "scroll",
          color: "white",
          height: "100%",
          width: "100%",
          ...sx,
        }}
      >
        {children}
      </Box>
      <Box sx={{ zIndex: 1, height: "100%", width: "100%", position: "fixed" }}>
        {spring.map((v, i) => (
          <Twinkle style={v} key={i} index={i} />
        ))}
      </Box>
    </Box>
  );
}
