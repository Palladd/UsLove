import { motion } from "framer-motion";
import { useState } from "react";

function DelayedText() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 p-12">
      {/* 1. Przycisk, który zmienia stan (z false na true i odwrotnie) */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="px-8 py-4 font-extrabold text-pink-700 bg-white border-4 border-pink-400 rounded-2xl shadow-[4px_4px_0px_0px_#ec4899] active:translate-y-1 transition-all cursor-pointer"
      >
        Uruchom animację ✨
      </button>

      {/* 2. Element, który reaguje na zmianę stanu */}
      <motion.div
        animate={{
          y: isActive ? -50 : 0, // Podskakuje do góry
          rotate: isActive ? 180 : 0, // Obraca się do góry nogami
          scale: isActive ? 1.2 : 1, // Powiększa się
          backgroundColor: isActive ? "#fbcfe8" : "#fce7f3", // Zmienia odcień różu
        }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className="w-32 h-32 border-4 border-pink-500 rounded-3xl shadow-[6px_6px_0px_0px_#db2777]"
      />
    </div>
  );
}

export default DelayedText;
