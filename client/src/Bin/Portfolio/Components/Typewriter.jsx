import React from "react";
import { useSpringRef, animated, useSprings } from "react-spring";

export default function Typewriter(message, immediate = false) {
  const typingApi = useSpringRef();
  const [typing] = useSprings(message.length, (i) => ({
    ref: typingApi,
    from: {
      display: 0,
    },
    to: {
      display: 1,
    },
    delay: immediate ? 0 : i * 50,
    config: { duration: 150 },
    immediate,
  }));

  const elem = (
    <span>
      {typing.map((props, index) => (
        <animated.span
          key={index}
          style={{
            whiteSpace: "pre",
            display: props.display.to((v) =>
              v < 0.5 ? "none" : "inline-block"
            ),
          }}
        >
          {message[index]}
        </animated.span>
      ))}
    </span>
  );
  return [elem, typingApi];
}
