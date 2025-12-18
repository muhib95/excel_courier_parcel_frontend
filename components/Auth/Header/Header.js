"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import LogoutButton from "../SignOut";

const Header = ({ openNav, typeHeader, menu }) => {
  const [navBg, setNavBg] = useState(false);
  useEffect(() => {
    const onScrollListen = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };
    window.addEventListener("scroll", onScrollListen);
    return () => window.removeEventListener("scroll", onScrollListen);
  }, []);

  return (
    <div className="h-16 w-full bg-blue-800 flex items-center px-4 text-white z-[100]">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <button
            className="block sm:hidden md:hidden lg:hidden"
            onClick={openNav}
          >
            <MdMenu />
          </button>
          <div>
            <p>{typeHeader}</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="justify-end items-end space-x-4 hidden xl:flex lg:flex">
            {menu?.map((singleMenu, i) => (
              <ul className="border-b-[1.5px]  border-white" key={i}>
                <li>
                  <Link href={singleMenu?.link}>{singleMenu?.label}</Link>
                </li>
              </ul>
            ))}
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
