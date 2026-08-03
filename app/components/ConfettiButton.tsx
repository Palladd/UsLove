import { useRef, type MouseEvent } from "react";

export default function ConfettiButton() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const confettiEmoji = (e: MouseEvent<HTMLButtonElement>) => {
    const emojis = ["🐶", "🐙", "💖", "✨", "🌸"];
    const count = 30;
    const container = containerRef.current;
    if (!container) return;

    const btn = e.currentTarget;
    const {
      left: btnLeft,
      top: btnTop,
      width,
      height,
    } = btn.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } =
      container.getBoundingClientRect();
    const originX = btnLeft + width / 2 - containerLeft;
    const originY = btnTop + height / 2 - containerTop;

    const pickRandom = <T,>(items: T[]) =>
      items[Math.floor(Math.random() * items.length)];
    const randomBetween = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    Array.from({ length: count }, () => {
      const span = document.createElement("span");
      const emoji = pickRandom(emojis);
      const fontSize = Math.floor(randomBetween(18, 36));
      const x = randomBetween(-100, 100);
      const y = -randomBetween(50, 250);
      const rotation = randomBetween(-360, 360);

      Object.assign(span.style, {
        position: "absolute",
        left: `${originX}px`,
        top: `${originY}px`,
        fontSize: `${fontSize}px`,
        pointerEvents: "none",
        opacity: "1",
        transform: `translateY(0) rotate(${randomBetween(0, 360)}deg)`,
        transition: `transform ${1.4 + Math.random()}s cubic-bezier(.2,.8,.2,1), opacity 1.6s linear`,
      });

      span.textContent = emoji;
      container.appendChild(span);

      requestAnimationFrame(() => {
        span.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        span.style.opacity = "0";
      });

      window.setTimeout(() => {
        span.remove();
      }, 2200);
    });
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={confettiEmoji}
        className="group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-pink-400 bg-pink-100 text-pink-600 shadow-[6px_6px_0px_0px_#d62d81] text-lg font-extrabold hover:bg-pink-50 active:translate-y-1 transition-all cursor-pointer"
      >
        <span className="relative z-10">TAK!</span>
        <span className="stripe-overlay" aria-hidden="true" />
      </button>
      <style>{`
        .stripe-overlay {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-image: repeating-linear-gradient(
            45deg,
            #ff4d6d 0 12px,
            #ff9f1c 12px 24px,
            #ffe66d 24px 36px,
            #2ec4b6 36px 48px,
            #4d96ff 48px 60px,
            #b5179e 60px 72px
          );
          background-size: 200% 200%;
          background-position: 0% 0%;
          opacity: 0;
          transition: opacity 180ms ease;
          z-index: 0;
        }

        button:hover .stripe-overlay {
          opacity: 1;
          animation: stripes-flow 1.2s linear infinite;
        }

        @keyframes stripes-flow {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 200% 0%;
          }
        }
      `}</style>
    </div>
  );
}
