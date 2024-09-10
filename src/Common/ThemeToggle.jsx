import React from 'react';

function ThemeToggle({ setTheme, currentTheme }) {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
        className="p-2 bg-gray-800 text-white rounded-full"
      >
        {currentTheme === 'light' ? '🌙' : '🌞'}
      </button>
    </div>
  );
}

export default ThemeToggle;
