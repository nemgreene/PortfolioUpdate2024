import React, { useState } from "react";
import head from "../../../Images/Portfolio/head.gif";
import Box from "@mui/material/Box";

// import FrameButtonArr from "./FrameButtonArr";
import { useSpring, animated } from "react-spring";

// import center from "../../Images/Portfolio/toast.jpg";
// import thumb1 from "../../Images/Portfolio/thumb1.png";
// import thumb2 from "../../Images/Portfolio/thumb2.png";
// import thumb3 from "../../Images/Portfolio/thumb3.png";
// import thumb4 from "../../Images/Portfolio/thumb4.png";
// import hand from "../../Images/Portfolio/manito1.png";
// import gmail from "../../Images/Portfolio/gm.png";
// import art from "../../Images/Portfolio/as.png";
// import git from "../../Images/Portfolio/gh.png";
// import helloWorld from "../../Images/Portfolio/helloWorld.png";

import HeadImg from "../HeadImg";
import { Container } from "@mui/material";
import { letters } from "../Utilities/Utilities";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { useTheme } from "@emotion/react";
// import AboutUnderlay from "./About";
// import ProjectsUnderlay from "./Projects";
// import ContactUnderlay from "./Contact";
// import Onload from "./onload";

const Homepage = () => {
  const theme = useTheme();
  const [image, cImage] = useState(head);

  const handleHover = (e) => {
    let name = e.target.getAttribute("name");
    let index = letters.indexOf(name);
    if (index && name) {
      cImage(index);
    }
  };

  const handleExit = (event) => {
    cImage(head);
  };

  return (
    <Box
      className="App utilCenter"
      sx={(theme) => ({
        bgcolor: theme.palette.background.eerieBlack,
      })}
    >
      <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect width="60" height="60" fill="url(#smallGrid)" />
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={theme.palette.common.whiteLowContrast}
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </Box>
      <Box
        sx={(theme) => ({
          boxShadow: 3,
          zIndex: "1",
          flexDirection: "row-reverse",
          display: "flex",
          height: "85vh",
          width: "85vw",
          bgcolor: theme.palette.background.eerieBlack,
        })}
      >
        <Box sx={{ width: "60%" }}>
          <Page1
            handleExit={handleExit}
            handleHover={handleHover}
            image={image}
          />
        </Box>
        <Box sx={{ width: "40%" }}>
          <Page2></Page2>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
