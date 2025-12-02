import { useState, useEffect } from "react";

const Day10Pomodoro = () => {
  // -----------------------------
  // 🧠 1. States
  // -----------------------------
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // "focus" or "break"
  const [cycles, setCycles] = useState(0);   // (Day 12 feature)

  // -----------------------------
  // 🎛️ 2. Handlers (you fill inside later)
  // -----------------------------
  const startTimer = () => {};
  const pauseTimer = () => {};
  const resetTimer = () => {};

  // Switch between focus → break (you fill logic)
  const switchMode = () => {};

  // -----------------------------
  // ⏱️ 3. Timer useEffect (Day 10)
  // -----------------------------
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        // You will implement:
        // - seconds countdown
        // - minutes decrease
        // - when both hit zero → switchMode()
      }, 1000);
    }

    // Cleanup interval (very important)
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  // -----------------------------
  // 🎨 4. Basic UI Layout
  // -----------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">
          Pomodoro Timer
        </h1>

        {/* Mode (Focus / Break) */}
        <p className="text-lg font-semibold mb-3">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </p>

        {/* Timer Display */}
        <div className="text-6xl font-bold my-6 tracking-wide">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={startTimer}
            className="px-4 py-2 rounded-lg bg-green-500 text-white"
          >
            Start
          </button>

          <button
            onClick={pauseTimer}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
          >
            Pause
          </button>

          <button
            onClick={resetTimer}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Reset
          </button>
        </div>

        {/* Stats Placeholder (Day 12) */}
        <div className="text-sm text-gray-600">
          Cycles completed: {cycles}
        </div>
      </div>
    </div>
  );
};

export default Day10Pomodoro;
