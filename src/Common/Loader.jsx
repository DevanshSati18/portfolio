import React from 'react';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
}

export default Loader;
