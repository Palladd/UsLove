import { useState } from "react";

import { ConfettiButton } from "./components/ConfettiButton";
import { RunningButton } from "./components/RunningButton";

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

export function Welcome() {
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

  return <>
  <p>Welcome to the quiz!</p>
  </>;
}
