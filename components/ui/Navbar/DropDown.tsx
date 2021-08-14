import React, { useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { DropdownContext } from "./Navbar";
import { INav } from "./Navbar";
import HandleOutsideClick from "../HandleOutsideClick";

const useOutsideClickHandler = (ref) => {
  const [open, setOpen] = useContext(DropdownContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(!open);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const DropdownMenu = ({ children }) => {
  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef);
  return (
    <div ref={wrapperRef}>
      <div className='dropdown'>{children}</div>
    </div>
  );
};

export const DropdownItem: React.FC<INav> = ({
  children,
  href,
  functionality,
}) => {
  const [open, setOpen] = useContext(DropdownContext);

  const handleClick = () => {
    functionality();
    setOpen(!open);
  };
  return (
    <div className='dropdown__item'>
      {!href && <a onClick={handleClick}>{children}</a>}
      {href && (
        <Link href={href}>
          <a onClick={() => setOpen(!open)}>{children}</a>
        </Link>
      )}
    </div>
  );
};
