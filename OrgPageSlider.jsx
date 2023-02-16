import React, { Fragment } from "react";
import Slider from "react-slick";

function OrgPageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <Fragment>
      <Slider {...settings}>
        <div>
          {" "}
          <img
            src="https://sabio-training.s3-us-west-2.amazonaws.com/5f01d34c-5197-48d8-87c0-666619b2b5a1/Id 1 pic 3.jpg"
            className="rounded orgPage-img m-2"
            alt="..."
          ></img>
        </div>
        <div>
          <h3>
            {" "}
            <img
              src="https://sabio-training.s3-us-west-2.amazonaws.com/92b003b9-529d-4fcc-8730-574cd09ba845/Id 1 pic 1.jpg"
              className="rounded orgPage-img m-2"
              alt="..."
            ></img>
          </h3>
        </div>
        <div>
          <img
            src="https://sabio-training.s3-us-west-2.amazonaws.com/ff3696b0-91b0-4702-ba43-94e909cfff72/Id 1 pic 2.jpg"
            className="rounded orgPage-img m-2"
            alt="..."
          ></img>{" "}
        </div>
        <div>
          {" "}
          <img
            src="https://sabio-training.s3-us-west-2.amazonaws.com/688d7346-e6ef-4bb9-af74-5e104913d094/Id 1 pic 4.jpg"
            className="rounded orgPage-img m-2"
            alt="..."
          ></img>{" "}
        </div>
      </Slider>
    </Fragment>
  );
}

export default OrgPageSlider;
