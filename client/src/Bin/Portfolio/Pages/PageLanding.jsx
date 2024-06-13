import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import HeadImg from "../HeadImg";
import { useTheme } from "@emotion/react";
import HomepageNav from "../Components/HomepageNav";
import head from "../../../Images/Portfolio/head.gif";

import { letters } from "../Utilities/Utilities";

export default function PageLanding({
  scrollYProgress,
  gridSprings,
  ticksSprings,
  typewriters,
  loadSprings,
}) {
  const [image, cImage] = useState(head);

  const handleHover = (e) => {
    let name = e.target.getAttribute("name");
    let index = letters.indexOf(name);
    if (!isNaN(index) && name) {
      cImage(index);
    }
  };

  const handleExit = (event) => {
    cImage(head);
  };

  const theme = useTheme();
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.eerieBlack,
        color: theme.palette.background.white,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      })}
    >
      <HomepageNav gridSprings={gridSprings} loadSprings={loadSprings} />

      <Grid
        container
        sx={{
          justifyContent: "flex-end",
          height: "100%",
          flex: "1 1 100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Grid item container flexDirection="column" xs={12} lg={6}>
          <Grid
            item
            container
            flex="1"
            flexDirection="column"
            className="utilCenter"
          >
            <Grid
              item
              flex="1"
              className="utilCenter headWrapper"
              sx={{
                minHeight: { xs: "275px" },
                m: { xs: theme.spacing(3) },
              }}
            >
              <HeadImg
                loadSprings={loadSprings}
                imageSet={image}
                handleHover={handleHover}
                handleExit={handleExit}
                gridSprings={gridSprings}
                ticksSprings={ticksSprings}
              />
            </Grid>

            <Grid
              item
              container
              // variant="h1"
              className="test"
              sx={{
                ...theme.type.mono,
                whiteSpace: "noWrap",
                display: "flex",
                overflow: "visible",
                bottom: { xs: 0, md: 3 },
                color: theme.palette.common.sage,
              }}
            >
              <Grid
                xs={6}
                item
                container
                flexDirection="column"
                sx={{
                  pl: { xs: 2 },
                  pb: { xs: 2 },
                  fontSize: `calc(${theme.typography.h6.fontSize} * 0.5`,
                  width: "100%",
                }}
              >
                {typewriters.slice(0, -1).map((v, i) => (
                  <Grid item key={i}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.common.dimGray,
                        ...theme.type.mono,
                        whiteSpace: "noWrap",
                      }}
                    >
                      {v}
                    </Typography>
                  </Grid>
                ))}
                <Grid item>
                  <Typography
                    variant="h2"
                    sx={{
                      ...theme.type.mono,
                      whiteSpace: "noWrap",
                      right: theme.spacing(5),
                      height: "fit-content",
                    }}
                  >
                    {typewriters[4]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
