import { useRef, useState, useEffect } from 'react';

export default function SpotlightGrid() {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={divRef} className="absolute inset-0 z-[-1] overflow-hidden bg-[#0a0a0a]">
      
      {/* 1. THE TECH BACKGROUND PHOTO */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Tech Matrix" 
          className="w-full h-full object-cover filter grayscale" 
        />
        {/* Gradient Mask to fade photo into dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
      </div>

      {/* 2. THE PREMIUM DOT GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] z-10" />
      
      {/* 3. THE MOUSE SPOTLIGHT */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-20"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.1), transparent 40%)`,
        }}
      />
    </div>
  );
}