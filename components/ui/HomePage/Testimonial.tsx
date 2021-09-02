import React from "react";
import ReactCardCarousel from "react-card-carousel";
import TestimonialData from "../../../data/TestimonialData.json";

interface ITestimonial {
  testimonial?: {
    image?: string;
    name?: string;
    title?: string;
    review?: string;
  };
}
const Testimonial: React.FC<ITestimonial> = () => {
  return (
    <div className="testimonial">
      <h1 data-aos="fade-up">
        Our Client
        <span
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          Testimonials
        </span>
      </h1>
      <div>
        <div className="testimonial__container">
          <ReactCardCarousel autoplay={true} autoplay_speed={3500}>
            {TestimonialData?.testimonials?.map((test) => (
              <div key="test.name" className="testimonial__container__card">
                <img src={test.image} alt="" />
                <h4>{test.name}</h4>
                <small>{test.title}</small>
                <p>{test.review} </p>
              </div>
            ))}
          </ReactCardCarousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
