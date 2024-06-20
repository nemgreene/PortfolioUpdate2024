import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  Grid,
  Collapse,
  Button,
  styled,
  ImageList,
  ImageListItem,
  Divider,
  Typography,
  useTheme,
  ClickAwayListener,
  useMediaQuery,
} from "@mui/material";
import { categories } from "../Utilities/Utilities";
import {
  useSprings,
  animated,
  useSpring,
  useScroll,
  useSpringRef,
} from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import LooperBG from "../Components/LooperBG";
import AccordionMenu from "../Components/AccordionMenu";
import { useBarcode } from "next-barcode";
import LanguageIcon from "@mui/icons-material/Language";
import SquareIcon from "@mui/icons-material/Square";
import ConstructionIcon from "@mui/icons-material/Construction";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useGesture } from "@use-gesture/react";
import Page2Content from "./Page2Content";
import Page2Drawer from "./Page2Drawer";
import { HashLink } from "react-router-hash-link";

export default function PageProjects({
  containerRef,
  setInitialized,
  initialized,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerIndex, setDrawerIndex] = useState(0);
  const [drawerHovered, setDrawerHovered] = useState(false);

  const [activeField, setActiveField] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  let navigate = useNavigate();
  const theme = useTheme();
  const projectHome = useRef(null);
  //Handles the 2 menus vying for width
  //Data passed to 2 different menus
  const menuData = [categories, activeField?.projects];

  const menuFunctions = [
    (v) => {
      setActiveField({ ...v });
    },
    (v, i) => {
      // setActiveProject({ ...v });
      setActiveProjectIndex(i);
      // navigate(`/projects/${v.title}`);
    },
  ];

  const [drawerSpring, drawerApi] = useSpring(
    () => ({
      from: { width: 0, r: 0 },
    }),
    []
  );
  const [contentsSpring, contentsApi] = useSpring(
    () => ({
      from: { x1: 0, x2: 100, o: 1 },
    }),
    []
  );
  const [looperSpring, looperApi] = useSpring(
    () => ({
      from: { opacity: 0 },
    }),
    []
  );

  //Page 2 project preview content load in on prject slection
  //faded out when scrolled away from
  const previewRef = useSpringRef();
  const [previewSpring, previewApi] = useSprings(
    9,
    (i) => ({
      ref: previewRef,
      from: { x1: 0, opacity: 0 },
    }),
    []
  );

  useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress < 0.66) {
        setDrawerOpen(false);
        previewApi.start({
          to: [
            { opacity: 0, x1: 100 },
            { opacity: 0, x1: 0 },
          ],
        });
      }
    },
    default: {
      immediate: true,
    },
  });

  useEffect(() => {
    previewApi.start((index) =>
      drawerOpen
        ? {
            to: [
              { opacity: 0, x1: 100 },
              { opacity: 0, x1: 0 },
            ],
          }
        : {
            to: { opacity: 1, x1: 100 },
            delay: 200 * index,
            config: { duration: 300 },
          }
    );
    drawerApi.start(
      drawerOpen
        ? { width: 100, r: 180 }
        : { width: 0, r: 0, onRest: () => setDrawerIndex(0) }
    );
  }, [drawerOpen]);

  useEffect(() => {
    looperApi.start(drawerHovered ? { opacity: 1 } : { opacity: 0 });
  }, [drawerHovered]);

  useEffect(() => {
    previewApi.start(
      !isNaN(activeProjectIndex) ? { opacity: 1 } : { opacity: 0 }
    );
  }, [activeProjectIndex]);

  useEffect(() => {
    contentsApi.start(
      drawerIndex === 0
        ? {
            x1: 0,
            x2: 100,
          }
        : {
            x1: -100,
            x2: 0,
          }
    );
  }, [drawerIndex]);

  const xs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));

  const { inputRef } = useBarcode({
    value: "Vincent",
    format: "EAN13",
    ean128: true,
    options: {
      displayValue: "false",
      background: "#00000000",
      lineColor: theme.palette.common.dimGray + "50",
      height: xs ? "20px" : md ? "40px" : "30px",
      width: xs ? "1px" : sm ? "1px" : "2px",
    },
  });

  return (
    <Box
      id="portfolio-projects"
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Grid */}
      <Box
        sx={{
          height: "200%",
          width: "200%",
          position: "absolute",
          top: 0,
          left: 0,
          "& svg": {
            "& #grid": {
              transformOrigin: "50% top",
              transform: { xs: "scale(1)", md: "scale(1.5)", lg: "scale(2)" },
              // height: { xs: "25", md: "30", lg: "50" },
              // width: { xs: "25", md: "30", lg: "50" },
            },
          },
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 25 0 L 0 0 0 25"
                fill="none"
                style={{ opacity: ".2" }}
                stroke={theme.palette.common.dimGray}
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </Box>
      {/* barcodeBlock  */}
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            height: "fit-content",
            color: theme.palette.common.dimGray + "50",
            border: `${theme.palette.common.dimGray + 50} 1px solid`,
            bgcolor: theme.palette.common.eerieBlack,
            p: 0.5,
            pl: 1,
            pr: 1,
          }}
        >
          <Box>
            <svg ref={inputRef} />
          </Box>
          <LanguageIcon
            sx={{
              fontSize: xs ? "20px" : md ? "40px" : "30px",
            }}
          />
          <SquareIcon
            sx={{
              fontSize: xs ? "20px" : md ? "40px" : "30px",
            }}
          />
          <ConstructionIcon
            sx={{
              fontSize: xs ? "20px" : md ? "40px" : "30px",
            }}
          />
        </Grid>
      </Grid>
      {/* VG Icon */}
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "fit-content",
          height: "fit-content",
          p: 3,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          zIndex: 500,
        }}
      >
        <HashLink
          style={{ display: "none" }}
          ref={projectHome}
          to="/"
          scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
        />
        <Button
          sx={{ p: 0 }}
          disableRipple={true}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            projectHome.current.click();
          }}
        >
          <Grid item>
            <svg
              width={xs ? "30px" : sm ? "40px" : "60px"}
              height={xs ? "30px" : sm ? "40px" : "60px"}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                fill={theme.palette.common.white}
              />
            </svg>
          </Grid>
          <Grid sx={{ height: xs ? "30px" : sm ? "40px" : "60px" }} item>
            <Typography
              variant="h6"
              style={{ color: theme.palette.common.lightCoral }}
            >
              VG
            </Typography>
          </Grid>
        </Button>
      </Grid>
      {activeProjectIndex !== null && activeField?.projects ? (
        <Box sx={{ zIndex: 10 }}>
          <animated.div style={{ ...previewSpring[0] }}>
            <Page2Content
              previewApi={previewApi}
              activeField={activeField}
              activeProject={activeField?.projects[activeProjectIndex]}
              previewSpring={previewSpring}
              setActiveProjectIndex={setActiveProjectIndex}
            />
          </animated.div>
        </Box>
      ) : null}
      <Page2Drawer
        drawerSpring={drawerSpring}
        looperSpring={looperSpring}
        contentsSpring={contentsSpring}
        setDrawerOpen={setDrawerOpen}
        setDrawerIndex={setDrawerIndex}
        setDrawerHovered={setDrawerHovered}
        drawerOpen={drawerOpen}
        menuData={menuData}
        menuFunctions={menuFunctions}
      />
    </Box>
  );
}
