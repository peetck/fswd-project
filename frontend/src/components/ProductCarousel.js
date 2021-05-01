import React, { Fragment } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ images }) => {
  const renderIndicator = (clickHandler, isSelected) => (
    <span
      className={`inline-flex rounded-full h-3 w-3 mr-2 cursor-pointer ${
        isSelected ? "bg-black" : "bg-coolGray-400"
      }`}
      onClick={clickHandler}
    />
  );

  const renderArrowPrev = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="rounded-full text-2xl text-black focus:outline-none ml-2"
        style={{
          position: "absolute",
          zIndex: 2,
          top: "calc(50% - 15px)",
          width: 30,
          height: 30,
          cursor: "pointer",
          left: 0,
        }}
      >
        <span className="material-icons text-3xl">chevron_left</span>
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="rounded-full text-2xl text-black focus:outline-none mr-2"
        style={{
          position: "absolute",
          zIndex: 2,
          top: "calc(50% - 15px)",
          width: 30,
          height: 30,
          cursor: "pointer",
          right: 0,
        }}
      >
        <span className="material-icons text-3xl">chevron_right</span>
      </button>
    );

  return (
    <Fragment>
      <div
        style={{ width: "750px", height: "500px" }}
        className="hidden lg:inline-block rounded-lg bg-solitude"
      >
        <Carousel
          showStatus={false}
          dynamicHeight
          showArrows={false}
          swipeable={false}
          renderIndicator={renderIndicator}
          autoPlay
          infiniteLoop
          showThumbs={false}
          showArrows
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
        >
          {images?.map((image, index) => (
            <div
              className="w-full"
              style={{ width: "750px", height: "500px" }}
              key={index}
            >
              <img
                className="w-full h-full rounded-md object-contain"
                src={image}
                alt={image}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="lg:hidden">
        <Carousel
          showStatus={false}
          dynamicHeight
          showArrows={false}
          swipeable={false}
          renderIndicator={renderIndicator}
          autoPlay
          infiniteLoop
          showThumbs={false}
          showArrows
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
        >
          {images?.map((image, index) => (
            <img src={image} alt={image} key={index} />
          ))}
        </Carousel>
      </div>
    </Fragment>
  );
};

export default ProductCarousel;
