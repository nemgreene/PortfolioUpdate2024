import React from "react";
import FrameButton from "./FrameButton";

const dict = Array.from("abcdefghijklmnopqrstuvwx");

export default function FrameButtonArr({
  ticksSprings,
  handleHover,
  handleExit,
}) {
  return (
    <div style={{ position: "absolute", width: "120%", left: "50%" }}>
      {dict.map((l, index) => {
        return (
          <FrameButton
            key={l}
            name={l}
            index={index}
            ticksSprings={ticksSprings}
            onChange={handleHover}
            onExit={handleExit}
          />
        );
      })}
    </div>
  );
}
