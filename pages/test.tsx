import React, { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

const Test = () => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      {selectedId === null && (
        <div onClick={() => setSelectedId("mir")}>
          <h5>Mir</h5>
        </div>
      )}

      {selectedId && (
        <div>
          <h5>Mir Hussain</h5>
          <button onClick={() => setSelectedId(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Test;
