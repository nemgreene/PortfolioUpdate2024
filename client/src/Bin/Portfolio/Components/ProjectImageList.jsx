import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemBar, Skeleton } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ProjectImageList({ images, setCarouselImages }) {
  return (
    <ImageList variant="quilted" cols={12}>
      {images?.map((v, i) => (
        <ImageListItem
          sx={{ cursor: "pointer" }}
          key={i}
          cols={v.cols || 12 / images.length || 1}
          rows={v.rows || 1}
          onClick={() => {
            if (setCarouselImages) {
              setCarouselImages(images);
            }
          }}
        >
          <img
            {...srcset(v.src, 11, v.rows, v.cols)}
            alt={v.title}
            loading="lazy"
          />
          {v.title ? <ImageListItemBar title={v.title} /> : null}
        </ImageListItem>
      ))}
    </ImageList>
  );
}
