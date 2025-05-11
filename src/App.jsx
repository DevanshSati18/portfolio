import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "./assets/logo.png"; // Assume a logo image is placed in src/assets

const Header = () => (
  <header className="bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white p-8 relative overflow-hidden shadow-lg">
    <div className="absolute inset-0 opacity-10">
      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
    </div>
    <div className="relative z-10 flex flex-col items-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl font-extrabold mb-2">
        Devansh Sati
      </motion.h1>
      <motion.div className="flex space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <a href="mailto:devanshjsati@gmail.com"><FaEnvelope size={24} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin size={24} /></a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={24} /></a>
        <a href="https://devanshsati.com" target="_blank" rel="noreferrer"><FaGlobe size={24} /></a>
      </motion.div>
    </div>
  </header>
);

const Section = ({ title, children }) => (
  <section className="bg-black text-white p-8 border-b border-gray-800">
    <motion.h2 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-semibold text-purple-300 mb-4">
      {title}
    </motion.h2>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-300">
      {children}
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="bg-gradient-to-r from-black via-purple-900 to-blue-900 text-white text-center p-4">
    <p>&copy; {new Date().getFullYear()} Devansh Sati | Portfolio</p>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-950 font-sans">
      <Header />
      <main className="space-y-10">
        <Section title="About Me">
          <p>
            I am a passionate developer and researcher currently pursuing a Bachelor's degree in Computer Science. My interests span from web development and DevOps to cybersecurity and automation. With hands-on experience across multiple domains, I strive to build efficient and impactful solutions.
          </p>
        </Section>

        <Section title="Education">
          <ul className="list-disc list-inside space-y-1">
            <li>BTKIT, Uttarakhand Technical University – B.Sc. Computer Science (2021–2025)</li>
            <li>Bal Bharati Public School, Manesar – Class 12 (87.2%)</li>
            <li>The Mann School, Delhi – Class 10 (74.4%)</li>
          </ul>
        </Section>

        <Section title="Experience">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Web Developer</strong> at Esipl Company (Sep 2024 – Present)</li>
            <li><strong>Cybersecurity & DevOps Intern</strong> at Honda Motorcycles India Ltd (2023–2024)</li>
            <li><strong>ITDCOP Intern</strong> at Maruti Suzuki India Ltd (2023)</li>
            <li><strong>CRM-IT Intern</strong> at Extramarks Ltd (2022)</li>
          </ul>
        </Section>

        <Section title="Projects">
          <ul className="list-disc list-inside space-y-1">
            <li>Raj Bhawan Inventory System – Flutter, Firebase, QR Code</li>
            <li>Library Management System – Firebase, HTML, CSS, JS</li>
            <li>DevOps VAPT Automation – DevOps Tools & Security Scripts</li>
          </ul>
        </Section>

        <Section title="Skill Set">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Python</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Java</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">C/C++</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">HTML/CSS/JS</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">React.js</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Flutter</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Firebase</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Docker</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Kubernetes</div>
            <div className="bg-purple-800 bg-opacity-20 p-4 rounded-lg shadow hover:shadow-lg transition">Shell Scripting</div>
          </div>
        </Section>

        <Section title="Leadership & Activities">
          <ul className="list-disc list-inside space-y-1">
            <li>Mock Parliament Session Participant – Parliament of India</li>
            <li>Inter-House Freestyle Swimming – Bronze Medal</li>
            <li>Volunteer at Yogoda Satsanga Medical Camp</li>
            <li>Student Coordinator at Institute’s Innovation Council</li>
            <li>Deputy Head Boy – School Leadership Role</li>
          </ul>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
