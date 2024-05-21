import React from "react";
import FrameButton from "./FrameButton";

const dict = Array.from("abcdefghijklmnopqrstuvwx");

export default function FrameButtonArr({ handleHover, handleExit }) {
  return (
    <div style={{ position: "absolute", width: "120%", left: "50%" }}>
      {dict.map((l) => {
        return (
          <FrameButton
            key={l}
            name={l}
            onChange={handleHover}
            onExit={handleExit}
          />
        );
      })}
    </div>
  );
}
