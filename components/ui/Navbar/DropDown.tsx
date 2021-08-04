import React, { useContext } from "react";
import Link from "next/link";
import { DropdownContext } from "./Navbar";
import { INav } from "./Navbar";

export const DropdownMenu = ({ children }) => {
  return <div className='dropdown'>{children}</div>;
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
