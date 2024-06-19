import { Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";

import { animated, useSpring } from "react-spring";
export default function HoverButton({
  primary,
  secondary,
  label,
  sx = {},
  loadSprings = {},
  startIcon = null,
  onHover = () => {},
  onClick = () => {},
  reset = true,
}) {
  const theme = useTheme();

  const [hovered, setHovered] = useState(false);
  primary = primary ? primary : theme.palette.common.eerieBlack;
  secondary = secondary ? secondary : theme.palette.common.white;

  const target = useRef(null);

  const [hoverSpring, hoverApi] = useSpring(
    () => ({
      from: { y: 0, yOffset: 100 },
      // from: { y: 50, yOffset: 50,  },
      config: { clamp: true, duration: 200 },
    }),
    []
  );

  useGesture(
    {
      onHover: ({ hovering }) => {
        onHover();
        setHovered(hovering);
      },
    },
    { target, eventOptions: { passive: false } }
  );

  const handleClick = (v, i) => {
    if (hovered) {
      hoverApi.start({ to: { y: 0, yOffset: 100 }, onRest: onClick });
    } else {
      hoverApi.start({
        to: reset
          ? [
              { y: 100, yOffset: 0 },
              { y: 0, yOffset: 100 },
            ]
          : [{ y: 0, yOffset: 100 }],
        onRest: () => onClick(v, i),
      });
    }
  };

  useEffect(() => {
    hoverApi.start(hovered ? { y: 100, yOffset: 0 } : { y: 0, yOffset: 100 });
  }, [hovered, hoverApi]);

  return (
    <animated.div
      className="hoverButtonContainer"
      ref={target}
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        zIndex: 100,
        position: "relative",
        ...loadSprings,
      }}
    >
      <Button
        disableRipple
        sx={{
          boxShadow: 0,
          bgcolor: primary,
          overflow: "hidden",
          borderRadius: 0,
          height: "100%",
          width: "100%",
          p: 0,
          ...sx,
        }}
        onClick={(v, i) => handleClick(v, i)}
      >
        <div
          className="utilCenter hoverButtonPrimaryContainer"
          style={{ height: "100%", backgroundColor: primary, width: "100%" }}
        >
          <Typography
            variant="h6"
            sx={{
              color: secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".1rem",
            }}
          >
            {startIcon}
            {label}
          </Typography>
        </div>
        <animated.div
          className="utilCenter"
          style={{
            height: "110%",
            backgroundColor: secondary,
            width: "100%",
            position: "absolute",
            overflow: "hidden",
            transform: hoverSpring.yOffset.to((v) => `translateY(${v}%)`),
          }}
        >
          <animated.span
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              color: primary,
              transform: hoverSpring.yOffset.to(
                (v) => `translateY(${-1 * v}%)`
              ),
            }}
          >
            <Typography
              className="utilCenter"
              variant="h6"
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {startIcon}
              {label}
            </Typography>
          </animated.span>
        </animated.div>
      </Button>
    </animated.div>
  );
}
