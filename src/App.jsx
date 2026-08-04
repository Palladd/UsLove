import { useState } from "react";

import ConfettiButton from "./components/ConfettiButton";
import RunningButton from "./components/RunningButton";

const QUESTIONS = [
  {
    id: 1,
    title: "Co chciałabyś zjeść?",
    emoji: "🍕",
    options: [
      "Włoska pizza & pasta",
      "Sushi",
      "Burger & frytki",
      "Lody i coś słodkiego",
    ],
  },
  {
    id: 2,
    title: "Jaki klimat spotkania wolisz?",
    emoji: "🎬",
    options: [
      "Kino + spacer",
      "Piknik w parku",
      "Kameralna kolacja",
      "Gry planszowe & luźny klimat",
    ],
  },
  {
    id: 3,
    title: "Kiedy masz czas?",
    emoji: "📅",
    options: [
      "W ten weekend",
      "W przyszłym tygodniu",
      "Napisz do mnie, zgadamy się!",
    ],
  },
];

export function App() {
  const [step, setStep] = useState("WELCOME");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // Stan zapobiegający wielokrotnemu kliknięciu podczas trwania animacji
  const [isStarting, setIsStarting] = useState(false);

  const handleStartQuiz = () => {
    if (isStarting) return;
    setIsStarting(true);

    // Opóźnienie pozwala na wystrzelenie konfetti ZANIM przycisk zniknie z ekranu
    setTimeout(() => {
      setStep("QUIZ");
    }, 600);
  };

  const handleSelectAnswer = (answer) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;

    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep("SUCCESS");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-pink-300 p-12 overflow-hidden">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-4xl border-[6px] border-pink-200 bg-pink-100 p-8 shadow-[10px_10px_0px_0px_#ec4899]">
        {/* --- EKRAN 1: WYBÓR TAK / NIE --- */}
        {step === "WELCOME" && (
          <div className="flex flex-col items-center justify-center gap-8 z-10">
            <h1 className="text-center text-3xl font-extrabold text-pink-700">
              Czy pójdziesz ze mną na randkę? 🥺
            </h1>

            <div className="flex items-center justify-center gap-6">
              <RunningButton>Nie 😜</RunningButton>

              {/* Wrapper gwarantuje przechwycenie akcji bez modyfikowania samego przycisku */}
              <div onClickCapture={handleStartQuiz} className="cursor-pointer">
                <ConfettiButton />
              </div>
            </div>
          </div>
        )}

        {/* --- EKRAN 2: PYTANIA (QUIZ) --- */}
        {step === "QUIZ" && (
          <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-md z-10">
            <span className="font-mono text-sm font-bold text-pink-600 bg-pink-200 px-4 py-1 rounded-full border-2 border-pink-400 shadow-[2px_2px_0px_0px_#ec4899]">
              Pytanie {currentQuestionIndex + 1} z {QUESTIONS.length}
            </span>

            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">
                {QUESTIONS[currentQuestionIndex].emoji}
              </span>
              <h2 className="text-2xl font-extrabold text-pink-800">
                {QUESTIONS[currentQuestionIndex].title}
              </h2>
            </div>

            <div className="flex flex-col gap-3 w-full mt-2">
              {QUESTIONS[currentQuestionIndex].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectAnswer(option)}
                  className="w-full px-6 py-3 font-bold text-pink-900 bg-white border-4 border-pink-300 rounded-2xl shadow-[4px_4px_0px_0px_#ec4899] hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer text-left flex items-center justify-between"
                >
                  <span>{option}</span>
                  <span className="text-pink-400">➔</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- EKRAN 3: PODSUMOWANIE --- */}
        {step === "SUCCESS" && (
          <div className="flex flex-col items-center justify-center gap-6 text-center z-10">
            <span className="text-6xl animate-bounce">🎉</span>
            <h2 className="text-3xl font-extrabold text-pink-700">
              Super! Jesteśmy umówieni! 💖
            </h2>
            <p className="text-pink-800 font-semibold text-lg max-w-sm">
              Oto Twój idealny plan na spotkanie:
            </p>

            <div className="w-full bg-white border-4 border-pink-300 rounded-2xl p-4 shadow-[4px_4px_0px_0px_#ec4899] text-left flex flex-col gap-2">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="text-sm">
                  <span className="font-bold text-pink-600">
                    {q.emoji} {q.title}:{" "}
                  </span>
                  <span className="font-extrabold text-pink-900">
                    {answers[q.id]}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-pink-600 font-mono mt-2">
              Napisz do mnie, żeby dopiąć szczegóły! ✨
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
