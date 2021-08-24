import React from "react";
import ReactCardCarousel from "react-card-carousel";
import TestimonialData from "../../../data/TestimonialData.json";

interface ITestimonial {
  testimonial: {
    image: string;
    name: string;
    title: string;
    review: string;
  };
}
const Testimonial: React.FC<ITestimonial> = () => {
  const CONTAINER_STYLE = {
    // position: "relative",
    height: "80vh",
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "middle",
  };
  const CARD_STYLE = {
    height: "22rem",
    width: "37rem",
    paddingTop: "6%",
    background: "linear-gradient(112deg, #d0d1d8 50%, #f0f1f5 50%)",
    color: "rgba(78, 77, 77, 0.856)",
    fontFamily: "Open Sans",
    fontSize: "1.2rem",
    fontStyle: "italic",
    lineHeight: "2rem",
  };

  return (
    <div className="testimonial">
      <h1 data-aos="fade-up">
        Our Client{" "}
        <span
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          Testimonials
        </span>{" "}
      </h1>
      <div>
        <div className="testimonial__container" style={CONTAINER_STYLE}>
          <ReactCardCarousel autoplay={true} autoplay_speed={3500}>
            {TestimonialData.testimonials.map((test) => (
              <div
                key="test.name"
                style={CARD_STYLE}
                className="testimonial__container__card"
              >
                <img src={test.image} alt="" />
                <h4 className="mt-4">{test.name}</h4>
                <small>{test.title}</small>
                <p className="mt-4 ">{test.review} </p>
              </div>
            ))}
          </ReactCardCarousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
