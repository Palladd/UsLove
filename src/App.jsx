import { useState } from "react";
import "./styles/app.css";
import ConfettiButton from "./components/ConfettiButton";
import RunningButton from "./components/RunningButton";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "./components/ui/calendar";
import ComboboxWithCheckbox from "./components/ComboboxMultiSel";

export function App() {
  const [slide, setSlide] = useState(0);

  // All data for submit form
  const [selectedDate, setSelectedDate] = useState(null);

  // Change status of slides
  const nextSlide = () => {
    setSlide((prev) => prev + 1);
  };

  const previousSlide = () => {
    setSlide((prev) => prev - 1);
  };

  return (
    <main className="mainForBg flex items-center justify-center h-screen p-20 overflow-hidden">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-4xl border-[6px] border-pink-200 bg-pink-100 p-8 shadow-[10px_10px_0px_0px_#ec4899]">
        {/* Zmiana 2: Opakowanie slajdów w AnimatePresence z mode="wait" oraz exit dla fadeOut'ów */}
        <AnimatePresence mode="wait">
          {slide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} //
              transition={{ duration: 0.5 }}
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
              key="slide-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              key="slide-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
            >
              <h1 className="text-center text-5xl font-extrabold text-pink-700">
                A więc wybierz datę która Ci odpowiada
              </h1>
              <motion.p
                className="text-center text-lg font-bold text-pink-700"
                key={selectedDate ? selectedDate.toString() : "empty"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedDate
                  ? `A więc ta?: ${selectedDate.toLocaleDateString()}`
                  : " hmmmmm..."}
              </motion.p>
              <section>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              </section>

              <button
                className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer"
                onClick={nextSlide}
              >
                Dalej
              </button>
              <button
                className="text-sm font-bold text-pink-500 underline underline-offset-4 hover:text-pink-800 transition-colors cursor-pointer"
                onClick={previousSlide}
              >
                Wróć
              </button>
            </motion.div>
          )}
          {slide === 3 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
            >
              <ComboboxWithCheckbox />
              <button
                className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer"
                onClick={nextSlide}
              >
                Dalej
              </button>
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
