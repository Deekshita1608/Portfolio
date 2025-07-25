// components/Loader.jsx
import React from 'react';
import './Loader.css'; // keep for custom animation timing if needed

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-end)] flex items-center justify-center z-50">
      <div className="relative w-24 h-24">
        {/* Glow/blur trail behind arc */}
        <div className="absolute inset-0 animate-spin-slow rounded-full">
          <div className="w-full h-full transform rotate-45">
            <div className="w-6 h-6 rounded-full blur-lg bg-gradient-to-br from-teal-400 via-purple-500 to-fuchsia-500"></div>
          </div>
        </div>

        {/* Gradient Arc Spinner */}
        <svg
          className="w-full h-full animate-spin"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <path
            d="M50,10 a40,40 0 1,1 -0.01,0"
            stroke="url(#arcGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
