import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Custom hook to detect scroll position and direction
const useScrollVisibility = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setScrollingUp(true); // Always show when at the top
      } else {
        setScrollingUp(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return scrollingUp;
};

const CustomNavbar = () => {
  const scrollingUp = useScrollVisibility();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 p-4 transition-transform duration-300 ${
          scrollingUp ? "translate-y-0" : "-translate-y-full"
        } ${
          document.documentElement.classList.contains("dark") 
            ? "bg-transparent text-white hover:bg-gray-700" 
            : "bg-transparent text-black hover:bg-gray-200"
        }`}
      >
        <div className="flex items-center">
          <div className="flex-1">
            <img src="/icon.png" alt="Icon" className="w-8 h-8" />
          </div>
          <button
            className="md:hidden text-current focus:outline-none"
            onClick={toggleDrawer}
          >
            ☰
          </button>
          <ul className="hidden md:flex ml-auto space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/research">Research</Link></li>
            <li><Link to="/resume">Resume</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact Me</Link></li>
          </ul>
        </div>
      </nav>

      {/* Drawer for small screens */}
      <div
        className={`fixed inset-0 bg-gray-800 text-white transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4">
          <button
            className="text-white"
            onClick={toggleDrawer}
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li><Link to="/" onClick={toggleDrawer}>Home</Link></li>
          <li><Link to="/research" onClick={toggleDrawer}>Research</Link></li>
          <li><Link to="/resume" onClick={toggleDrawer}>Resume</Link></li>
          <li><Link to="/projects" onClick={toggleDrawer}>Projects</Link></li>
          <li><Link to="/contact" onClick={toggleDrawer}>Contact Me</Link></li>
        </ul>
      </div>
    </>
  );
};

export default CustomNavbar;
