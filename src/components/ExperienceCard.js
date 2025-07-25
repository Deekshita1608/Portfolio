import React from 'react';

export const ExperienceCard = ({ imageSrc, title, description, tags }) => {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-48 md:w-48 md:h-48 object-cover" 
      />
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-pink-600">{title}</h3>
        <p className="text-[var(--text-secondary)] text-base">{description}</p>
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
