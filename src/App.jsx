import { useState } from "react";
import { Menu, X } from "lucide-react";

import Day01ProfileCard from "./phase-1-foundations/Day01ProfileCard";
import Day02ButtonLibrary from "./phase-1-foundations/Day02ButtonLibrary";
import Day03ColorPallete from "./phase-1-foundations/Day03ColorPallete";
import Day04QuizApp from "./phase-1-foundations/Day04QuizApp";
import Day05TodoApp from "./phase-2-interactive/Day05TodoApp";

function App() {
  const [currentDay, setCurrentDay] = useState("day01");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderDay = () => {
    switch (currentDay) {
      case "day01":
        return <Day01ProfileCard />;
      case "day02":
        return <Day02ButtonLibrary />;
      case "day03":
        return <Day03ColorPallete />;
      case "day04":
        return <Day04QuizApp />;
      case "day05":
        return <Day05TodoApp />;
      default:
        return <Day01ProfileCard />;
    }
  };

  const changeDay = (day) => {
    setCurrentDay(day);
    setSidebarOpen(false); // Close sidebar on select
  };

  return (
    <div className="min-h-screen">

      {/* ===== Hamburger Menu Button ===== */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} className="text-gray-800 dark:text-white" />
      </button>

      {/* ===== Sidebar Overlay ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ===== Sliding Sidebar ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 
          shadow-xl z-50 transform transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Navigate Days
          </h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} className="text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="flex flex-col p-4 gap-3 backdrop-blur-sm">

          <button
            onClick={() => changeDay("day01")}
            className={`px-3 py-2 rounded text-left text-sm font-medium transition 
                ${
                  currentDay === "day01"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
                }
            `}
          >
            Day 01 — Profile Card
          </button>

          <button
            onClick={() => changeDay("day02")}
            className={`px-3 py-2 rounded text-left text-sm font-medium transition 
              ${
                currentDay === "day02"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
              }
            `}
          >
            Day 02 — Button Library
          </button>

          <button
            onClick={() => changeDay("day03")}
            className={`px-3 py-2 rounded text-left text-sm font-medium transition 
              ${
                currentDay === "day03"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
              }
            `}
          >
            Day 03 — Palette Generator
          </button>

          <button
            onClick={() => changeDay("day04")}
            className={`px-3 py-2 rounded text-left text-sm font-medium transition 
              ${
                currentDay === "day04"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
              }
            `}
          >
            Day 04 — Quiz App
          </button>
          <button
            onClick={() => changeDay("day05")}
            className={`px-3 py-2 rounded text-left text-sm font-medium transition 
              ${
                currentDay === "day04"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
              }
            `}
          >
            Day 05 — TODO App
          </button>

        </nav>
      </aside>

      {/* ===== Render Selected Day ===== */}
      <div className="p-0">{renderDay()}</div>
    </div>
  );
}

export default App;
