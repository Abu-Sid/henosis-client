import React from "react";
import { motion, useAnimation } from "framer-motion";

const Test = () => {
  const control = useAnimation();
  const styles = {
    height: 200,
    width: 200,
    backgroundColor: "red",
  };
  return (
    <div>
      <div
        style={{ background: "green" }}
        onMouseEnter={() => {
          control.start({
            x: 200,
          });
        }}
        onMouseLeave={() => {
          control.start({
            x: 0,
          });
        }}
      >
        Click me
      </div>
      <motion.div animate={control} style={styles}></motion.div>
    </div>
  );
};

export default Test;
