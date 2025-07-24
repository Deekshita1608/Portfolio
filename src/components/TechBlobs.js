import React, { useState, useEffect, useRef } from 'react';

const techLogos = [
  { name: 'Python', src: '/images/python.png' },
  { name: 'Java', src: '/images/java.png' },
  { name: 'Tensorflow', src: '/images/tensorflow.png' },
  { name: 'PyTorch', src: '/images/pytorch.png' },
  { name: 'Kafka', src: '/images/kafka.png' },
  { name: 'MySQL', src: '/images/mysql.png' },
  { name: 'C++', src: '/images/cpp.png' },
  { name: 'Blender', src: '/images/blender.png' },
  { name: 'CSS', src: '/images/css.png' },
  { name: 'HTML', src: '/images/html.png' },
  { name: 'Spring', src: '/images/spring.png' },
];

const Blob = React.memo(({ blob }) => (
  <div
    id={`blob-${blob.id}`}
    className="tech-blob absolute rounded-full flex items-center justify-center shadow-lg"
    style={{
      width: blob.size,
      height: blob.size,
      transform: `translate(${blob.x}px, ${blob.y}px)`,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
    }}
  >
    <img
      src={blob.logo.src}
      alt={blob.logo.name}
      className="object-contain"
      style={{ width: '60px', height: '60px' }}
    />
  </div>
));

export const TechBlobs = () => {
  const containerRef = useRef(null);
  const [blobs, setBlobs] = useState([]);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const animationFrameId = useRef(null);

  const initializeBlobs = () => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    setBlobs(techLogos.map((logo, index) => ({
      id: index,
      logo,
      size: Math.random() * 40 + 80,
      x: Math.random() * (width - 120),
      y: Math.random() * (height - 120),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    })));
  };

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };

    const debouncedInitialize = debounce(initializeBlobs, 250);

    initializeBlobs();

    window.addEventListener('resize', debouncedInitialize);
    return () => window.removeEventListener('resize', debouncedInitialize);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsAnimationActive(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (blobs.length === 0 || !isAnimationActive) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const glowBuffer = 15; // Px buffer for the shadow 'glow'

      setBlobs(prevBlobs => {
        const newBlobs = JSON.parse(JSON.stringify(prevBlobs));

        newBlobs.forEach(blob => {
          blob.x += blob.vx;
          blob.y += blob.vy;

          // Wall collision
          if (blob.x - glowBuffer <= 0 || blob.x + blob.size + glowBuffer >= width) {
            blob.vx *= -1;
            blob.x = Math.max(glowBuffer, Math.min(blob.x, width - blob.size - glowBuffer));
          }
          if (blob.y - glowBuffer <= 0 || blob.y + blob.size + glowBuffer >= height) {
            blob.vy *= -1;
            blob.y = Math.max(glowBuffer, Math.min(blob.y, height - blob.size - glowBuffer));
          }
        });

        for (let i = 0; i < newBlobs.length; i++) {
          for (let j = i + 1; j < newBlobs.length; j++) {
            const blob = newBlobs[i];
            const other = newBlobs[j];

            const dx = other.x - blob.x;
            const dy = other.y - blob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (blob.size + other.size) / 2;

            if (distance < minDistance) {
              const angle = Math.atan2(dy, dx);
              const overlap = minDistance - distance;

              blob.x -= (overlap / 2) * Math.cos(angle);
              blob.y -= (overlap / 2) * Math.sin(angle);
              other.x += (overlap / 2) * Math.cos(angle);
              other.y += (overlap / 2) * Math.sin(angle);

              const tempVx = blob.vx;
              const tempVy = blob.vy;
              blob.vx = other.vx;
              blob.vy = other.vy;
              other.vx = tempVx;
              other.vy = tempVy;
            }
          }
        }

        return newBlobs;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [blobs.length]);

  return (
    <div ref={containerRef} className="blob-field relative w-full h-[600px]">
      {blobs.map(blob => (
        <Blob key={blob.id} blob={blob} />
      ))}
    </div>
  );
};
