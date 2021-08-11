import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface IProps {
  icon: StaticImageData;
  className?: string;
  href?: string;
}

const SidebarItem: React.FC<IProps> = ({ icon, className, href }) => {
  const router = useRouter();
  const path = router.query.paths?.[0];
  return (
    <li className={className}>
      <Link href={href === "/" ? "/" : `${path}/${href}`}>
        <a>
          <Image src={icon} alt='user-icon' />
        </a>
      </Link>
      <span className='tooltip'>Mir Hussain</span>
    </li>
  );
};

export default SidebarItem;
