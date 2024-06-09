import React, { useState, useRef, useMemo, useEffect } from "react";

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
import { useSprings, animated, useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import LooperBG from "../Components/LooperBG";
import AccordionMenu from "../Components/AccordionMenu";
import HoverButton from "../Components/HoverButton";
import { useBarcode } from "next-barcode";
import LanguageIcon from "@mui/icons-material/Language";
import SquareIcon from "@mui/icons-material/Square";
import ConstructionIcon from "@mui/icons-material/Construction";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useGesture } from "@use-gesture/react";

export default function Page2Drawer({
  drawerSpring,
  looperSpring,
  contentsSpring,
  setDrawerOpen,
  setDrawerIndex,
  drawerOpen,
  menuData,
  menuFunctions,
  setDrawerHovered,
}) {
  const target = useRef(null);
  const theme = useTheme();
  useGesture(
    {
      onHover: ({ hovering }) => {
        setDrawerHovered(hovering);
      },
    },
    { target, eventOptions: { passive: false } }
  );

  return (
    <ClickAwayListener onClickAway={() => setDrawerOpen(false)}>
      <animated.div
        style={{
          position: "relative",
          height: "100%",
          width: "fit-content",
          transform: drawerSpring.width.to((v) => `translate(${v - 100}%)`),
          zIndex: 300,
        }}
      >
        <Box
          className="drawerContainer"
          ref={target}
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            width: { xs: "90vw", md: "50vw" },
            bgcolor: "red",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              bgcolor: "pink",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "20vh",
                height: "5vh",
                transform: "translate(-7.5vh, -50%) rotate(90deg)",
                border: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
              }}
            >
              <HoverButton
                onClick={(v) => {
                  setDrawerOpen((p) => !p);
                }}
                label={
                  <animated.span>
                    {drawerOpen ? `Close ` : `Projects `}
                    <animated.span
                      style={{
                        display: "inline-block",
                        transform: drawerSpring.r.to((v) => `rotate(${v}deg)`),
                      }}
                    >
                      <KeyboardArrowUpIcon />
                    </animated.span>
                  </animated.span>
                }
                variant="vertical"
              />
            </div>
          </Box>

          <animated.div
            style={{
              height: "100%",
              display: "flex",
              overflow: "hidden",
              width: "100%",
              //   transform: drawerSpring.width.to(
              //     (v) => `translateX(${(100 - v) * -1 - 100}%)`
              //   ),
              backgroundColor: theme.palette.common.eerieBlack,
            }}
          >
            <Box sx={{ width: "100%", position: "relative" }}>
              <animated.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  transform: contentsSpring.x1.to((v) => `translate(${v}%)`),
                  overflow: "hidden",
                }}
              >
                <animated.div style={{ width: "100%", ...looperSpring }}>
                  <LooperBG index={0} />
                </animated.div>
                <Box sx={{ height: "90%" }}>
                  <AccordionMenu index={0} data={menuData[0]} open={true}>
                    {(v, i) => {
                      setDrawerIndex(1);
                      menuFunctions[0](v, i);
                    }}
                  </AccordionMenu>
                </Box>
              </animated.div>
              <animated.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  transform: contentsSpring.x2.to((v) => `translate(${v}%)`),
                  overflow: "hidden",
                }}
              >
                <animated.div style={{ width: "100%", ...looperSpring }}>
                  <LooperBG index={1} />
                </animated.div>
                <Box sx={{ height: "90%" }}>
                  <AccordionMenu index={1} data={menuData[1]} open={true}>
                    {(v, i) => {
                      // setDrawerIndex(0);
                      setDrawerOpen(false);
                      menuFunctions[1](v, i);
                    }}
                  </AccordionMenu>
                </Box>
                <Box>
                  <HoverButton
                    onClick={() => setDrawerIndex(0)}
                    sx={{
                      "&:hover": { "& #promptIcon": { opacity: 1 } },
                      opacity: 0.8,
                      p: 1,
                    }}
                    label={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <KeyboardBackspaceIcon />
                        {`Back`}
                      </span>
                    }
                  />
                </Box>
              </animated.div>
            </Box>
          </animated.div>
        </Box>
      </animated.div>
    </ClickAwayListener>
  );
}
