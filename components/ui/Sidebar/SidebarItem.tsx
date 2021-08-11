import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface IProps {
  icon: StaticImageData;
  className?: string;
}

const SidebarItem: React.FC<IProps> = ({ icon, className }) => {
  const router = useRouter();
  const path = router.query.paths?.[0];
  return (
    <li className={className}>
      <Link href={`${path}/personal-dashboard`}>
        <a>
          <Image src={icon} alt='user-icon' />
        </a>
      </Link>
      <span className='tooltip'>Mir Hussain</span>
    </li>
  );
};

export default SidebarItem;
