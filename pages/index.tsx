import { motion } from "framer-motion";
import React from "react";
import HomePage from "../components/ui/HomePage/HomePage";

const Home = () => {
  return (
    <motion.section exit={{ opacity: 0 }} className="home-section">
      <HomePage />
    </motion.section>
  );
};

export default Home;
