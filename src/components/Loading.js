import React from 'react';

function Loading() {
  return (
    <div className="fixed inset-0 bg-[var(--bg-gradient-start)] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--cursor-dot)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--text-primary)] text-xl font-medium">Loading Portfolio...</p>
      </div>
    </div>
  );
}

export default Loading;
