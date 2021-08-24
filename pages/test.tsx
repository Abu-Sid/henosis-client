import React, { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

const Test = () => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <div className='faq-card' onClick={() => setSelectedId("mir")}>
        <h1>What is Henosis ?</h1>
      </div>
      {selectedId && (
        <div>
          <button onClick={() => setSelectedId(null)}>Close</button>
          <h1>Fuck you</h1>
        </div>
      )}
    </>
  );
};

export default Test;
