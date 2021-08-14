import React, { useEffect, useRef } from "react";

const useOutsideClickHandler = (ref) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const HandleOutsideClick: React.FC = ({ children }) => {
  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef);

  return <div ref={wrapperRef}>{children}</div>;
};

export default HandleOutsideClick;
