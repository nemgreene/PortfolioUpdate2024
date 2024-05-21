import { ImageListItem, ImageList, Box, Skeleton, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";

export default function ProjectPreviewImages({ images }) {
  const [orderedImages, setOrderedImages] = useState([]);
  // list of all images that have been laoded
  const [loadedImagesTally, setLoadedImagesTally] = useState(0);
  //once all images are loaded
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  // Images will be sorted by priority
  // Prioirty 0 == hero banner
  const priority = {
    0: { rows: 2, cols: 4 },
    1: { rows: 2, cols: 2 },
    2: { rows: 1, cols: 1 },
  };

  const [fadeIn, fadeInApi] = useSprings(orderedImages.length || 0, () => ({
    from: { opacity: 0, scale: 0.9 },
  }));

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  useEffect(() => {
    // fade out images once images are changed
    // fadeInApi.start((index) => ({
    //   to: { opacity: 0, scale: 0.9 },
    //   immediate: true,
    // }));
    setOrderedImages(images.sort((p, n) => p.priority > n.priority));
  }, [images]);

  useEffect(() => {
    // once images are in state and sorted, reset loaded
    setAllImagesLoaded(false);
    setLoadedImagesTally(0);
  }, [orderedImages]);

  useEffect(() => {
    // once all images are loaded, fade them in
    console.log("All images laoded");
    if (orderedImages.length === loadedImagesTally) {
      setAllImagesLoaded(true);
      console.log("All images laoded");
    }
    //   // setLoaded(true);
    //   fadeInApi.start((index) => ({
    //     to: { opacity: 1, scale: 1 },
    //     delay: 50 * index,
    //   }));
    // }
  }, [loadedImagesTally]);

  const EmbeddedImage = ({ item, index }) => {
    //Child of ImageList
    return (
      <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
        <img
          {...srcset(item.src, 121, item.rows, item.cols)}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    );
  };

  const LoadingImage = ({ item, index }) => {
    const [localLoaded, setLocalLoaded] = useState();
    return (
      <Grid item sx={{ height: "25vh" }} xs={item.cols} key={index}>
        <Skeleton
          sx={{
            height: "100%",
            ml: 1,
            mr: 1,
          }}
        />
        <img
          style={{ height: "50px", position: "absolute", display: "none" }}
          src={item.src}
        ></img>
      </Grid>
    );
  };
  const LoadingList = () => {
    return (
      <Grid container>
        {orderedImages.map((item, index) => (
          <LoadingImage item={item} index={index} />
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      {!allImagesLoaded ? (
        <ImageList variant="quilted" cols={12} sx={{ width: "100%" }}>
          {orderedImages.map((item, index) => (
            <EmbeddedImage item={item} index={index} key={index} />
          ))}
        </ImageList>
      ) : (
        <LoadingList />
      )}
    </Box>
  );
}
