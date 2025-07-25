import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

// Check if device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 15, stiffness: 100, mass: 0.2 };
  const circleX = useSpring(0, springConfig);
  const circleY = useSpring(0, springConfig);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      circleX.set(e.clientX);
      circleY.set(e.clientY);
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  // Don't render cursor on mobile devices
  if (isMobile()) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--cursor-dot)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <motion.div
        className="cursor-outline hidden md:block"
        style={{
          position: 'fixed',
          left: circleX,
          top: circleY,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '60px' : '30px',
          height: isHovering ? '60px' : '30px',
          backgroundColor: 'transparent',
          border: `2px solid var(--cursor-outline)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
    </>
  );
}
