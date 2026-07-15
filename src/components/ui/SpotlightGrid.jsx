import { useRef, useState, useEffect } from "react";

export default function SpotlightGrid() {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className="absolute inset-0 z-[-1] overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.08), transparent 40%)`,
        }}
      />
    </div>
  );
}
