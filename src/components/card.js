// src/components/Card.js
import React from 'react';
import { FaGithub } from 'react-icons/fa';

export function Card({ imageSrc, title, description, tags, githubLink, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow gap-2">
        <h3 className="text-lg font-semibold text-pink-600">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {githubLink && (
        <div className="p-4 pt-0 flex justify-end">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black">
            <FaGithub size={24} />
          </a>
        </div>
      )}
    </div>
  );
}
