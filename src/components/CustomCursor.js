import React, { useState, useEffect } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

  useEffect(() => {
    const dotAnimation = requestAnimationFrame(() => {
      setDotPosition(prevDotPosition => {
        const dx = position.x - prevDotPosition.x;
        const dy = position.y - prevDotPosition.y;
        return {
          x: prevDotPosition.x + dx * 0.9,
          y: prevDotPosition.y + dy * 0.9,
        };
      });
    });

    return () => {
      cancelAnimationFrame(dotAnimation);
    };
  }, [position]);

  return (
    <>
      <div className={`cursor-glow ${isHovering ? 'hovered' : ''}`} style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      <div className={`cursor-dot ${isHovering ? 'hovered' : ''}`} style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }} />
    </>
  );
}
