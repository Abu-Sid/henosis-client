import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleSet = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSet);

    return () => window.removeEventListener("resize", handleSet);
  }, []);

  return screenSize;
};

export default useScreenSize;
