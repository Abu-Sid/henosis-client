import React from "react";
import Footer from "../Footer";
import Banner from "./Banner";
import BoardSection from "./BoardSection";
import Contact from "./Contact";
import DashboardSection from "./DashboardSection";
import FAQ from "./FAQ";
import FeaturesSection from "./FeaturesSection";
import Testimonial from "./Testimonial";

const HomePage = () => {
  return (
    <>
      <Banner />
      <FeaturesSection />
      <BoardSection />
      <DashboardSection />
      <FAQ />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
