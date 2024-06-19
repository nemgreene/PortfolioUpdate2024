import { Box, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useSprings, animated, useSpring, config } from "@react-spring/web";
import { ThemeContext, useTheme } from "@emotion/react";
import HoverButton from "../Components/HoverButton";
// import Clock from "../Components/Clock";
import Rail from "../Components/Rail";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Page2Content({
  activeProject = {},
  previewSpring,
  setActiveProjectIndex,
  activeField,
  previewApi,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleProjectChange = (next = true) => {
    previewApi.start((index) => ({
      to: [
        { opacity: 1, x1: 0 },
        { opacity: 0, x1: 0 },
      ],
      config: { duration: 300 },
    }));
    setTimeout(() => {
      setActiveProjectIndex((p) => {
        let progress = next ? p + 1 : p - 1;
        progress =
          progress < 0
            ? activeField.projects.length
            : progress >= activeField.projects.length - 1
            ? 0
            : progress;
        return progress;
      });
      previewApi.start((index) => ({
        to: { opacity: 1, x1: 100 },
        delay: 200 * index,
        config: { duration: 300 },
      }));
    }, 800);
  };

  const TitleBanner = () => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        mt: { xs: 0, md: "calc(100vh/ 12)" },
        width: { xs: "100vw", md: "83vw" },
        zIndex: 250,
      }}
    >
      {/* Banner */}
      <Grid
        container
        sx={{
          justifyContent: "stretch",
          height: "calc(100vh/ 12)",
          position: "relative",
        }}
      >
        <Rail
          x1={0}
          x2={previewSpring[0].x1.to((v) => v)}
          y1={0}
          y2={0}
          variant="top"
        />
        <Rail
          x1={0}
          x2={previewSpring[1].x1.to((v) => v)}
          y1={0}
          y2={0}
          variant="bottom"
        />
        <Rail
          x1={0}
          x2={0}
          y1={0}
          y2={previewSpring[2].x1.to((v) => v)}
          variant="left"
        />
        <Rail
          x1={0}
          x2={0}
          y1={0}
          y2={previewSpring[5].x1.to((v) => v)}
          variant="right"
        />
        <Grid
          item
          sx={{
            flex: 1,
            height: "100%",
            position: "relative",
            display:
              activeField?.projects?.length > 1
                ? { xs: "none", md: "block" }
                : "none",
          }}
        >
          <Rail
            x1={0}
            x2={0}
            y1={0}
            y2={previewSpring[3].x1.to((v) => v)}
            variant="right"
          />
          <HoverButton
            label={"Prev"}
            secondary={theme.palette.common.white}
            onClick={() => handleProjectChange(false)}
          />
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
            height: "100%",
            bgcolor: theme.palette.common.eerieBlack,
          }}
          className="utilCenter"
        >
          <Typography
            className="utilCenter"
            sx={{
              whiteSpace: "nowrap",
              p: 2,
              fontSize: {
                xs: theme.typography.h5.fontSize,
                sm: theme.typography.h3.fontSize,
                md: theme.typography.h2.fontSize,
                lg: theme.typography.h1.fontSize * 0.9,
              },
            }}
          >
            <span
              style={{
                color: theme.palette.common.dimGray,
              }}
            >{`<subject>`}</span>
            {activeField?.title
              ? activeField?.title.split(" ").join(".")
              : "Test.Title"}
            <span
              style={{
                color: theme.palette.common.dimGray,
              }}
            >{`</subject>`}</span>
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
            height: "100%",
            position: "relative",
            display:
              activeField?.projects?.length > 1
                ? { xs: "none", md: "block" }
                : "none",
          }}
        >
          <Rail
            x1={0}
            x2={0}
            y1={0}
            y2={previewSpring[4].x1.to((v) => v)}
            variant="left"
          />

          <HoverButton
            label={"Next"}
            onClick={() => handleProjectChange(true)}
            secondary={theme.palette.common.white}
            sx={{
              position: "relative",
              zIndex: 9,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
  const linkRef = useRef(null);

  const DescriptionPanel = ({ attrs }) => (
    <Grid
      item
      {...attrs}
      container
      flexDirection={"column"}
      justifyContent={"flex-end"}
      alignItems={"flex-end"}
      sx={{
        bgcolor: theme.palette.common.eerieBlack,
        position: "relative",
      }}
    >
      <Rail
        x1={0}
        x2={0}
        y1={0}
        y2={previewSpring[6].x1.to((v) => v)}
        variant="left"
      />
      <Rail
        x1={0}
        x2={0}
        y1={0}
        y2={previewSpring[7].x1.to((v) => v)}
        variant="right"
      />
      <Grid
        item
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          pl: { xs: 2, sm: 3, md: 4, lg: 5 },
          pr: { xs: 2, sm: 3, md: 4, lg: 5 },
          pb: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.common.lightCoral,
            pb: 2,
            width: "100%",
            textAlign: "justify",
          }}
          whiteSpace="pre-line"
        >
          {activeProject.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.common.white,

            pt: 0,
            width: "100%",
            textAlign: "justify",
          }}
          whiteSpace="pre-line"
        >
          {activeProject?.content?.description?.p}
        </Typography>
      </Grid>

      <Grid
        item
        sx={{
          width: "100%",
          height: "calc(100vh/ 12)",
          mb: "calc(100vh/ 12)",
          position: "relative",
        }}
      >
        <Link
          ref={linkRef}
          to={
            activeProject?.content?.description?.url ||
            `projects/${activeProject.title}`
          }
          target="_blank"
          sx={{ display: "none" }}
        ></Link>
        <HoverButton
          onClick={() => {
            if (activeProject?.content?.description?.url) {
              linkRef.current.click();
            } else {
              navigate(`projects/${activeProject.title.split(" ").join("_")}`);
            }
          }}
          label={"VIEW_PROJECT:[ok]"}
          primary={theme.palette.common.sage}
          secondary={theme.palette.common.eerieBlack}
        />
      </Grid>
    </Grid>
  );

  const ImagePanel = ({ attrs }) => (
    <Grid item {...attrs} className="utilCenter">
      <Box
        sx={{
          height: { xs: "50%", md: `${(100 / 12) * 4}vh` },
          width: { xs: "50%", md: `${(100 / 12) * 2}vw` },
          overflow: "hidden",
        }}
        className="utilCenter"
      >
        <animated.img
          style={{
            opacity: 1,
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
          src={activeProject?.content?.description?.image?.src}
        ></animated.img>
      </Box>
    </Grid>
  );

  //   clockTApi.start();
  return (
    <animated.div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
      }}
    >
      {/* COntent */}
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={1}></Grid>
        {activeProject.title ? (
          <DescriptionPanel
            attrs={{
              xs: 5,
              md: 4,
              lg: 3,
            }}
          />
        ) : null}
        <ImagePanel attrs={{ xs: 6, md: 7, lg: 4 }} />
      </Grid>
      {/* Banner */}
      <TitleBanner />
    </animated.div>
  );
}
