import Link from 'next/link';
import React from 'react';
import { CgClose } from "react-icons/cg";

const MobileHeader = ({ showNav, closeNav, navLinks }) => {
 
    const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <div
      className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1002] bg-black opacity-70 w-full h-screen `}
    >
      <div
        className={`text-white fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-blue-800 space-y-6 z-[1050]`}
      >
        {navLinks?.map((link,i) => {
          return (
            <Link key={i} href={link?.link} className="">
              <p className="text-white w-fit text-xl ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
                {link?.label}
              </p>
            </Link>
          );
        })}
        <CgClose onClick={closeNav} className="absolute right-[1.4rem] top-[0.7rem] cursor-pointer sm:w-8 sm:h-8 w-6 h-6"></CgClose>
      </div>
    </div>
    );
};

export default MobileHeader;