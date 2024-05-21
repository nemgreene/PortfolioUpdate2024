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
} from "@mui/material";
import { categories } from "../Utilities/Utilities";
import { useSprings, animated, useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import LooperBG from "../Components/LooperBG";
import AccordionMenu from "../Components/AccordionMenu";

const menuCollapsedWidth = "40%";
const menuExpandedWidth = "60%";

export default function Page2() {
  const [activeField, setActiveField] = useState(null);
  let navigate = useNavigate();
  let animating = useRef(false);
  const theme = useTheme();
  //Handles the 2 menus vying for width
  //Data passed to 2 different menus
  const menuData = [categories, activeField?.projects];

  const menuFunctions = [
    (v) => {
      console.log(v);
      setActiveField({ ...v });
    },
    (v) => {
      navigate(`/projects/${v.title}`);
    },
  ];

  const [springs, api] = useSprings(
    2,
    (index) => ({
      onStart: () => (animating = true),
      onRest: () => (animating = false),
      from: {
        width: index === 0 ? menuExpandedWidth : menuCollapsedWidth,
        bgcolor: theme.palette.common.eerieGrey,
      },
    }),
    []
  );
  const [menuHoverSpring, menuHoverApi] = useSprings(
    2,
    (index) => ({
      from: {
        backgroundColor: theme.palette.common.eerieBlack,
        color: theme.palette.common.white,
      },
    }),
    []
  );

  const hoverMenu = (i) => {
    menuHoverApi.start((index) => {
      return index === i
        ? {
            to: {
              backgroundColor:
                index === 0
                  ? theme.palette.common.sage
                  : theme.palette.common.dimGray,
              color: theme.palette.common.eerieBlack,
            },
          }
        : {
            to: {
              color: theme.shape.hudLowContrast,
              backgroundColor: theme.palette.common.eerieBlack,
            },
          };
    });
    if (animating.current) return;
    api.start((index) =>
      index === i
        ? { to: { width: menuExpandedWidth } }
        : { to: { width: menuCollapsedWidth } }
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <ClickAwayListener onClickAway={() => setActiveField(null)}>
        <Box sx={{ width: "100%", heihgt: "100%", display: "flex" }}>
          <Box
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
            }}
            display="flex"
          >
            {springs.map((props, i) => (
              <animated.div
                key={i}
                style={{
                  ...props,
                  ...menuHoverSpring[i],
                  height: "100%",
                  position: "relative",
                }}
                onMouseEnter={() => {
                  if (menuData[i]) hoverMenu(i);
                }}
                onMouseLeave={() => {
                  hoverMenu(null);
                }}
              >
                <LooperBG index={i} />

                <AccordionMenu
                  index={i}
                  data={menuData[i]}
                  open={true}
                  menuHoverSpring={menuHoverSpring}
                >
                  {menuFunctions[i]}
                </AccordionMenu>
              </animated.div>
            ))}
          </Box>
        </Box>
      </ClickAwayListener>
    </Box>
  );
}
