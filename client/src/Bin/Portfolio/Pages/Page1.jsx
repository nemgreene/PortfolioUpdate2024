import { Box, Container } from "@mui/material";
import React from "react";
import HeadImg from "../../Portfolio/HeadImg";
import { useTheme } from "@emotion/react";

export default function Page1({ image, handleExit, handleHover }) {
  const theme = useTheme();
  return (
    <Container
      className="utilCenter"
      sx={{
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
      }}
    >
      <Box
        className="utilCenter"
        sx={{
          bgcolor: theme.palette.background.eerieGray,
          padding: "15% 0",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "fitContent",
            width: "fitContent",
          }}
        >
          <HeadImg
            imageSet={image}
            handleExit={handleExit}
            handleHover={handleHover}
          />
        </Box>
      </Box>
    </Container>
  );
}
