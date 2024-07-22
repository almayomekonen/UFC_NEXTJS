"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const Navlink = ({ href, children }) => {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={pathName.startsWith(href) ? "active" : undefined}
    >
      {children}
    </Link>
  );
};

export default Navlink;
