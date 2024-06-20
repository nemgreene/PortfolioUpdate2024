import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef } from "react";
import HoverButton from "./HoverButton";
import { animated } from "react-spring";
import Scroller from "./Scroller";
import Rail from "./Rail";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

export default function HomepageNav({ gridSprings, loadSprings }) {
  const theme = useTheme();
  const navButtonStyles = {
    position: "relative",
    height: "100%",
    width: "100%",
  };
  const flex = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const projectLinkRef = useRef(null);
  const aboutLinkRef = useRef(null);
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        minHeight: { xs: "150px", md: "0" },
        height: "fit-content",
        flexDirection: "row-reverse",
        position: "relative",
      }}
    >
      <Rail
        stroke={theme.palette.common.hudLowContrast}
        x1={"0%"}
        y1={0}
        x2={gridSprings[0].x2.to((x2) => `${x2}%`)}
        y2={0}
        variant={flex ? "top" : "left"}
        flex={!flex}
      />
      <Rail
        stroke={theme.palette.common.hudLowContrast}
        x1={"0%"}
        y1={`100`}
        x2={gridSprings[1].x2.to((x2) => `${x2}%`)}
        y2={`100`}
        variant={flex ? "bottom" : "right"}
        flex={!flex}
      />

      <Rail
        stroke={theme.palette.common.hudLowContrast}
        x1={0}
        x2={0}
        y1={`0`}
        y2={gridSprings[2].x2.to((x2) => `${x2}%`)}
        flex={!flex}
        variant={flex ? "left" : "top"}
      />
      <Rail
        stroke={theme.palette.common.hudLowContrast}
        x1={100}
        x2={100}
        y1={`0`}
        y2={gridSprings[7].x2.to((x2) => `${x2}%`)}
        variant={flex ? "right" : "bottom"}
        flex={!flex}
      />

      <Grid
        container
        item
        xs={12}
        lg={6}
        sx={{ height: { xs: "fit-content", lg: "auto" } }}
      >
        <Grid sx={{ ...navButtonStyles, height: "100%" }} item xs={12} lg={2}>
          <Rail
            stroke={theme.palette.common.hudLowContrast}
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[3].x2.to((x2) => `${x2}%`)}
            variant={flex ? "left" : "bottom"}
            flex={!flex}
          />
          <HoverButton
            sx={{ p: 1 }}
            secondary={theme.palette.common.white}
            loadSprings={loadSprings}
            label={"Projects"}
            onClick={() => {
              projectLinkRef.current.click();
            }}
          />
          <HashLink
            style={{ display: "none" }}
            ref={projectLinkRef}
            to="#portfolio-projects"
            scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
          />
        </Grid>
        <Grid sx={{ ...navButtonStyles }} item xs={12} lg={2}>
          <Rail
            stroke={theme.palette.common.hudLowContrast}
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[4].x2.to((x2) => `${x2}%`)}
            variant={flex ? "left" : "bottom"}
            flex={!flex}
          />
          <HoverButton
            sx={{ p: 1 }}
            secondary={theme.palette.common.white}
            loadSprings={loadSprings}
            label={"About"}
            onClick={() => {
              aboutLinkRef.current.click();
            }}
          />
          <HashLink
            style={{ display: "none" }}
            ref={aboutLinkRef}
            to="#portfolio-about"
            scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
          />
        </Grid>
        <Grid
          sx={{ ...navButtonStyles, display: { xs: "none", lg: "flex" } }}
          item
          xs={12}
          lg={6}
        >
          <Rail
            stroke={theme.palette.common.hudLowContrast}
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[5].x2.to((x2) => `${x2}%`)}
            flex={!flex}
          />
        </Grid>
        <Grid
          sx={{ ...navButtonStyles }}
          className="testTest"
          item
          xs={12}
          lg={2}
        >
          <Rail
            stroke={theme.palette.common.hudLowContrast}
            x1={flex ? 0 : 100}
            x2={flex ? 0 : 100}
            y1={`0`}
            y2={gridSprings[6].x2.to((x2) => `${x2}%`)}
            variant={flex ? "left" : "bottom"}
            flex={!flex}
          />

          <HoverButton
            sx={{ p: 1 }}
            secondary={theme.palette.common.white}
            loadSprings={loadSprings}
            label={"Contact"}
            onClick={() => navigate("/contact")}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{
          p: 0,
          pt: { xs: 0, lg: 1 },
          pb: { xs: 0, lg: 1 },
          overflow: "hidden",
          ...navButtonStyles,
        }}
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        lg={6}
        container
      >
        <animated.div
          style={{
            ...loadSprings,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Scroller
            sx={{
              span: {
                li: {
                  "::marker": { color: theme.palette.common.lightCoral },
                },
              },
            }}
            labels={[
              "Technical Artist",
              "Web Developer",
              "Games Developer",
              "Visual Development",
            ].map((v, i) => (
              <li
                style={{
                  marginLeft: "20px",
                }}
              >
                <Typography variant="h4" sx={{ p: 1 }}>
                  {v}
                </Typography>
              </li>
            ))}
          />
        </animated.div>
      </Grid>
    </Grid>
  );
}
