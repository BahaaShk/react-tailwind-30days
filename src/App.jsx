import { useState } from 'react';
import Day01ProfileCard from './phase-1-foundations/Day01ProfileCard';
import Day02ButtonLibrary from './phase-1-foundations/Day02ButtonLibrary';
// Import Day02 here tomorrow

function App() {
  const [currentDay, setCurrentDay] = useState('day01');

  const renderDay = () => {
    switch(currentDay) {
      case 'day01':
        return <Day01ProfileCard />;
      case 'day02':
        return <Day02ButtonLibrary />;
      default:
        return <Day01ProfileCard />;
    }
  };

  return (
    <div>
      {/* Day Navigation */}
      <nav className="fixed top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
        <h3 className="text-sm font-bold mb-2">Navigate Days:</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setCurrentDay('day01')}
            className={`px-3 py-1 rounded text-sm ${
              currentDay === 'day01' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Day 01: Profile Card
          </button>
          <button
            onClick={() => setCurrentDay('day02')}
            className={`px-3 py-1 rounded text-sm ${
              currentDay === 'day01' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Day 02: Button Library
          </button>
          
        </div>
      </nav>

      {/* Render Current Day */}
      {renderDay()}
    </div>
  );
}

export default App;