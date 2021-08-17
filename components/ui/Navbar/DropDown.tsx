import Link from "next/link";
import React, { useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DropdownContext, INav } from "./Navbar";

interface IDropdown {
  width: number;
}

export const DropdownMenu = ({ children, width }) => {
  const [open, setOpen] = useContext(DropdownContext);

  const closeDropdown = () => {
    setOpen(!open);
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  return (
    <div ref={ref}>
      <div style={{ width: `${width}px` }} className='dropdown'>
        {children}
      </div>
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
