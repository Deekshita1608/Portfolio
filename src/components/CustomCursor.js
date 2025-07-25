import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // new state

  const springConfig = { damping: 15, stiffness: 100, mass: 0.2 };
  const circleX = useSpring(0, springConfig);
  const circleY = useSpring(0, springConfig);

  useEffect(() => {
    // Detect if the device is mobile (based on touch support)
    const checkMobile = () => {
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouchDevice);
    };

    checkMobile(); // initial check

    // Cursor logic should not run on mobile
    if (isMobile) return;

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
  }, [isMobile]); // include isMobile as a dependency

  // Hide custom cursor completely on mobile
  if (isMobile) return null;

  return (
    <>
      <motion.div
        className={`cursor-glow ${isHovering ? 'hovered' : ''}`}
        style={{
          left: circleX,
          top: circleY,
        }}
      />
      <div
        className={`cursor-dot ${isHovering ? 'hovered' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
