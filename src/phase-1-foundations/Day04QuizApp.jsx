import { CheckCircle2, XCircle, RotateCcw, Trophy, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Day04QuizApp() {
  // Quiz questions data
  const quizData = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language"
      ],
      correct: 0,
      category:"HTML",
      difficulty:"easy"
    },
    {
      question: "Which CSS property is used to change text color?",
      options: ["text-color", "font-color", "color", "text-style"],
      correct: 2,
      category:"CSS",
      difficulty:"medium"
    },
    {
      question: "What does 'useState' do in React?",
      options: [
        "Fetches data from API",
        "Manages component state",
        "Handles routing",
        "Styles components"
      ],
      correct: 1,
      category:"REACT",
      difficulty:"easy"
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["<!-- -->", "// or /* */", "# ", "' '"],
      correct: 1,
      category:"JAVASCRIPT",
      difficulty:"hard"
    },
    {
      question: "What is the default port for a React development server?",
      options: ["8080", "3000", "5000", "3030"],
      correct: 1,
      category:"REACT",
      difficulty:"easy"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem("quizLeaderboard"); 
    return saved ? JSON.parse(saved) : []
  })
  const [playerName, setPlayerName] = useState('');
const [showNameInput, setShowNameInput] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === 0 && !quizCompleted) {
      handleNextQuestion();
      return;
    }

    if (!quizCompleted && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, quizCompleted, showResult]);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestion]);

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizData[currentQuestion].correct;
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: quizData[currentQuestion].correct,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    const audio = new Audio('/splashing-water-443136.mp3').play()

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setTimeLeft(30);
  };

  const saveScore = () => {
    if(!playerName.trim()){
      alert("please enter your name"); 
      return
    }

    const newScore = {
      name: playerName,
          score: score,
    total: quizData.length,
    percentage: Math.round((score / quizData.length) * 100),
    date: new Date().toLocaleDateString()
    }

    const updatedLeaderboard = [...leaderboard, newScore]

    updatedLeaderboard.sort((a,b) => b.score- a.score)
    const top10 = updatedLeaderboard.slice(0,10)

    localStorage.setItem("quizLeaderboard", JSON.stringify(top10))
    setLeaderboard(top10)

    setShowNameInput(false)
  } 

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / quizData.length) * 100;
  };

  // Quiz completed screen
  // Quiz completed screen
if (quizCompleted) {
  const percentage = Math.round((score / quizData.length) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Completed! 🎉
          </h1>
          
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl p-8 mb-6">
            <div className="text-6xl font-bold mb-2">
              {score}/{quizData.length}
            </div>
            <div className="text-2xl">
              {percentage}% Correct
            </div>
          </div>

          {/* Name Input Section */}
          {!showNameInput && !leaderboard.find(entry => entry.date === new Date().toLocaleDateString() && entry.score === score) ? (
            <button
              onClick={() => setShowNameInput(true)}
              className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Save to Leaderboard 🏆
            </button>
          ) : showNameInput ? (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <input
                type="text"
                placeholder="Enter your name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg mb-3 focus:outline-none focus:border-purple-500"
                maxLength={20}
              />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={saveScore}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Score
                </button>
                <button
                  onClick={() => setShowNameInput(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}

          {/* Leaderboard Display */}
          {leaderboard.length > 0 && (
            <div className="mb-6 text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                🏆 Top Scores
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {leaderboard.slice(0, 5).map((entry, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
                      idx === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                      idx === 1 ? 'bg-gray-200' :
                      idx === 2 ? 'bg-orange-100' :
                      'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-600">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </span>
                      <div>
                        <div className="font-bold text-gray-900">{entry.name}</div>
                        <div className="text-sm text-gray-600">{entry.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {entry.score}/{entry.total}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Your Answers section (keep existing code) */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Your Answers:</h3>
            <div className="space-y-2">
              {answeredQuestions.map((answer, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    answer.isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <span className="text-gray-800 font-medium">
                    Question {answer.question + 1}
                  </span>
                  {answer.isCorrect ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity mx-auto"
          >
            <RotateCcw size={20} />
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

  // Quiz questions screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                React & Web Dev Quiz
              </h2>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {quizData.length}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
              <Clock className="text-purple-600" size={20} />
              <span className={`text-xl font-bold ${
                timeLeft <= 10 ? 'text-red-600' : 'text-purple-600'
              }`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-8 mb-6">
        <div className='flex justify-between'> 
          <div className=' border-2 border-green-400 p-2 rounded-2xl bg-gray-300'>
            {quizData[currentQuestion].category}
            </div>
          <div className={`border-2 border-white py-2 px-4 capitalize text-lg font-bold rounded-2xl text-gray-200 ${quizData[currentQuestion].difficulty === "easy" ?'bg-green-400' : quizData[currentQuestion].difficulty === "medium" ? "bg-yellow-400" : "bg-red-500"}`}>
            {quizData[currentQuestion].difficulty}
            </div>
        </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-2">
            {quizData[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {quizData[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === quizData[currentQuestion].correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 font-medium transition-all ${
                    showCorrect
                      ? 'bg-green-100 border-green-500 text-green-900'
                      : showWrong
                      ? 'bg-red-100 border-red-500 text-red-900'
                      : isSelected
                      ? 'bg-purple-100 border-purple-500 text-purple-900'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <CheckCircle2 className="text-green-600" size={24} />}
                    {showWrong && <XCircle className="text-red-600" size={24} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-b-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-700 font-medium">
              Score: <span className="text-purple-600 text-xl font-bold">{score}</span> / {quizData.length}
            </div>
            
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
              >
                {currentQuestion < quizData.length - 1 ? 'Next Question →' : 'See Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}