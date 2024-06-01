import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadImg from "../../Portfolio/HeadImg";
import { useTheme } from "@emotion/react";
import HomepageNav from "../Components/HomepageNav";
import head from "../../../Images/Portfolio/head.gif";

import { letters } from "../Utilities/Utilities";

export default function Page1({ scrollYProgress, gridSprings, ticksSprings }) {
  const [image, cImage] = useState(head);

  const handleHover = (e) => {
    let name = e.target.getAttribute("name");
    let index = letters.indexOf(name);
    console.log(name, index);
    if (!isNaN(index) && name) {
      cImage(index);
    }
  };

  const handleExit = (event) => {
    cImage(head);
  };

  const theme = useTheme();
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.eerieBlack,
        color: theme.palette.background.white,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      })}
    >
      <HomepageNav gridSprings={gridSprings} />

      <Grid
        container
        sx={{
          justifyContent: "flex-end",
          height: "100%",
          flex: 2,
        }}
      >
        <HeadImg
          imageSet={image}
          handleHover={handleHover}
          handleExit={handleExit}
          gridSprings={gridSprings}
          ticksSprings={ticksSprings}
        />
      </Grid>
    </Box>
  );
}
