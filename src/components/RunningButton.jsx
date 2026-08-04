import React, { useState } from "react";

function RunningButton({
  children = "Nie 😢",
  range = 60,
  className = "",
  style,
  onMouseEnter,
  onTouchStart,
  ...props
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleEscape = (e) => {
    // Generowanie nowej losowej pozycji
    const randomX = (Math.random() - 0.5) * range * 8;
    const randomY = (Math.random() - 0.5) * range * 8;

    setPosition({ x: randomX, y: randomY });
  };

  return (
    <button
      {...props}
      onMouseEnter={(e) => {
        handleEscape(e);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onTouchStart={(e) => {
        handleEscape(e);
        if (onTouchStart) onTouchStart(e);
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.15s ease-out",
        ...style,
      }}
      className={`overflow-hidden px-8 py-4 rounded-2xl border-4 border-rose-300 bg-rose-100 text-rose-700 shadow-[6px_6px_0px_0px_#e11d48] text-lg font-extrabold transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default RunningButton;
