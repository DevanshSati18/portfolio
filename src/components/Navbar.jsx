import React from "react";
import logo from "../assets/logo_pis.png";
import guruji from "../assets/guruji.jpg";

const Navbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-orange-400 px-4 py-6 sm:py-4 shadow-md">
      {/* Left - Logo */}
      <div className="flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={logo}
          alt="logo"
          className="h-[100px] sm:h-[120px] w-auto"
        />
      </div>

      {/* Center - Text Section */}
      <div className="text-center max-w-[90%] sm:max-w-[60%] px-2">
        <h1 className="text-[#D00] text-[22px] sm:text-[28px] md:text-[30px] font-['Inknut_Antiqua'] font-bold leading-snug">
          PRAVANANDA INTERNATIONAL SCHOOL
        </h1>
        <h3 className="text-[#151EED] text-[16px] sm:text-[20px] font-['Inknut_Antiqua'] leading-snug mt-1">
          (An Educational Unit of Bharat Sevasharam Sangha)
        </h3>
        <h2 className="text-[#B30000] text-[24px] sm:text-[32px] font-['Imperial_Script'] italic mt-2">
          School with a difference
        </h2>
      </div>

      {/* Right - Guruji Image */}
      <div className="flex-shrink-0 mt-4 sm:mt-0">
        <img
          src={guruji}
          alt="guruji"
          className="h-[120px] sm:h-[150px] w-[100px] sm:w-[120px] object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>
    </div>
  );
};

export default Navbar;
