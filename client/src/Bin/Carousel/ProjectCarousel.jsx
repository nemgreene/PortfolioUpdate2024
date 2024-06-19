import React, { useEffect } from "react";
import { DotButton, useDotButton } from "./ProjectCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./ProjectCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Box, ImageListItem, ImageListItemBar, styled } from "@mui/material";
import { useTheme } from "@emotion/react";

const EmblaCarousel = ({ slides = [], options, sx = {}, index = 0 }) => {
  const theme = useTheme();
  const sxStructured = {
    container: {
      maxHeight: "80vh",
      "& .embla": {
        display: "flex",
        flexDirection: "column",
      },
      "& .embla__viewport": {
        display: "flex",
        maxHeight: { xs: "60vh", md: "70vh" },
        flexDirection: "column",
      },
      "& .embla__button": {
        boxShadow: `inset 0 0 0 0.2rem ${theme.shape.hudLowContrast + "50"}`,
        width: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        height: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        ...sx.dotButton,
      },
      "& .embla__dot": {
        width: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        height: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        ...sx.dot,
      },
      bgcolor: theme.palette.common.eerieBlack,
      "& .embla__button:disabled": {
        color: theme.shape.hudLowContrast + "50",
        ...sx.buttonDisabled,
      },
      "& .embla__dot::after": {
        boxShadow: `inset 0 0 0 0.2rem ${theme.shape.hudLowContrast + "50"}`,
        ...sx.dotAfter,
      },
      "& .embla__dot--selected::after": {
        boxShadow: `inset 0 0 0 0.2rem ${theme.palette.common.white}`,
        ...sx.dotSelectedAfter,
      },
    },
    ...sx,
  };
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
    display: "flex",
    alignItems: "center",
  }));

  useEffect(() => {
    if (emblaApi && !isNaN(index)) {
      emblaApi.scrollTo(index, true);
    }
  }, [emblaApi, index]);

  return (
    <Box sx={{ p: { xs: 3, md: 4, lg: 5 }, ...sxStructured.container }}>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <Box
            sx={{ height: "80vh", width: "80vw" }}
            className="embla__container"
          >
            {slides.map((v, index) => (
              <div className="embla__slide utilCenter" key={index}>
                <div className="embla__slide__number utilRoundedBorder">
                  <ImageListItem sx={{ objectFit: "cover" }}>
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
