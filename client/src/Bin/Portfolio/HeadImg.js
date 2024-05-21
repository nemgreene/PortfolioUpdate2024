import React from "react";
import FrameA from "../../Images/Portfolio/1.png";
import FrameB from "../../Images/Portfolio/2.png";
import FrameC from "../../Images/Portfolio/3.png";
import FrameD from "../../Images/Portfolio/4.png";
import FrameE from "../../Images/Portfolio/5.png";
import FrameF from "../../Images/Portfolio/6.png";
import FrameG from "../../Images/Portfolio/7.png";
import FrameH from "../../Images/Portfolio/8.png";
import FrameI from "../../Images/Portfolio/9.png";
import FrameJ from "../../Images/Portfolio/10.png";
import FrameK from "../../Images/Portfolio/11.png";
import FrameL from "../../Images/Portfolio/12.png";
import FrameM from "../../Images/Portfolio/13.png";
import FrameN from "../../Images/Portfolio/14.png";
import FrameO from "../../Images/Portfolio/15.png";
import FrameP from "../../Images/Portfolio/16.png";
import FrameQ from "../../Images/Portfolio/17.png";
import FrameR from "../../Images/Portfolio/18.png";
import FrameS from "../../Images/Portfolio/19.png";
import FrameT from "../../Images/Portfolio/20.png";
import FrameU from "../../Images/Portfolio/21.png";
import FrameV from "../../Images/Portfolio/22.png";
import FrameW from "../../Images/Portfolio/23.png";
import FrameX from "../../Images/Portfolio/24.png";
import { Box, styled } from "@mui/material";
import { red, green, blue } from "@mui/material/colors";
import FrameButtonArr from "./FrameButtonArr";
import styles from "../../StyleSheets/Portfolio/Homepage.scss";
import { useTheme } from "@emotion/react";
const { frameLineOpacity } = styles;
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

const HeadBounds = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(1),
  borderRadius: "50%",
  outline: `1px solid ${theme.shape.hudLowContrast}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    // backgroundColor: red[500],
    height: "50vw",
    width: "50vw",
    minWidth: "250px",
    minHeight: "250px",
    maxHeight: "400px",
    maxWidth: "400px",
  },
  [theme.breakpoints.only("md")]: {
    // backgroundColor: blue[500],
    height: "60vh",
    width: "60vh",
    minHeight: "400px",
    minWidth: "400px",
  },
  [theme.breakpoints.up("lg")]: {
    // backgroundColor: green[500],
    height: "45vh",
    width: "45vh",
    minHeight: "45vh",
    minWidth: "45vh",
  },
  position: "relative",
}));

const HeadImg = ({ imageSet, handleHover, handleExit }) => {
  const theme = useTheme();
  return (
    <HeadBounds>
      <div
        style={{
          borderRadius: "50%",
          outline: `1px solid ${theme.shape.hudLowContrast}`,
          backgroundColor: theme.palette.common.sage,
          width: "95%",
          height: "95%",
        }}
      />
      <img
        className="headImg"
        src={imageSet}
        alt="head"
        key="gif"
        style={{
          display: `${isNaN(imageSet) ? "inline" : "none"}`,
          position: "absolute",
          top: "10%",
          height: "80%",
          left: "-30%",
        }}
      ></img>
      {GalleryArr.map((img) => {
        return (
          <img
            className="headImg"
            src={img}
            alt="head"
            key={img}
            style={{
              position: "absolute",
              top: "10%",
              height: "80%",
              left: "-30%",
              display: img === GalleryArr[imageSet] ? "inline-block" : "none",
            }}
          ></img>
        );
      })}
      <FrameButtonArr handleHover={handleHover} handleExit={handleExit} />
    </HeadBounds>
  );
};

export default HeadImg;
