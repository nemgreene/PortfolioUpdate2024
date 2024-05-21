import { Box, Grid } from "@mui/material";
import React from "react";
import { letters } from "./Utilities/Utilities";
import { useTheme } from "@emotion/react";

function FrameButtons(props) {
  const theme = useTheme();
  const localRotate = () => {
    let ret = letters.indexOf(props.name);
    // return window.innerWidth > 419 ? ret * 4 - 45 : ret * 4.3 - 52;
    return (ret * 15 - 1) / 4 - 43;
  };
  const longer = Array.from("aflrx");

  return (
    <div
      style={{
        transform: `rotate(${localRotate()}deg) `,
        transformOrigin: "0% 50%",
        // // position: "absolute",
        // height: "10px",
        width: "50%",
        // position: "absolute",
        // top: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "-50%",
          left: "auto",
          height: "20px",
          width: "10%",
        }}
        className="radialMenuImg"
      >
        <Grid
          container
          wrap="nowrap"
          className="frameLineOpacity framButtonHover"
          style={{
            position: "absolute",
            left: "-100%",
            top: "-20%",
            height: "130%",
            width: "300%",
          }}
        >
          <Box
            // className="frameButtonHover"
            onMouseEnter={props.onChange}
            onMouseLeave={props.onExit}
            sx={{
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
            name={props.name}
          ></Box>
          <Grid
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
            pl="20%"
          >
            <svg
              height="2"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
              className="frameLineOpacity"
            >
              <line
                x1={`${longer.indexOf(props.name) !== -1 ? "0" : "10"}`}
                x2="30"
                y1="0"
                y2="0"
                stroke={theme.shape.hudLowContrast}
                strokeWidth="2"
              />
            </svg>
          </Grid>
          <Grid container item pl="15%" wrap="nowrap">
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="hide"
            >
              <svg height="4" width="10">
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  className="frameLineOpacity"
                  fill="none"
                  strokeWidth="2"
                  stroke={theme.shape.hudLowContrast}
                />
              </svg>
            </Grid>
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="hide"
            >
              <Grid
                item
                sx={{ fontSize: ".75rem", color: theme.shape.hudLowContrast }}
                className="hide"
              >
                {letters.indexOf(props.name) + 1}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* 
          onMouseEnter={props.onChange}
          onMouseLeave={props.onExit}
          
          className="frameLineOpacity"
          style={{
            position: "absolute",
            top: "-50%",
            left: "100%",
            height: "150%",
            width: "150%",
          }}
        >
          <svg
            viewBox="0 0 5 5"
            height="5"
            width="5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" />
          </svg>
          <Box>{letters.indexOf(props.name) + 1}</Box>
        </div> */}
      </div>
    </div>
  );
}

export default FrameButtons;
