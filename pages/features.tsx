import React from "react";
import Gear from "../components/Gear";
import FeatureSubSection from "../components/ui/Feature/FeatureSubSection";

const Features = () => {
  return (
    <section className='features-section'>
      <div className='features-section__intro'>
        <h1>Features for large scale development.</h1>
        <h2>
          Henosis Software is the project management tool for agile teams.
        </h2>
        <button>Get Started</button>
      </div>
      <FeatureSubSection />
    </section>
  );
};

export default Features;
