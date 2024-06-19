import React from "react";
import EmblaCarousel from "../../Carousel/ProjectCarousel";
// import Carousel from "react-material-ui-carousel";

function PictureViewer({ images, index }) {
  return (
    <EmblaCarousel
      index={index}
      slides={images.map((v) => ({
        src: `${`data:image/jpeg;base64,${v}`}`,
      }))}
    />
    // <div
    //   className="divWrapper"
    //   style={{
    //     height: "80vh",
    //     width: "80vw",
    //   }}
    //   autoPlay={false}
    // >
    //   {images.map((data, i) => (
    //     <img
    //       key={i}
    //       className="Test"
    //       src={`${`data:image/jpeg;base64,${data}`}`}
    //       style={{
    //         //   overflow: "hidden",
    //         height: "75vh",
    //         width: "100%",
    //         minHeight: "50vh",
    //         backgroundRepeat: "no-repeat",
    //         backgroundSize: "contain",
    //         backgroundPosition: "center",
    //         // backgroundImage: `url(${`data:image/jpeg;base64,${data}`})`,
    //         borderRadius: "10px",
    //         cursor: "pointer",
    //       }}
    //     ></img>
    //   ))}
    // </div>
  );
}

export default PictureViewer;
