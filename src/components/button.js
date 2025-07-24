// Button.js
import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`px-5 py-2 rounded-2xl bg-pink-300 text-white hover:bg-pink-400 transition-all duration-200 shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
