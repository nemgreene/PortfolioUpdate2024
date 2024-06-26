import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import useMeasure from "react-use-measure";

// import FrameButtonArr from "./FrameButtonArr";
import { useChain, useSpringRef, useSprings, useSpring } from "react-spring";

import PageLanding from "./PageLanding";
import PageProjects from "./PageProjects";
import Typewriter from "../Components/Typewriter";
import { useTheme } from "@emotion/react";
import PageBio from "./PageBio";
import { useNavigate } from "react-router-dom";

const bodyScrollLock = require("body-scroll-lock");
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const Homepage = ({ setInitialized, initialized }) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();

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
  const loadRef = useSpringRef();
  const [loadSprings] = useSprings(1, (i) => ({
    ref: loadRef,

    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: 1,
    immediate: initialized,
    onStart: () => {
      setInitialized(true);
    },
  }));

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
          loadRef,
        ]
      : []
  );

  useEffect(() => {
    setLoaded(true);
  }, []);
  const navigate = useNavigate();
  const portfolioContainerRef = useRef(null);

  useEffect(() => {
    navigate("/");
    window.scrollTo(0, 0);
    if (initialized) {
      enableBodyScroll(portfolioContainerRef.current);
    } else {
      disableBodyScroll(portfolioContainerRef.current);
    }
  }, [initialized]);

  const containerRef = useRef(null);

  return (
    <Box
      className="App"
      ref={portfolioContainerRef}
      sx={(theme) => ({
        bgcolor: theme.palette.background.eerieBlack,
        color: theme.palette.background.white,
        display: "flex",
        flexDirection: "column",
        height: "fitContent",
        zIndex: 200,
      })}
    >
      <PageLanding
        initialized={initialized}
        gridSprings={gridSprings}
        ticksSprings={ticksSprings}
        loadSprings={loadSprings[0]}
        typewriters={[projectsT, bioT, assetsT, initT, nameT]}
      />
      {/* <Twinkler number={5} /> */}
      <PageBio />
      <PageProjects
        containerRef={containerRef}
        setInitialized={setInitialized}
        initialized={initialized}
      />
    </Box>
  );
};

export default Homepage;
