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
});
portolioTheme = responsiveFontSizes(portolioTheme);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider theme={portolioTheme}>
        <Homepage />
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
