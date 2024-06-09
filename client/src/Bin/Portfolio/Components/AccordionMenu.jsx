import { Box } from "@mui/material";
import React, { useRef } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HoverButton from "./HoverButton";
import { useGesture } from "@use-gesture/react";

export default function AccordionMenu({
  index,
  children,
  data,
  handleHover = () => {},
}) {
  const target = useRef(null);
  useGesture(
    {
      onHover: ({ hovering }) => hovering && handleHover(index),
    },
    { target, eventOptions: { passive: false } }
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        width: "100%",
        position: "relative",
      }}
      ref={target}
    >
      <Box>
        {data?.map((v, i) => (
          <Box key={i}>
            <HoverButton
              onClick={() => {
                if (children) children(v, i, index);
              }}
              sx={{
                opacity: 0.8,
                zIndex: 10,
                p: 1.5,
                "&:hover": { "& #promptIcon": { opacity: 1 } },
              }}
              label={
                <span>
                  {v.title}
                  <NavigateNextIcon
                    id="promptIcon"
                    sx={{
                      transition: "0.3s",
                      opacity: 0,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      height: "100%",
                    }}
                  />
                </span>
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
