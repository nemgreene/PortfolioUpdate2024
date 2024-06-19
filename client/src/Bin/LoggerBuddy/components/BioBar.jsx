import { Grid, Typography, Container } from "@mui/material";

import React from "react";
import FrameA from "../../../Images/Portfolio/1.png";
import FrameB from "../../../Images/Portfolio/2.png";
import FrameC from "../../../Images/Portfolio/3.png";
import FrameD from "../../../Images/Portfolio/4.png";
import FrameE from "../../../Images/Portfolio/5.png";
import FrameF from "../../../Images/Portfolio/6.png";
import FrameG from "../../../Images/Portfolio/7.png";
import FrameH from "../../../Images/Portfolio/8.png";
import FrameI from "../../../Images/Portfolio/9.png";
import FrameJ from "../../../Images/Portfolio/10.png";
import FrameK from "../../../Images/Portfolio/11.png";
import FrameL from "../../../Images/Portfolio/12.png";
import FrameM from "../../../Images/Portfolio/13.png";
import FrameN from "../../../Images/Portfolio/14.png";
import FrameO from "../../../Images/Portfolio/15.png";
import FrameP from "../../../Images/Portfolio/16.png";
import FrameQ from "../../../Images/Portfolio/17.png";
import FrameR from "../../../Images/Portfolio/18.png";
import FrameS from "../../../Images/Portfolio/19.png";
import FrameT from "../../../Images/Portfolio/20.png";
import FrameU from "../../../Images/Portfolio/21.png";
import FrameV from "../../../Images/Portfolio/22.png";
import FrameW from "../../../Images/Portfolio/23.png";
import FrameX from "../../../Images/Portfolio/24.png";

let GalleryArr = [
  FrameA,
  FrameB,
  FrameC,
  FrameD,
  FrameE,
  FrameF,
  FrameG,
  FrameH,
  FrameI,
  FrameJ,
  FrameK,
  FrameL,
  FrameM,
  FrameN,
  FrameO,
  FrameP,
  FrameQ,
  FrameR,
  FrameS,
  FrameT,
  FrameU,
  FrameV,
  FrameW,
  FrameX,
];

export default function BioDrawer({ client, credentials }) {
  const [value, setValue] = React.useState(
    Math.floor(Math.random() * GalleryArr.length)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      className="BioDrawer"
      container
      justifyContent={"center"}
      alignContent={"start"}
      style={{ width: "100%", height: "90%" }}
    >
      <Grid item container justifyContent={"center"} xs={2}></Grid>
      <Grid
        item
        container
        xs={6}
        style={{ overflow: "hidden", height: "25%" }}
        justifyContent={"center"}
      >
        <Grid
          item
          style={{
            height: "100%",
            width: "fit-content",
          }}
        >
          <img
            onClick={() =>
              client.redirect(
                credentials?.accessToken
                  ? "/loggerBuddy/admin"
                  : "/loggerBuddy/login"
              )
            }
            src={GalleryArr[value]}
            style={{
              height: "100%",
              width: "auto",
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
      <Container
        sx={{
          position: "absolute",
          mt: "20%",
          mb: "20%",
          bottom: 0,
          height: "fit-content",
          top: "auto",
        }}
      >
        <Grid container sx={{ padding: "0px 10%" }}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Hey, Im Vincent ^
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              This is a tool I've built to help me track my ongoing projects,
              document my progress, and encourage a Product-Focused approach in
              my work
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              This project will also offer an opportunity to showcase my
              different proficiencies across disciplines.
            </Typography>
            <br />
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              I'll be tracking my work as an Instructor for Games Development in
              Unreal Engine and Full Stack Web Development, my freelance work as
              an Technical Artist, and my personal projects as an artist.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
