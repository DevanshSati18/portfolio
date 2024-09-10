import React from "react";
import { Link } from "react-router-dom";
const CustomNavbar =()=>{
    return(
    <nav className="flex items-center p-4 bg-gray-800 text-white">
      <div className="mr-4">
        <img src="/icon.png" alt="Icon" className="w-8 h-8" />
      </div>
      <ul className="flex space-x-4 ">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/research">Research</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact Me</Link></li>
      </ul>
    </nav>
    )
}
export default CustomNavbar;