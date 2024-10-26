"use client";

import { useState } from "react";
import Link from "next/link";
import Navlink from "./Navlink";
import classes from "./MainHeader.module.css";

export default function MainHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavlinkClick = () => {
    setShowMenu(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={classes.mainHeader}>
      <div className={classes.logo}>
        <Link href="/">UFC</Link>
      </div>

      <nav className={classes.desktopMenu}>
        <ul>
          <li>
            <Navlink href="/athletes">ATHLETES</Navlink>
          </li>
          <li>
            <Navlink href="/archive">ARCHIVE</Navlink>
          </li>
        </ul>
      </nav>

      <div className={classes.searchContainer}>
        <button
          className={classes.searchButton}
          onClick={() => setShowSearchInput(!showSearchInput)}
        >
          🔍
        </button>
        {showSearchInput && (
          <form onSubmit={handleSearchSubmit} className={classes.searchForm}>
            <input
              type="text"
              placeholder="Search for fighters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={classes.searchInput}
            />
          </form>
        )}
      </div>

      <button
        className={classes.mobMenu}
        onClick={() => setShowMenu(!showMenu)}
      >
        ☰
      </button>

      <nav
        className={classes.navMenu}
        style={{ display: showMenu ? "flex" : "none" }}
      >
        <ul>
          <li>
            <Navlink href="/athletes" onClick={handleNavlinkClick}>
              ATHLETES
            </Navlink>
          </li>
          <li>
            <Navlink href="/archive" onClick={handleNavlinkClick}>
              ARCHIVE
            </Navlink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
