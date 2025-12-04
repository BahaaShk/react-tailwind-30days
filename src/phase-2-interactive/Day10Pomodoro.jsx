import { useState, useEffect, useRef } from "react";
import beepSound from "../../public/beep.mp3";

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
      } px-4 py-2 rounded-lg ${
        colorClasses[btnColor]
      } text-white transition-all duration-200 hover:scale-105`}
    >
      {btnText}
    </button>
  );
};

/**
 * RingProgress
 * - percent: 0..100 (progress filled)
 * - size: px (diameter)
 * - strokeWidth: px (thickness of the ring)
 * - color: hex or tailwind color (used for the filled portion)
 * - bg: background ring color (unfilled)
 * - children: center content (usually time text)
 */
const RingProgress = ({
  percent = 0,
  size = 160,
  strokeWidth = 12,
  color = "#3b82f6", // Tailwind blue-500
  bg = "#e5e7eb", // Tailwind gray-200
  children,
}) => {
  // clamp percent to safe range
  const pct = Math.max(0, Math.min(100, percent));

  // outer container style (conic gradient set by percent)
  const outerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    // dynamic conic-gradient showing filled color up to pct%
    background: `conic-gradient(${color} ${pct}%, ${bg} ${pct}%)`,
    padding: `${strokeWidth / 2}px`,
  };

  const innerSize = size - strokeWidth; // diameter of inner circle
  const innerStyle = {
    width: `${innerSize}px`,
    height: `${innerSize}px`,
    borderRadius: "9999px",
  };

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="inline-flex items-center justify-center my-2"
      style={outerStyle}
    >
      <div
        className="flex items-center justify-center bg-white shadow-sm "
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
};

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const LONG_BREAK_SECONDS = 15 * 60;

const Day10Pomodoro = () => {
const [mode, setMode] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("pomodoro-state"));
  return saved?.mode || "focus";
});

const [cycles, setCycles] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("pomodoro-state"));
  return saved?.cycles || 0;
});

const [timeLeft, setTimeLeft] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("pomodoro-state"));
  return saved?.timeLeft || FOCUS_SECONDS;
});

const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  const totalSeconds = mode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS;

  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  useEffect(() => {
    audioRef.current = new Audio(beepSound);
  }, []);

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
      setCycles((c) => {
        const newCycles = c + 1;

        if (newCycles % 4 === 0) {
          setMode("break");
          setTimeLeft(LONG_BREAK_SECONDS);
        } else {
          setMode("break");
          setTimeLeft(BREAK_SECONDS);
        }
        return newCycles;
      });
    } else {
      setMode("focus");
      setTimeLeft(FOCUS_SECONDS);
    }

    setIsRunning(false);
    // stop timer until user clicks Start again
    audioRef.current.play();
  }, [timeLeft, mode]);

  // Load saved state at startup
// Load saved state on first render
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("pomodoro-state"));
  if (!saved) return;

  setMode(saved.mode);
  setCycles(saved.cycles);
  setTimeLeft(saved.timeLeft);
}, []);

useEffect(() => {
  localStorage.setItem(
    "pomodoro-state",
    JSON.stringify({
      mode,
      cycles,
      timeLeft,
    })
  );
}, [mode, cycles, timeLeft]);


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
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
        <p className="text-lg font-semibold mb-3 transition-all duration-300">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </p>
        <RingProgress
          percent={progressPercent}
          size={220}
          strokeWidth={14}
          color="#3b82f6" // or use Tailwind color hex you like
          bg="#f3f4f6"
        >
          <div
            className="text-6xl font-bold my-6 tracking-wide  transition-all duration-300
          transform"
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </RingProgress>
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
        <div className="text-sm text-gray-600 transition-all duration-300">
          Cycles completed: {cycles}
        </div>
      </div>
    </div>
  );
};

export default Day10Pomodoro;
