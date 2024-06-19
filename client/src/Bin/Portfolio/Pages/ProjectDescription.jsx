import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { categories, iconDictionary, path404 } from "../Utilities/Utilities";
import useMeasure from "react-use-measure";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useSprings, animated, useSpring, useScroll } from "@react-spring/web";
import ProjectBlock0 from "../Components/ProjectBlock0";
import ProjectBlock1 from "../Components/ProjectBlock1";
import ProjectBlock3 from "../Components/ProjectBlock3";
import ProjectBlock2 from "../Components/ProjectBlock2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ProjectImageCarousel from "../../Carousel/ProjectCarousel";
import Overlay from "../../Utilities/Overlay";
import Twinkler from "../Components/Twinkler";
import { useGesture } from "@use-gesture/react";
import HoverButton from "../Components/HoverButton";

export default function ProjectDescription() {
  const [projectData, setProjectData] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);
  const theme = useTheme();
  let dataRef = useRef(null);
  let { projectTitle } = useParams();

  const navigate = useNavigate();

  const ProjectDescriptionBox = styled("div")(({ theme }) => ({
    position: "relative",
  }));

  const blockDictionary = {
    0: (blockData, index) => (
      <ProjectBlock0
        blockData={blockData}
        index={index}
        key={index}
        setCarouselImages={setCarouselImages}
      />
    ),
    1: (blockData, index) => (
      <ProjectBlock1
        blockData={blockData}
        index={index}
        key={index}
        setCarouselImages={setCarouselImages}
      />
    ),
    2: (blockData, index) => (
      <ProjectBlock2
        blockData={blockData}
        index={index}
        key={index}
        setCarouselImages={setCarouselImages}
      />
    ),
    3: (blockData, index) => (
      <ProjectBlock3
        blockData={blockData}
        index={index}
        key={index}
        setCarouselImages={setCarouselImages}
      />
    ),
    4: (blockData, index) => (
      <ProjectBlock1
        blockData={blockData}
        index={index}
        key={index}
        setCarouselImages={setCarouselImages}
      />
    ),
    default: (blockData, index) => (
      <ProjectBlock0
        blockData={blockData}
        index={index}
        key={index}
        setCarouselImages={setCarouselImages}
      />
    ),
  };

  const [fade, fadeApi] = useSpring(() => ({ from: { opacity: 1 } }));

  const [blockIn, blockInApi] = useSprings(
    projectData?.content?.blocks.length || 0,
    () => ({
      from: { opacity: 0, scale: 0 },
      // trail: 400 / projectData?.content?.blocks.length,
    })
  );

  //extract project data from json data
  useEffect(() => {
    const data = categories
      .reduce((p, n) => {
        return n.projects ? [...p, ...n.projects] : p;
      }, [])
      .filter((v) => v.title.split(" ").join("_") === projectTitle);

    if (data.length !== 1) {
      navigate(path404);
    }
    setProjectData(data[0]);
  }, []);

  useEffect(() => {
    blockInApi.start((index) => ({
      to: { opacity: 1, scale: 1 },
      delay: index * 100,
    }));
  }, [projectData]);

  return (
    <Box
      className="App"
      sx={{
        bgcolor: theme.palette.common.eerieBlack,
        color: theme.palette.common.white,
        width: "100vw",
        heihgt: "fit-content",
        p: 0,
      }}
      // ref={ref}
    >
      <Overlay
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: theme.palette.common.eerieBlack,
          boxShadow: 24,
        }}
        open={carouselImages.length > 0}
        handleClose={() => setCarouselImages([])}
      >
        <ProjectImageCarousel slides={carouselImages} />
      </Overlay>
      <Twinkler number={10}>
        <animated.div style={{ opacity: 1 }} className="utilCenter fadeIn">
          <ProjectDescriptionBox>
            {blockIn.map((props, item) => (
              <animated.div style={{ ...props }} key={item}>
                {!projectData?.content?.blocks[item].priority
                  ? blockDictionary["default"](
                      projectData?.content?.blocks[item],
                      item
                    )
                  : blockDictionary[
                      projectData?.content?.blocks[item].priority
                    ](projectData?.content?.blocks[item], item)}
              </animated.div>
            ))}
          </ProjectDescriptionBox>
        </animated.div>
      </Twinkler>
      <AppBar
        position="fixed"
        sx={(t) => ({
          top: "auto",
          color: t.palette.common.white,
          bottom: 0,
          bgcolor: t.palette.common.eerieBlack,
        })}
      >
        <Toolbar
          className="test"
          sx={{
            height: theme.spacing(10),
            paddingLeft: "0 !important",
          }}
        >
          <Box
            sx={{
              minWidht: "100px",
              width: { xs: "33vw", md: "15vw" },
              height: "100%",
            }}
          >
            <HoverButton
              onClick={() => {
                navigate("/");
              }}
              startIcon={<ArrowBackIosIcon />}
              label={<span>Back to home</span>}
            ></HoverButton>
          </Box>
          {projectData?.content?.links ? (
            <Box sx={{ marginLeft: "auto" }} className="utilCenter">
              <Box sx={{ mr: "10px" }}>
                <Typography sx={{ color: "inherit" }} variant="h6">
                  Project Links:
                </Typography>
              </Box>
              <Box>
                {projectData.content.links.map((link, index) =>
                  link.icon && iconDictionary[link.icon] ? (
                    <Button
                      sx={{ color: "inherit" }}
                      key={index}
                      endIcon={iconDictionary[link.icon]()}
                    >
                      {link.icon}
                    </Button>
                  ) : null
                )}
              </Box>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
