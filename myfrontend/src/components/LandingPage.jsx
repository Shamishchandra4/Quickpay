// components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div
      className="relative min-h-screen bg-cover"
      style={{
        backgroundImage: "url('https://www.colorhexa.com/111827.png')",
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-[50px] drop-shadow-lg">
          <span className="a">Q</span>
          <span className="a">u</span>
          <span className="a">i</span>
          <span className="a">c</span>
          <span className="b">k</span>
          <span className="b">P</span>
          <span className="b">a</span>
          <span className="b">y</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors duration-300"
            onClick={handleLoginClick}
          >
            Log In
          </button>
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors duration-300"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        </div>
        <div className="text-white font-semibold text-xl md:text-2xl mb-8 px-4 md:px-0">
          Secure & Easy Payments
        </div>
        <button
          className="bg-yellow-400 text-black py-2 px-6 rounded-md text-xl font-semibold shadow-lg hover:bg-yellow-300 transition-colors duration-300"
          onClick={handleSignupClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
