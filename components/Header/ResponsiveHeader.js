"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import MobileHeader from "./MobileHeader";

const ResponsiveHeader = ({ typeHeader, menu }) => {
  // Derive initial state from media query
  const [showNav, setShowNav] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.matchMedia("(min-width: 1024px)").matches; // false on large, true on small
    }
    return false; // default for SSR
  });

  const handleNavOpen = () => setShowNav(true);
  const handleNavClose = () => setShowNav(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = (e) => {
      setShowNav(!e.matches); // false if large, true if small
    };

    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div>
      <Header openNav={handleNavOpen} typeHeader={typeHeader} menu={menu} />
      <MobileHeader
        showNav={showNav}
        closeNav={handleNavClose}
        navLinks={menu}
      />
    </div>
  );
};

export default ResponsiveHeader;
