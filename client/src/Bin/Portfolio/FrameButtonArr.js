import { useTheme } from "@emotion/react";
import { Box, Button, Grid } from "@mui/material";
import { animated } from "@react-spring/web";
import React, { useRef } from "react";
import { useGesture } from "@use-gesture/react";

const HoverButton = ({ hoverIn, hoverOut, index, sx = {}, children }) => {
  const target = useRef(null);
  useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          hoverIn(index);
        } else {
          hoverOut(index);
        }
      },
    },
    { target, eventOptions: { passive: false } }
  );
  return (
    <Button
      ref={target}
      disableRipple
      sx={{
        transition: ".3s",
        "&:hover": {
          transform: "translateX(-15%)",
        },
        ...sx,
      }}
      disableFocusRipple
    >
      {children}
    </Button>
  );
};

export default function FrameButtonArr({
  number,
  setIndex,
  startPlaying,
  ticksSprings,
}) {
  const theme = useTheme();
  const longer = [0, 11, 23];
  const x1 = (index) => (longer.indexOf(index) !== -1 ? 0 : 30);

  return (
    <Box sx={{ height: "100%", width: "100%", position: "absolute" }}>
      <Box
        sx={{
          position: "absolute",
          margin: "auto",
          height: "100%",
          width: "100%",
          transform: "translate(50%, 50%)",
          overflow: "visible",
          color: "red",
        }}
      >
        <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
          {new Array(number).fill("").map((v, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                transform: `translate(0%,-50%) rotate(${
                  i * (360 / 90) - 45
                }deg)`,
                transformOrigin: "100% center",
              }}
            >
              <HoverButton
                hoverIn={() => {
                  setIndex(i);
                }}
                hoverOut={() => {
                  startPlaying(i);
                }}
                sx={{
                  color: "white",
                  bgcolor: theme.palette.common.eerieBlack,
                  width: "100px",
                }}
              >
                <Grid
                  item
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid
                    item
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    className="hide"
                    gap={"5px"}
                  >
                    <animated.span
                      style={{ opacity: ticksSprings[i].o, ...theme.type.mono }}
                    >
                      {`${i + 1}`}
                    </animated.span>
                    <animated.svg
                      style={{ opacity: ticksSprings[i].o }}
                      height="4"
                      width="10"
                    >
                      <circle
                        cx="2"
                        cy="2"
                        r="2"
                        className="frameLineOpacity"
                        fill="none"
                        strokeWidth="2"
                        stroke={theme.shape.hudLowContrast}
                      />
                    </animated.svg>
                    <Grid
                      item
                      sx={{
                        color: theme.shape.hudLowContrast,
                      }}
                      className="hide"
                    ></Grid>
                  </Grid>
                  <svg
                    height={theme.shape.hudThickness * 2}
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {console.log(x1(i))}
                    <animated.line
                      // x2={30}
                      x1={0}
                      x2={ticksSprings[i].x1.to((v) => `${v - x1(i)}%`)}
                      y1={theme.shape.hudThickness}
                      y2={theme.shape.hudThickness}
                      stroke={theme.shape.hudLowContrast}
                      strokeWidth={theme.shape.hudThickness / 2}
                    />
                  </svg>
                </Grid>
              </HoverButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
