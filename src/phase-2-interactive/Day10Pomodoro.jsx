import { useState, useEffect } from "react";

const Button = ({ btnColor, btnText, onClick, disabled }) => {
  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } px-4 py-2 rounded-lg ${colorClasses[btnColor]} text-white`}
    >
      {btnText}
    </button>
  );
};

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const Day10Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycles, setCycles] = useState(0);

  // Countdown interval
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle switching modes when time reaches 0
  useEffect(() => {
    if (timeLeft >= 0) return;

    if (mode === "focus") {
      setMode("break");
      setTimeLeft(BREAK_SECONDS);
      setCycles((c) => c + 1);
    } else {
      setMode("focus");
      setTimeLeft(FOCUS_SECONDS);
    }

    setIsRunning(false); // stop timer until user clicks Start again
  }, [timeLeft, mode]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(FOCUS_SECONDS);
    setCycles(0);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
        <p className="text-lg font-semibold mb-3">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </p>
        <div className="text-6xl font-bold my-6 tracking-wide">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={startTimer}
            btnColor="green"
            btnText="Start"
            disabled={isRunning}
          />
          <Button
            onClick={pauseTimer}
            btnColor="yellow"
            btnText="Pause"
            disabled={!isRunning}
          />
          <Button onClick={resetTimer} btnColor="red" btnText="Reset" />
        </div>
        <div className="text-sm text-gray-600">Cycles completed: {cycles}</div>
      </div>
    </div>
  );
};

export default Day10Pomodoro;
