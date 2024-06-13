import React, { useState } from "react";
// import { ApiClient } from "./apiClient";
import Homepage from "./Bin/Portfolio/Pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ScrollToTop from "./Bin/Utilities/ScrollToTop";
import "./App.scss";
import ProjectDescription from "./Bin/Portfolio/Pages/ProjectDescription";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import utility from "../src/StyleSheets/Utility/Consts.scss";
import Contact from "./Bin/Portfolio/Pages/Contact";
import Head from "./Bin/Portfolio/Pages/Head";
import Concepting from "./Bin/Portfolio/Pages/Concepting";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
const {
  bgMain,
  eerieBlack,
  dimGray,
  lightCoral,
  sage,
  white,
  frameLineOpacity,
  whiteLowContrast,
} = utility;

function App() {
  let portolioTheme = createTheme({
    typography: { fontSize: 10 },
    palette: {
      common: {
        eerieBlack,
        dimGray,
        lightCoral,
        sage,
        white,
        whiteLowContrast,
      },
      background: {
        main: bgMain,
        eerieBlack,
        dimGray,
        lightCoral,
        sage,
        white,
      },
      primary: {
        main: "#000000",
        light: "#000000",
        dark: "#000000",
      },
    },
    shape: {
      frameLineOpacity,
      hudLowContrast: whiteLowContrast,
      hudThickness: 3,
    },
    type: {
      mono: {
        fontFamily: '"Share Tech Mono", monospace',
        fontWeight: 400,
        fontStyle: "normal",
      },
    },
  });

  const xs = useMediaQuery(portolioTheme.breakpoints.only("xs"));
  const sm = useMediaQuery(portolioTheme.breakpoints.only("sm"));
  const md = useMediaQuery(portolioTheme.breakpoints.only("md"));
  const lg = useMediaQuery(portolioTheme.breakpoints.only("lg"));
  const xl = useMediaQuery(portolioTheme.breakpoints.only("xl"));

  portolioTheme.shape.hudThickness = xs ? 1 : sm ? 2 : 3;

  portolioTheme = responsiveFontSizes(portolioTheme);

  const [initialized, setInitialized] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ThemeProvider theme={portolioTheme}>
          <Homepage initialized={initialized} setInitialized={setInitialized} />
        </ThemeProvider>
      ),
    },
    {
      path: "/contact",
      element: (
        <ThemeProvider theme={portolioTheme}>
          <Contact />
        </ThemeProvider>
      ),
    },
    {
      path: "/concepting",
      element: (
        <ThemeProvider theme={portolioTheme}>
          <Concepting />
        </ThemeProvider>
      ),
    },
    {
      path: "projects/:projectTitle",
      element: (
        <ThemeProvider theme={portolioTheme}>
          <ScrollToTop />
          <ProjectDescription />
        </ThemeProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
