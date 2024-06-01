import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

// import FrameButtonArr from "./FrameButtonArr";
import { useChain, useSpringRef, useTrail, useScroll } from "react-spring";

import Page1 from "./Page1";
import Page2 from "./Page2";
import HoverButton from "../Components/HoverButton";
import Twinkler from "../Components/Twinkler";
import HomepageNav from "../Components/HomepageNav";
// import AboutUnderlay from "./About";
// import ProjectsUnderlay from "./Projects";
// import ContactUnderlay from "./Contact";
// import Onload from "./onload";
const Homepage = () => {
  const [loaded, setLoaded] = useState(false);

  // Nav bar grid animations, page 1
  const [ticksSprings, ticksApi] = useTrail(
    24,
    (index) => ({
      from: { x1: 0, o: 0 },
      to: [
        { x1: 1, o: 0 },
        { x1: 1, o: 1 },
      ],
      delay: 1000 + index * 50,
      config: { duration: 100 },
    }),
    []
  );

  const gridApi = useSpringRef();
  const gridSprings = useTrail(10, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
      c1: 1,
      c2: 0,
    },
    to: {
      x2: loaded ? 100 : 0,
      y2: loaded ? 100 : 0,
      c1: loaded ? 0 : 1,
      c2: loaded ? 1 : 0,
    },
    config: { duration: 150 },
  });

  // const { scrollYProgress } = useScroll({
  //   // container: containerRef,
  //   onChange: ({ value: { scrollYProgress } }) => {
  //     console.log(scrollYProgress);
  //     if (scrollYProgress > 0.5) {
  //       gridApi.start();
  //     }
  //   },
  //   default: {
  //     immediate: true,
  //   },
  // });
  useChain([gridApi, ticksApi]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box
      className="App"
      sx={(theme) => ({
        bgcolor: theme.palette.background.eerieBlack,
        color: theme.palette.background.white,
        display: "flex",
        flexDirection: "column",
        height: "fitContent",
      })}
    >
      <Page1 gridSprings={gridSprings} ticksSprings={ticksSprings} />
    </Box>
  );
};

export default Homepage;
