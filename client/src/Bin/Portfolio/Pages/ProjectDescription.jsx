import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { categories, iconDictionary, path404 } from "../Utilities/Utilities";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useSprings, animated, useSpring } from "@react-spring/web";
import ProjectBlock0 from "../Components/ProjectBlock0";
import ProjectBlock1 from "../Components/ProjectBlock1";
import ProjectBlock3 from "../Components/ProjectBlock3";
import ProjectBlock2 from "../Components/ProjectBlock2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ProjectImageCarousel from "../../Carousel/ProjectCarousel";
import Overlay from "../../Utilities/Overlay";

export default function ProjectDescription() {
  const [projectData, setProjectData] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);

  let { projectTitle } = useParams();

  const navigate = useNavigate();

  const ProjectDescriptionBox = styled("div")(({ theme }) => ({
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
      // backgroundColor: "red",
    },
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(2),
      // backgroundColor: "green",
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(3),
      // backgroundColor: "yellow",
    },
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

  const [fade, fadeApi] = useSpring(() => ({ from: { opacity: 0 } }));

  const [blockIn, blockInApi] = useSprings(
    projectData?.content?.blocks.length || 0,
    () => ({
      from: { opacity: 0, scale: 0 },
      trail: 400 / projectData?.content?.blocks.length,
    })
  );

  //extract project data from json data
  useEffect(() => {
    const data = categories
      .reduce((p, n) => {
        return n.projects ? [...p, ...n.projects] : p;
      }, [])
      .filter((v) => v.title === projectTitle);

    if (data.length !== 1) {
      navigate(path404);
    }
    setProjectData(data[0]);

    fadeApi.start({
      to: { opacity: 1 },
      onRest: () => {
        blockInApi.start((index) => ({
          to: { opacity: 1, scale: 1 },
          delay: index * 100,
        }));
      },
    });
  }, []);

  return (
    <Box className="App" sx={{ pb: "15vh" }}>
      <Overlay
        open={carouselImages.length > 0}
        handleClose={() => setCarouselImages([])}
      >
        <ProjectImageCarousel slides={carouselImages} />
      </Overlay>

      <animated.div style={{ ...fade }} className="utilCenter">
        <ProjectDescriptionBox>
          {blockIn.map((props, item) => (
            <animated.div style={props} key={item}>
              {!projectData?.content?.blocks[item].priority
                ? blockDictionary["default"](
                    projectData?.content?.blocks[item],
                    item
                  )
                : blockDictionary[projectData?.content?.blocks[item].priority](
                    projectData?.content?.blocks[item],
                    item
                  )}
            </animated.div>
          ))}
        </ProjectDescriptionBox>
      </animated.div>
      <AppBar
        position="fixed"
        sx={(t) => ({
          top: "auto",
          color: t.palette.primary.main,
          bottom: 0,
          bgcolor: t.palette.background.main,
        })}
      >
        <Toolbar sx={{ height: "10vh" }}>
          <Button
            onClick={() => {
              navigate("/");
            }}
            startIcon={<ArrowBackIosIcon />}
          >
            Back to home
          </Button>
          {projectData?.content?.links ? (
            <Box sx={{ marginLeft: "auto" }} className="utilCenter">
              <Box sx={{ mr: "10px" }}>
                <Typography variant="h6">Project Links:</Typography>
              </Box>
              <Box>
                {projectData.content.links.map((link, index) =>
                  link.icon && iconDictionary[link.icon] ? (
                    <Button key={index} endIcon={iconDictionary[link.icon]()}>
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
