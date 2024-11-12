import React from 'react';
import backgroundImage from '../../Assets/Home/bg1.jpeg'; // Import your background image
import topImage from '../../Assets/Home/profileimage.jpeg'; // Import the round image

const LeftHomePage = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen p-10"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
      }}
    >
      <div className="w-full h-full flex justify-center items-start p-10">
        <div className="bg-white bg-opacity-80 rounded-xl p-10 w-4/5 text-center">
          {/* Round image on top */}
          <div className="mt-8 mb-6 px-5">
            <img
              src={topImage} // Round image source
              alt="Round Image"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>

          {/* Your content goes here */}
          <div>
            <p>Left Side</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftHomePage;
