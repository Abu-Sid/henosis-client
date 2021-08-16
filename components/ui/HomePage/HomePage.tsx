import React from "react";
import Footer from "../Footer";
import Banner from "./Banner";
import BoardSection from "./BoardSection";
import Contact from "./Contact";
import DashboardSection from "./DashboardSection";
import FeaturesSection from "./FeaturesSection";

const HomePage = () => {
  return (
    <>
      <Banner />
      <FeaturesSection />
      <BoardSection />
      <DashboardSection />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
