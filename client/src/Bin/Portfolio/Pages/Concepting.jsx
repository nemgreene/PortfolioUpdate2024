import React, { useEffect, useRef } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useResize, animated, useSprings } from "@react-spring/web";
import useMeasure from "react-use-measure";

const Element = ({ children, index }) => {
  const [ref, bounds] = useMeasure();
  console.log(bounds);
  const elem = (
    <Box key={index} ref={ref} sx={{ display: "block", width: "fit-content" }}>
      {children}
      <animated.div
        style={{
          display: "block",
          position: "absolute",
          top: 10,
          left: 10,
          bottom: "50%",
          backgroundColor: "red",
          overflow: "visible",
        }}
      >
        {children}
      </animated.div>
    </Box>
  );
  return [elem, bounds];
};
const AnimatedGrid = ({ data }) => {
  const containerRef = useRef(null);

  const [springs, api] = useSprings(
    data.length,
    () => ({
      from: { x: 0, y: 0 },
      to: { x: 0, y: 0 },
    }),
    []
  );

  const elems = data.map((v, i) => Element({ children: v, index: i })[0]);
  const bounds = data.map((v, i) => Element({ children: v, index: i })[1]);
  const { height, width } = useResize({
    config: { tension: 3000, friction: 100 },
    container: containerRef,
    onChange: (v) => {
      //   // update springs
      //   console.log(v.value);
      //   console.log(bounds);
    },
  });

  return (
    <Box
      ref={containerRef}
      style={{
        border: "1px solid white",
        width: "200px",
        height: "200px",
        resize: "both",
        overflow: "auto",
      }}
      className="animatedGridContainer"
    >
      <animated.div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          height: "100%",
          position: "relative",
          height: "fit-content",
          width: width.to((v) => `${v}px`),
        }}
      >
        {elems.map((v) => v)}
      </animated.div>
    </Box>
  );
};

export default function Concepting() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: theme.palette.common.eerieBlack,
        color: "white",
      }}
    >
      <AnimatedGrid
        data={[12, 13, 14].map((v, i) => (
          <Button sx={{ color: "white", width: "300px" }} key={i}>
            {v}
          </Button>
        ))}
      />
    </Box>
  );
}
