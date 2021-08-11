import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface IProps {
  icon: StaticImageData;
  className?: string;
  href?: string;
  tooltip?: string;
}

const SidebarItem: React.FC<IProps> = ({ icon, className, href, tooltip }) => {
  const router = useRouter();
  const path = router.query.paths?.[0];
  return (
    <li className={className}>
      <Link href={href === "/" ? "/" : `${path}/${href}`}>
        <a>
          <Image src={icon} alt='user-icon' />
        </a>
      </Link>
      {tooltip && <span className='tooltip'>{tooltip}</span>}
    </li>
  );
};

export default SidebarItem;
