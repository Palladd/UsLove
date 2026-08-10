import { useEffect, useState } from "react";
import "./styles/app.css";
import ConfettiButton from "./components/ConfettiButton";
import RunningButton from "./components/RunningButton";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Calendar } from "./components/ui/calendar";
import ComboboxCategory from "./components/ComboboxCategory";

// Dodaj/Popraw ten import, aby wyciągnąć wszystkie sub-komponenty karty
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";

export function App() {
  const [slide, setSlide] = useState(0);
  const lastSlide = 4;

  // Submisson:
  const handleSubmit = async () => {
    const payload = {
      date: selectedDate ? selectedDate.toISOString() : null,
      categories: selectedCategory,
    };

    try {
      const response = await fetch("http://localhost:5001/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Wysłano! 🐙");
      } else {
        alert("Coś poszło nie tak, spróbuj ponownie.");
      }
    } catch (error) {
      console.error(error);
      alert("Nie udało się połączyć z serwerem.");
    }
  };

  // All data for submit form
  const [selectedDate, setSelectedDate] = useState(false);
  const [hasAnimatedDate, setHasAnimatedDate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);

  // Change status of slides
  const nextSlide = () => {
    setSlide((prev) => Math.min(prev + 1, lastSlide));
  };

  const previousSlide = () => {
    setSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const shouldAnimateSelectedDate = Boolean(selectedDate && !hasAnimatedDate);

  // Animation data
  const sharedSlideAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  };

  const sharedSlideClassName =
    "absolute inset-0 flex flex-col items-center justify-center gap-4 z-10";

  return (
    <main className="mainForBg flex items-center justify-center h-screen p-20 overflow-hidden">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-4xl border-[6px] border-pink-200 bg-pink-100 p-8 shadow-[10px_10px_0px_0px_#ec4899]">
        <AnimatePresence mode="wait">
          {slide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 2, delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
              {...sharedSlideAnimation}
              className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
            >
              <h1 className="text-center text-5xl font-extrabold text-pink-700">
                Czy pójdziesz ze mną na randkę? 🥺
              </h1>

              <div className="flex items-center justify-center gap-6">
                <RunningButton>nie.</RunningButton>

                <ConfettiButton onClick={nextSlide} />
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
              {...sharedSlideAnimation}
              className={sharedSlideClassName}
            >
              <motion.h1
                className="text-center text-5xl font-extrabold text-pink-700"
                key={selectedDate ? "selected-date" : "empty"}
                initial={shouldAnimateSelectedDate ? { opacity: 0 } : false}
                animate={shouldAnimateSelectedDate ? { opacity: 1 } : undefined}
                transition={
                  shouldAnimateSelectedDate ? { duration: 0.5 } : undefined
                }
                onAnimationComplete={() => {
                  if (shouldAnimateSelectedDate) {
                    setHasAnimatedDate(true);
                  }
                }}
              >
                {selectedDate
                  ? `A więc ${selectedDate.toLocaleDateString()} o godzinie ${selectedDate.toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" },
                    )}`
                  : " Wybierz datę, która Ci odpowiada"}
              </motion.h1>
              <section>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                />
              </section>

              <div className="flex justify-between items-center gap-4">
                <button
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-rose-300 bg-rose-100 text-rose-700 shadow-[6px_6px_0px_0px_#e11d48] text-lg font-extrabold hover:bg-rose-200 active:translate-y-1 transition-all cursor-pointer"
                  onClick={previousSlide}
                >
                  Wróć
                </button>
                <button
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer"
                  onClick={nextSlide}
                >
                  Dalej
                </button>
              </div>
            </motion.div>
          )}
          {slide === 3 && (
            <motion.div
              key="slide-3"
              {...sharedSlideAnimation}
              className={sharedSlideClassName}
            >
              <h1 className="text-center text-5xl font-extrabold text-pink-700">
                Co najbardziej chcesz robić?
              </h1>
              <h4 className="text-center text-lg font-semibold text-pink-700">
                Wybierz to, co Cię najbardziej interesuje
              </h4>

              <div className="flex justify-between items-center gap-4">
                <ComboboxCategory
                  selectedValue={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <button
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-rose-300 bg-rose-100 text-rose-700 shadow-[6px_6px_0px_0px_#e11d48] text-lg font-extrabold hover:bg-rose-200 active:translate-y-1 transition-all cursor-pointer"
                  onClick={previousSlide}
                >
                  Wróć
                </button>
                <button
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer"
                  onClick={nextSlide}
                >
                  Dalej
                </button>
              </div>
            </motion.div>
          )}
          {slide === 4 && (
            <motion.div
              key="slide-4"
              {...sharedSlideAnimation}
              className={sharedSlideClassName}
            >
              <motion.h1
                className="text-center text-4xl sm:text-5xl font-extrabold text-pink-700 mb-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1, delay: 0.2 },
                }}
              >
                Podsumowując...
              </motion.h1>

              {/* Karta Podsumowująca z animacją wjazdu od dołu */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full max-w-lg z-20 px-4"
              >
                <Card className="w-full max-h-[50vh] flex flex-col overflow-hidden border-4 border-pink-400 bg-pink-50 rounded-2xl shadow-[8px_8px_0px_0px_#d62d81] text-left">
                  <CardHeader className="border-b-4 border-pink-200 pb-5 shrink-0">
                    <CardTitle className="text-2xl sm:text-3xl font-extrabold text-pink-700">
                      Bilet na Randkę 🎟️
                    </CardTitle>
                    <CardDescription className="text-pink-500 font-bold text-sm sm:text-base mt-2">
                      Wszystko zostało oficjalnie zapisane!
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-6  text-base sm:text-lg flex-1 min-h-0 overflow-y-auto">
                    {/* Sekcja: Zgoda */}
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-pink-400 mb-1">
                        Zgoda
                      </span>
                      <span className="font-bold text-pink-800">
                        ✅ Tak (innej opcji nie było...)
                      </span>
                    </div>

                    {/* Sekcja: Data i Godzina */}
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-pink-400 mb-1">
                        Kiedy?
                      </span>
                      <span className="font-bold text-pink-800">
                        {selectedDate
                          ? `📅 ${selectedDate.toLocaleDateString()} ⏰ ${selectedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                          : "📅 Musimy to jeszcze dogadać!"}
                      </span>
                    </div>

                    {/* Sekcja: Aktywności */}
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-pink-400 mb-1">
                        Co będziemy robić?
                      </span>
                      <div className="font-medium text-pink-800">
                        {!selectedCategory ||
                        Object.keys(selectedCategory).length === 0 ? (
                          <span className="font-bold italic text-pink-600">
                            Zdaję się na Ciebie! 🎀
                          </span>
                        ) : (
                          Object.entries(selectedCategory).map(
                            ([mainCat, subCats]) => (
                              <div key={mainCat} className="mb-3 last:mb-0">
                                <span className="font-bold text-pink-700">
                                  {mainCat}
                                </span>
                                {subCats && subCats.length > 0 ? (
                                  <span className="block text-sm text-pink-600 pl-3 border-l-4 border-pink-300 ml-1 mt-1 font-semibold">
                                    {subCats.join(", ")}
                                  </span>
                                ) : (
                                  <span className="block text-sm text-pink-500/70 pl-3 border-l-4 border-pink-200 ml-1 mt-1 italic font-medium">
                                    Cokolwiek z tej kategorii
                                  </span>
                                )}
                              </div>
                            ),
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="flex justify-between items-center w-full max-w-lg px-4 gap-4 mt-2">
                <button
                  className="group relative overflow-hidden px-6 py-4 rounded-2xl border-4 border-rose-300 bg-rose-100 text-rose-700 shadow-[6px_6px_0px_0px_#e11d48] text-base sm:text-lg font-extrabold hover:bg-rose-200 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-pointer"
                  onClick={previousSlide}
                >
                  Wróć i zmień
                </button>
                <button
                  className="group relative overflow-hidden px-6 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-base sm:text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-pointer"
                  onClick={handleSubmit}
                  id="submit-button"
                >
                  Zatwierdź 💖
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
