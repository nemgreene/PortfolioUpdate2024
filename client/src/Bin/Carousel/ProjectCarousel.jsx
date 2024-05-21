import React from "react";
import { DotButton, useDotButton } from "./ProjectCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./ProjectCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Box, ImageListItem, ImageListItemBar, styled } from "@mui/material";

const EmblaCarousel = ({ slides = [], options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const CarouselImage = styled("img")(({ theme }) => ({
    maxHeight: "80vh",
    maxWidth: "80vw",
    height: "auto",
    width: "auto",
  }));

  return (
    <Box sx={{ p: 5 }}>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <Box
            sx={{ height: "80vh", width: "80vw" }}
            className="embla__container"
          >
            {slides.map((v, index) => (
              <div className="embla__slide utilCenter" key={index}>
                <div className="embla__slide__number utilRoundedBorder">
                  <ImageListItem>
                    <CarouselImage src={v.src}></CarouselImage>
                    {v.title ? <ImageListItemBar title={v.title} /> : null}
                  </ImageListItem>
                </div>
              </div>
            ))}
          </Box>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </Box>
  );
};

export default EmblaCarousel;
