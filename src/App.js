import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './Common/CustomNavbar';
import Home from './Pages/Home/Home'
/* import Research from './Research';
import Resume from './Resume';
import Projects from './Projects';
import Contact from './Contact'; */
import ThemeToggle from './Common/ThemeToggle';
import Loader from './Common/Loader';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    setLoading(false);
  }, [theme]);

  return (
    <Router>
      {loading && <Loader />}
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-background text-dark-text' : 'bg-light-background text-light-text'}`}>
        <CustomNavbar />
        <ThemeToggle setTheme={setTheme} currentTheme={theme} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/research" element={<Research />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
