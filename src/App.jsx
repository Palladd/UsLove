import { useState } from "react";
import "./styles/app.css";
import ConfettiButton from "./components/ConfettiButton";
import RunningButton from "./components/RunningButton";
import DelayedText from "./components/DelayedText";
import { motion, AnimatePresence } from "framer-motion"; // Zmiana 1: Import AnimatePresence

export function App() {
  const [slide, setSlide] = useState(0);

  // Change status of slide to the next one
  const nextSlide = () => {
    setSlide((prev) => prev + 1);
  };

  // Change status of slide to the previous one
  const previousSlide = () => {
    setSlide((prev) => prev - 1);
  };

  return (
    <main className="mainForBg flex items-center justify-center h-screen p-28 overflow-hidden">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-4xl border-[6px] border-pink-200 bg-pink-100 p-8 shadow-[10px_10px_0px_0px_#ec4899]">
        {/* Zmiana 2: Opakowanie slajdów w AnimatePresence z mode="wait" */}
        <AnimatePresence mode="wait">
          {slide === 0 && (
            <motion.div
              key="slide-0" // Zmiana 3: Unikalny klucz
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Zmiana 4: Efekt fade out przy znikaniu
              transition={{ duration: 0.5 }}
              // Zmiana 5: Dodanie 'absolute inset-0', żeby slajdy idealnie na siebie nachodziły w kontenerze
              className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
            >
              <h1 className="text-center text-5xl font-extrabold text-pink-700">
                Karolino 🐙
              </h1>

              <button
                className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer"
                onClick={nextSlide}
              >
                <span className="relative z-10" id="slide-0-button">
                  Tak Przemek?
                </span>
                <span className="stripe-overlay" aria-hidden="true" />
              </button>
            </motion.div>
          )}

          {slide === 1 && (
            <motion.div
              key="slide-1" // Zmiana 6: Drugi slajd też musi być motion.div z kluczem
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Ten slajd też ładnie zniknie, jeśli wciśniesz "Wróć"
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
            >
              <h1 className="text-center text-5xl font-extrabold text-pink-700">
                Czy pójdziesz ze mną na randkę? 🥺
              </h1>

              <div className="flex items-center justify-center gap-6">
                <RunningButton>nie.</RunningButton>
                
                <button className="cursor-pointer" onClick={nextSlide}>
                  <ConfettiButton />
                </button>
              </div>

              <button
                className="text-sm font-bold text-pink-500 underline underline-offset-4 hover:text-pink-800 transition-colors cursor-pointer"
                onClick={previousSlide}
              >
                Wróć
              </button>
            </motion.div>
          )}
          {slide === 2 && (
            <motion.div
              key="slide-2" // Zmiana 6: Trzeci slajd też musi być motion.div z kluczem
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Ten slajd też ładnie zniknie, jeśli wciśniesz "Wróć"
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
            >
              <h1 className="text-center text-5xl font-extrabold text-pink-700">
                A więc wybierz datę która Ci odpowiada
              </h1>

              <section>

                
              </section>

              <button
                className="text-sm font-bold text-pink-500 underline underline-offset-4 hover:text-pink-800 transition-colors cursor-pointer"
                onClick={previousSlide}
              >
                Wróć
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
