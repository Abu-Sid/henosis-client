import React from "react";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  icon: StaticImageData;
  className?: string;
  href?: string;
  tooltip?: string;
  pathName?: string;
}

const SidebarItem: React.FC<IProps> = ({
  icon,
  className,
  href,
  tooltip,
  pathName,
}) => {
  return (
    <li className={className}>
      <Link href={href === "/" ? "/" : `${pathName}/${href}`}>
        <a>
          <Image src={icon} alt="user-icon" />
        </a>
      </Link>
      {tooltip && <span className="tooltip">{tooltip}</span>}
    </li>
  );
};

export default SidebarItem;
