import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSprings, animated, useSpring } from "@react-spring/web";

export default function AccordionMenu({
  index,
  children,
  data,
  menuHoverSpring,
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        width: "calc(100% -2px) ",
        position: "relative",
      }}
    >
      <Box sx={{ pb: 10 }}>
        {data?.map((v, i) => (
          <Box key={i}>
            <animated.div style={{ ...menuHoverSpring[index], opacity: 0.95 }}>
              <Button
                endIcon={
                  <NavigateNextIcon
                    className="promptIcon"
                    sx={{ opacity: 0 }}
                  />
                }
                fullWidth
                onClick={() => {
                  if (children) children(v, i, index);
                }}
                sx={(theme) => ({
                  whiteSpace: "nowrap",
                  borderRadius: 0,
                  boxShadow: "none",
                  bgcolor: "inherit",
                  color: "inherit",

                  "&:hover": {
                    boxShadow: "none",
                    bgcolor: theme.palette.common.lightCoral,
                    "& .promptIcon": {
                      opacity: 1,
                    },
                  },
                })}
                variant="contained"
              >
                {v.title}
              </Button>
            </animated.div>
          </Box>
        ))}
        {!data ? (
          <Box>
            <Button
              fullWidth
              disabled
              sx={(t) => ({
                whiteSpace: "nowrap",
                borderRadius: 0,
                boxShadow: "none",
                bgcolor: "unset",
                color: "white",
                opacity: t.shape.frameLineOpacity,
                "&:disabled": {
                  color: theme.shape.hudLowContrast,
                  opacity: 0.5,
                },
              })}
              variant="contained"
            >
              {"<< "}Choose A Subject
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
