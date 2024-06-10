import React, { useEffect, useState } from "react";
import { ApiClient } from "./apiClient";
import Homepage from "./Bin/Portfolio/Pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Form, useLoaderData } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ScrollToTop from "./Bin/Utilities/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
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
const {
  bgMain,
  eerieBlack,
  dimGray,
  lightCoral,
  sage,
  white,
  frameLineOpacity,
  whiteLowContrast,
  hudLowContrast,
} = utility;

let portolioTheme = createTheme({
  typography: { fontSize: 10 },
  palette: {
    common: { eerieBlack, dimGray, lightCoral, sage, white, whiteLowContrast },
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
portolioTheme = responsiveFontSizes(portolioTheme);

function App() {
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
      path: "/head",
      element: (
        <ThemeProvider theme={portolioTheme}>
          <Head />
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
