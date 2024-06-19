import React from "react";
import { animated } from "@react-spring/web";
import { useTheme } from "@emotion/react";

function RailElem({
  x1,
  x2,
  y1,
  y2,
  strokeWidth,
  stroke,
  style,
  variant,
  flex,
}) {
  const variants = {
    left: { width: strokeWidth, left: 0, height: "100%" },
    right: { width: strokeWidth, right: 0, height: "100%" },
    top: { height: strokeWidth, top: 0, width: "100%" },
    bottom: { height: strokeWidth, bottom: 0, width: "100%" },
  };
  const flexStyle = flex
    ? {
        x1: y1,
        x2: y2,
        y1: x1,
        y2: x2,
      }
    : { x1: x1, x2: x2, y1: y1, y2: y2 };
  const variantStyle = variants[variant]
    ? { ...variants[variant], ...style, ...flexStyle }
    : { ...style, ...flexStyle };

  return (
    <animated.svg
      height={variantStyle.height ? variantStyle.height : "100%"}
      width={variantStyle.width ? variantStyle.width : "100%"}
      viewBox="0 0 100 100"
      style={{
        zIndex: 200,
        position: "absolute",
        opacity: 1,
        ...variantStyle,
      }}
      preserveAspectRatio="none"
    >
      <animated.line
        x1={variantStyle.x1}
        x2={variantStyle.x2}
        y1={variantStyle.y1}
        y2={variantStyle.y2}
        vectorEffect="non-scaling-stroke"
        strokeWidth={`calc(${strokeWidth} * 2px)`}
        stroke={stroke}
      />
    </animated.svg>
  );
}
export default function Rail({
  x1 = 0,
  x2 = 100,
  y1 = 0,
  y2 = 100,
  strokeWidth,
  stroke,
  // stlye applied to static svg elem
  style = {},
  variant = null,
  flex = false,
  // style applied to animated elem
  sx = {},
}) {
  const theme = useTheme();
  return (
    <RailElem
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      style={style}
      strokeWidth={strokeWidth ? strokeWidth : theme.shape.hudThickness}
      stroke={stroke ? stroke : theme.palette.common.white}
      variant={variant}
      flex={flex}
    />
  );
}
