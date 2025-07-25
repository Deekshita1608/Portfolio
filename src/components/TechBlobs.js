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
      willChange: 'transform',
    }}
  >
    <img
      loading="lazy"
      src={blob.logo.src}
      alt={blob.logo.name}
      className="object-contain w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
    />
  </div>
));

export const TechBlobs = () => {
  const containerRef = useRef(null);
  const [blobs, setBlobs] = useState([]);
  const animationFrameId = useRef(null);

  const initializeBlobs = () => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const maxAttempts = 100;
    const minBuffer = 20;

    const newBlobs = [];

    techLogos.forEach((logo, index) => {
      const size = (Math.random() * 40 + 80) * (isMobile ? 0.8 : 1);
      let x, y, attempts = 0;
      let overlapping = false;

      do {
        overlapping = false;
        x = Math.random() * (width - size);
        y = Math.random() * (height - size);

        for (const other of newBlobs) {
          const dx = x - other.x;
          const dy = y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (size + other.size) / 2;

          if (distance < minDistance + minBuffer) {
            overlapping = true;
            break;
          }
        }

        attempts++;
      } while (overlapping && attempts < maxAttempts);

      newBlobs.push({
        id: index,
        logo,
        size,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    });

    setBlobs(newBlobs);
  };

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const debouncedInitialize = debounce(initializeBlobs, 250);
    initializeBlobs();

    window.addEventListener('resize', debouncedInitialize);
    return () => window.removeEventListener('resize', debouncedInitialize);
  }, []);

  useEffect(() => {
    if (blobs.length === 0) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const glowBuffer = 15;

      setBlobs(prevBlobs => {
        const newBlobs = prevBlobs.map(blob => ({ ...blob }));

        newBlobs.forEach(blob => {
          blob.x += blob.vx;
          blob.y += blob.vy;

          if (blob.x - glowBuffer <= 0 || blob.x + blob.size + glowBuffer >= width) {
            blob.vx *= -1;
            blob.x = Math.max(glowBuffer, Math.min(blob.x, width - blob.size - glowBuffer));
          }
          if (blob.y - glowBuffer <= 0 || blob.y + blob.size + glowBuffer >= height) {
            blob.vy *= -1;
            blob.y = Math.max(glowBuffer, Math.min(blob.y, height - blob.size - glowBuffer));
          }
        });

        // Collision handling
        for (let i = 0; i < newBlobs.length; i++) {
          for (let j = i + 1; j < newBlobs.length; j++) {
            const blobA = newBlobs[i];
            const blobB = newBlobs[j];

            const dx = blobB.x - blobA.x;
            const dy = blobB.y - blobA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (blobA.size + blobB.size) / 2;

            if (distance < minDistance) {
              const angle = Math.atan2(dy, dx);
              const overlap = minDistance - distance;

              blobA.x -= (overlap / 2) * Math.cos(angle);
              blobA.y -= (overlap / 2) * Math.sin(angle);
              blobB.x += (overlap / 2) * Math.cos(angle);
              blobB.y += (overlap / 2) * Math.sin(angle);

              const tempVx = blobA.vx;
              const tempVy = blobA.vy;
              blobA.vx = blobB.vx;
              blobA.vy = blobB.vy;
              blobB.vx = tempVx;
              blobB.vy = tempVy;
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
