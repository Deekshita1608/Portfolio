import React from 'react';

export function InternshipCard({ imageSrc, title, description, tags }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex items-center w-full max-w-5xl mx-auto">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-48 h-48 object-cover" 
      />
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-pink-600">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
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
    </div>
  );
}
