"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./MainHeader.module.css";

const Navlink = ({ href, children, onClick }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={pathname.startsWith(href) ? classes.active : ""}
    >
      {children}
    </Link>
  );
};

export default Navlink;
