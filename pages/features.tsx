import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FeatureSubSection from "../components/ui/Feature/FeatureSubSection";
import FeaturesData from "../data/FeaturesData.json";

const Features = () => {
  return (
    <motion.section exit={{ opacity: 0 }} className='features-section'>
      <div className='features-section__intro'>
        <h1>Features for large scale development.</h1>
        <h2>
          Henosis Software is the project management tool for agile teams.
        </h2>
        <Link href='/signup'>
          <a>Get Started</a>
        </Link>
      </div>
      {FeaturesData.features.map((feature) => (
        <FeatureSubSection key={feature.id} feature={feature} />
      ))}
    </motion.section>
  );
};

export default Features;
