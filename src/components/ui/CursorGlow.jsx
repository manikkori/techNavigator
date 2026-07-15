import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  // Spring physics for buttery smooth lag effect
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Center the 500px blob on the cursor
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: mouseX, y: mouseY }}
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] bg-primary/20 dark:bg-accent/20 rounded-full mix-blend-multiply filter blur-[120px] z-[-1]"
    />
  );
}
