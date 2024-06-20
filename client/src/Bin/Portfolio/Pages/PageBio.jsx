import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSprings, animated, useSpring, useScroll } from "@react-spring/web";

import React, { useEffect, useRef, useState } from "react";
import Rail from "../Components/Rail";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

export default function PageBio() {
  const theme = useTheme();
  const [initialized, setInitialized] = useState(false);
  const [started, setStarted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const lists = [
    {
      title: "Tech. Art",
      list: [
        "Maya",
        "Arnold",
        "Python",
        "Photoshop",
        "ZBrush",
        "Blender",
        "Substance Painter",
        "Adobe Illustrator",
        "Toon Boom",
        "Davinci Resolve",
        "Abode Audition",
        "Unreal Engine 5",
        "Perforce",
        "Git",
      ],
      p: `Artist with a love for Rigging, Animation, Modeling and Scripting.
      
      Experienced with tools for development throughout the entire product pipeline from concepting, to execution, to delivery, with a focus on Feature Film Animation.`,
    },
    {
      title: "Vis. Dev.",
      list: [
        "Animation",
        "Illustration",
        "Character Design",
        "Asset Design",
        "Oil Painting",
        "Matte painting",
        "Sculpting",
        "Modeling",
        "Storyboarding",
        "Vis Dev",
        "UI/UX",
      ],
      p: `Background in Fine Arts and Traditional art that has grown into experince across a variety of fields. 

Passion for storytelling in all its forms and mediums, with a focus on Feature Film Animation.`,
    },
    {
      title: "Web Dev.",
      list: [
        "FullStack",
        "Mongo",
        "React",
        "Express",
        "Node.js",
        "TDD",
        "Illustration",
        "UI/UX",
        "Perforce",
        "Git",
        "Agile",
      ],
      p: `FullStack MERN Web Developer. 
      
Love of code, love of design, a perfect synnergy in the field. `,
    },
    {
      title: "Games Dev.",
      list: [
        "Unreal Engine 5",
        "Perforce",
        "Python",
        "Git",
        "C++",
        "Maya",
        "Photoshop",
        "ZBrush",
        "Blender",
        "Substance Painter",
        "Agile",
      ],
      p: `Games Development Instructor.
      
Experience as project lead resposible for team management, development, technical direction in an Agile environment.`,
    },
  ];

  const masterList = lists.reduce((acc, next) => {
    return [...acc, ...next.list];
  }, []);

  const duplicates = masterList.filter(
    (item, index) => masterList.indexOf(item) !== index
  );

  const Chip = ({ children }) => {
    const unique = duplicates.indexOf(children) !== -1;
    return (
      <Box
        sx={{
          // chipped corner
          background: `linear-gradient(${
            unique ? "-135deg" : "135deg"
          }, transparent 4px, ${theme.palette.common.white} 0) bottom left;`,
          // border: `${theme.shape.hudThickness}px solid ${theme.palette.common.white}`,
          // background: !unique
          //   ? theme.palette.common.eerieBlack
          //   : theme.palette.common.white,
          color: !unique
            ? theme.palette.common.white
            : theme.palette.common.eerieBlack,
        }}
      >
        <Box
          sx={{
            bgcolor: "red",
            m: "3px",
            p: { xs: 0.5 },
            pl: { xs: 1.5 },
            pr: { xs: 1.5 },
            background: !unique
              ? `linear-gradient(135deg, transparent 3px, ${theme.palette.common.eerieBlack} 0) bottom left;`
              : `linear-gradient(-135deg, transparent 3px, ${theme.palette.common.white} 0) bottom left;`,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </Typography>
        </Box>
      </Box>
    );
  };

  const [widthSprings, widthApi] = useSprings(
    4,
    (index) => ({
      from: {
        widthA: 100,
        widthB: 100,
        x2: 25,
      },
    }),
    []
  );
  const [railSprings, railApi] = useSprings(
    24,
    () => ({
      from: { x2: -1, opacity: 0 },
    }),
    []
  );

  useEffect(() => {
    widthApi.start((index) => ({
      to: { x2: index === hoveredIndex ? -25 : 25 },
    }));
  }, [hoveredIndex]);

  useEffect(() => {
    if (started) {
      railApi.start((index) => ({
        to: [
          { x2: 100, opacity: 0, immediate: initialized },
          { x2: 100, opacity: 1, immediate: initialized },
        ],
        delay: initialized ? 0 : 100 * index,
        config: { duration: 500 },
        onRest: () => {
          if (index > 7 && !initialized) {
            setInitialized(true);
          }
        },
      }));
    }
  }, [railApi, started]);

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.1 && !started) {
        setStarted(true);
      }
    },
  });

  const SliderMenu = ({ v, i }) => {
    return (
      <animated.div
        key={i}
        onClick={() => {
          if (initialized) {
            setHoveredIndex((p) => (p === i ? null : i));
          }
        }}
        style={{
          height: "25%",
          position: "relative",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <Rail variant={"top"} x2={{ ...railSprings[i] }.x2} />
        {i === lists.length - 1 ? (
          <Rail variant={"bottom"} x2={{ ...railSprings[4] }.x2} />
        ) : null}{" "}
        {/* TITLE */}
        <animated.div
          style={{
            position: "absolute",
            display: "flex",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            opacity: railSprings[i + 4].opacity.to((v) => `${v * 0.5}`),
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: { xs: "15vw", md: "12vw", lg: "10vw" },
              color: theme.palette.common.dimGray,
            }}
          >
            {v.title}
          </Typography>
        </animated.div>
        {/* CHIPS */}
        <animated.div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            top: 0,
            left: 0,
            height: "100%",
            width: "200%",
            marginLeft: "-50%",
            justifyContent: "center",
            transform: widthSprings[i].x2.to(
              (v) => `translateX(${i % 2 === 0 ? v : -1 * v}%)`
            ),

            alignItems: "center",
            flexWrap: "no-wrap",
          }}
        >
          <animated.div
            style={{
              width: "50%",
              height: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "5px",
              opacity: railSprings[i + 8].opacity.to((v) => `${v}`),
            }}
          >
            <Box
              sx={{
                height: "fit-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "5px",
                p: 5,
              }}
            >
              {lists[i].list
                .filter((v) => duplicates.indexOf(v) !== -1)
                .sort()
                .map((v, index) => (
                  <Chip key={index}>{v}</Chip>
                ))}
              {lists[i].list
                .filter((v) => duplicates.indexOf(v) === -1)
                .sort()
                .map((v, index) => (
                  <Chip key={index}>{v}</Chip>
                ))}
            </Box>
          </animated.div>
          <animated.div
            style={{
              position: "relative",
              height: "100%",
              width: "50%",
            }}
          >
            <Rail
              stroke={theme.palette.common.lightCoral}
              style={{
                transform: widthSprings[i].x2.to((v) => {
                  return `translateX(${(v / 25) * (i % 2 === 0 ? 3 : -3)}px)`;
                }),
              }}
              variant={i % 2 === 0 ? "left" : "right"}
            />
            <Grid
              container
              sx={{
                p: { xs: 1, sm: 2, md4: 4 },
                pl: { xs: 2 },
                flexDirection: "column",
                width: "100%",
                height: "100%",
                overflow: "scroll",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
              }}
            >
              <Grid item>
                <Typography
                  variant="h3"
                  sx={{
                    p: 2,
                    pl: 0,
                    display: { xs: "none", md: "block" },
                    color: theme.palette.common.sage,
                  }}
                >
                  {v.title}
                </Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Typography
                  variant="p"
                  sx={{
                    whiteSpace: "pre-wrap",
                    width: "100%",
                    fontSize: {
                      xs: `calc(${theme.typography.subtitle1.fontSize})`,
                      md: `calc(${theme.typography.subtitle1.fontSize}* 1.1)`,
                    },
                  }}
                >
                  {v.p}
                </Typography>
              </Grid>
            </Grid>
          </animated.div>
        </animated.div>
      </animated.div>
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setHoveredIndex(null)}>
      <Box
        id="portfolio-about"
        sx={{
          overflow: "hidden",
          minHeight: "400px",
          height: "100vh",
          position: "relative",
          // cursor: "none",
        }}
      >
        <Grid sx={{ height: "100%" }} container flexDirection={"column"}>
          {lists.map((v, i) => (
            <SliderMenu key={i} v={v} i={i} />
          ))}
        </Grid>
      </Box>
    </ClickAwayListener>
  );
}
