import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import logo from "./assets/logo.png"; // imported but not used

const UnderConstruction = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-blue-950 to-purple-950 text-white text-center p-6">
    {/* Message */}
    <motion.h1
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-bold mb-4"
    >
      Website Under Construction
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-lg text-gray-300 max-w-xl mb-6"
    >
      I'm currently working on building something awesome! In the meantime, feel free to connect with me below.
    </motion.p>

    {/* Social Icons */}
    <motion.div
      className="flex space-x-6 text-white text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <a href="mailto:devanshjsati@gmail.com" aria-label="Email" className="hover:text-orange-400 transition">
        <FaEnvelope />
      </a>
      <a href="https://www.linkedin.com/in/devansh-sati/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-orange-400 transition">
        <FaLinkedin />
      </a>
      <a href="https://github.com/DevanshSati18" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-orange-400 transition">
        <FaGithub />
      </a>
      <a href="https://devanshsati.com" target="_blank" rel="noreferrer" aria-label="Website" className="hover:text-orange-400 transition">
        <FaGlobe />
      </a>
    </motion.div>
  </div>
);

// App Component
const App = () => {
  const isUnderConstruction = true;

  if (isUnderConstruction) return <UnderConstruction />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-950 font-sans">
      {/* Full content goes here when site is live */}
    </div>
  );
};

export default App;
