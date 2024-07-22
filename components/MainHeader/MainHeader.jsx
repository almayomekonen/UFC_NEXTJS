import Navlink from "./Navlink";

import Link from "next/link";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Navlink href="/news">News</Navlink>
          </li>
          <li>
            <Navlink href="/archive">Archive</Navlink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
