import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import moment from "moment-timezone";

// import FrameButtonArr from "./FrameButtonArr";
import {
  useChain,
  useSpringRef,
  useScroll,
  useSprings,
  useSpring,
} from "react-spring";

import Page1 from "./Page1";
import Page2 from "./Page2";
import HoverButton from "../Components/HoverButton";
import Twinkler from "../Components/Twinkler";
import HomepageNav from "../Components/HomepageNav";
import Typewriter from "../Components/Typewriter";
import Clock from "../Components/Clock";
import { useTheme } from "@emotion/react";
// import AboutUnderlay from "./About";
// import ProjectsUnderlay from "./Projects";
// import ContactUnderlay from "./Contact";
// import Onload from "./onload";

// const [clockT, clockTApi] = Clock();

const Homepage = ({ setInitialized, initialized }) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();

  // Springs for animating in the ticks on the head image componenet
  const ticksApi = useSpringRef();
  const [ticksSprings] = useSprings(24, (i) => ({
    ref: ticksApi,
    from: {
      x1: 0,
      o: 0,
    },
    to: [
      {
        x1: 100,
        o: 0,
      },
      {
        x1: 100,
        o: 1,
      },
    ],
    delay: initialized ? 0 : i * 50,
    config: { duration: initialized ? 0 : 150 },
    immediate: initialized,
  }));

  // Svg fade ins, Grid around the nv bar, and the circle around head image
  const gridApi = useSpringRef();
  const [gridSprings] = useSprings(10, (i) => ({
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
      c1: 1,
      c2: 0,
      o: 1,
    },
    to: {
      x2: 100,
      y2: 100,
      c1: 0,
      c2: 1,
      o: 1,
    },
    delay: initialized ? 0 : i * 100,
    config: { duration: initialized ? 0 : 1000 },
    immediate: initialized,
  }));

  //Load in content ready for interaction
  const loadApi = useSpringRef();
  const [loadSprings] = useSpring((i) => ({
    ref: loadApi,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }));

  const [projectsT, projectsTApi] = Typewriter(
    `PROJECTS.........[ok]`,
    initialized
  );
  const [bioT, bioTApi] = Typewriter(`BIO.........[ok]`, initialized);
  const [assetsT, assetsTApi] = Typewriter(`ASSETS.........[ok]`, initialized);
  const [initT, initTApi] = Typewriter(`[SCROLL READY]`, initialized);
  const [nameT, nameTApi] = Typewriter(
    "C://Vincent.Greene"
      .split("")
      .map((v, i) =>
        i < 4 ? (
          <span style={{ color: theme.palette.common.lightCoral }}>{v}</span>
        ) : (
          <span>{v}</span>
        )
      ),
    initialized
  );
  useChain(
    loaded
      ? [
          projectsTApi,
          bioTApi,
          assetsTApi,
          initTApi,
          nameTApi,
          gridApi,
          ticksApi,
          loadApi,
        ]
      : []
  );

  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      setInitialized(true);
      console.log("initialized");
    }, 80000);
  }, []);

  const containerRef = useRef(null);

  return (
    <Box
      className="App"
      sx={(theme) => ({
        bgcolor: theme.palette.background.eerieBlack,
        color: theme.palette.background.white,
        display: "flex",
        flexDirection: "column",
        height: "fitContent",
        zIndex: 200,
      })}
    >
      <Page1
        gridSprings={gridSprings}
        ticksSprings={ticksSprings}
        loadSprings={loadSprings}
        typewriters={[projectsT, bioT, assetsT, initT, nameT]}
      />
      {/* <Twinkler number={5} /> */}
      <Page2
        containerRef={containerRef}
        setInitialized={setInitialized}
        initialized={initialized}
      ></Page2>
    </Box>
  );
};

export default Homepage;
