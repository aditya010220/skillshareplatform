import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Award, Target, CheckCircle, X, RotateCcw, TrendingUp } from 'lucide-react';

const QuizSystem = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);

  const availableQuizzes = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Test your knowledge of React basics, components, and hooks',
      category: 'Programming',
      difficulty: 'Intermediate',
      questions: 15,
      timeLimit: 20,
      points: 100,
      attempts: 0,
      bestScore: null
    },
    {
      id: 2,
      title: 'JavaScript ES6+',
      description: 'Modern JavaScript features and best practices',
      category: 'Programming',
      difficulty: 'Advanced',
      questions: 20,
      timeLimit: 25,
      points: 150,
      attempts: 2,
      bestScore: 85
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      description: 'Fundamental design concepts and user experience',
      category: 'Design',
      difficulty: 'Beginner',
      questions: 12,
      timeLimit: 15,
      points: 80,
      attempts: 1,
      bestScore: 92
    }
  ];

  const completedQuizzes = [
    {
      id: 1,
      title: 'Python Basics',
      score: 88,
      totalQuestions: 15,
      correctAnswers: 13,
      completedDate: '2024-12-20',
      timeSpent: 18,
      category: 'Programming'
    },
    {
      id: 2,
      title: 'CSS Grid & Flexbox',
      score: 95,
      totalQuestions: 10,
      correctAnswers: 10,
      completedDate: '2024-12-18',
      timeSpent: 12,
      category: 'Design'
    }
  ];

  const todaysChallenge = {
    id: 1,
    title: "Today's Challenge",
    name: 'JavaScript Array Methods',
    description: 'Master array manipulation with map, filter, and reduce',
    difficulty: 'Intermediate',
    timeLimit: 30,
    points: 50,
    category: 'Programming',
    instructions: 'Complete 5 JavaScript array method problems. Each correct answer earns 10 points.',
    tasks: [
      {
        id: 1,
        problem: 'Write a function that doubles every number in an array using map()',
        hint: 'Use array.map(x => x * 2)',
        points: 10
      },
      {
        id: 2,
        problem: 'Filter an array to get only even numbers',
        hint: 'Use array.filter(x => x % 2 === 0)',
        points: 10
      },
      {
        id: 3,
        problem: 'Sum all numbers in an array using reduce()',
        hint: 'Use array.reduce((sum, x) => sum + x, 0)',
        points: 10
      },
      {
        id: 4,
        problem: 'Transform objects in an array to get only names',
        hint: 'Use array.map(obj => obj.name)',
        points: 10
      },
      {
        id: 5,
        problem: 'Find the first element that matches a condition',
        hint: 'Use array.find(x => condition)',
        points: 10
      }
    ],
    completedTasks: 0
  };

  const weeklyChallenge = {
    id: 2,
    title: "Weekly Challenge",
    name: 'Build a React Component',
    description: 'Create a reusable React component with state and props',
    difficulty: 'Advanced',
    timeLimit: 120,
    points: 150,
    category: 'Programming',
    instructions: 'Build a Todo App component with add, delete, and mark complete functionality.',
    tasks: [
      {
        id: 1,
        problem: 'Create a functional component with useState hook',
        hint: 'Setup state for todos list and input value',
        points: 30
      },
      {
        id: 2,
        problem: 'Add form input and submission handler',
        hint: 'Create handleSubmit and handleChange functions',
        points: 30
      },
      {
        id: 3,
        problem: 'Implement delete todo functionality',
        hint: 'Filter out the deleted item from the todos array',
        points: 30
      },
      {
        id: 4,
        problem: 'Add mark complete toggle feature',
        hint: 'Use map to update the completed status of a todo',
        points: 30
      },
      {
        id: 5,
        problem: 'Style the component with Tailwind CSS',
        hint: 'Add responsive design and smooth transitions',
        points: 30
      }
    ],
    completedTasks: 0
  };

  const sampleQuiz = {
    id: 1,
    title: 'React Fundamentals',
    questions: [
      {
        id: 1,
        question: 'What is JSX in React?',
        options: [
          'A JavaScript library',
          'A syntax extension for JavaScript',
          'A CSS framework',
          'A database query language'
        ],
        correct: 1,
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript files.'
      },
      {
        id: 2,
        question: 'Which hook is used for managing state in functional components?',
        options: [
          'useEffect',
          'useState',
          'useContext',
          'useReducer'
        ],
        correct: 1,
        explanation: 'useState is the primary hook for managing local state in functional components.'
      },
      {
        id: 3,
        question: 'What does the useEffect hook do?',
        options: [
          'Manages component state',
          'Handles side effects in functional components',
          'Creates context for components',
          'Optimizes component rendering'
        ],
        correct: 1,
        explanation: 'useEffect handles side effects like API calls, subscriptions, and manual DOM manipulation.'
      }
    ]
  };

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestion < sampleQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === sampleQuiz.questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
  };

  const startChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setChallengeStarted(true);
  };

  const completeChallenge = () => {
    if (activeChallenge) {
      alert(`🎉 Congratulations! You completed the "${activeChallenge.name}" challenge and earned ${activeChallenge.points} points!`);
      setActiveChallenge(null);
      setChallengeStarted(false);
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
    setChallengeStarted(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'available', label: 'Available Quizzes', icon: Play },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'challenges', label: 'Challenges', icon: Target }
  ];

  if (activeQuiz && !showResults) {
    const currentQ = sampleQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuiz.questions.length) * 100;

    return (
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{sampleQuiz.title}</h2>
            <p className="text-gray-600">Question {currentQuestion + 1} of {sampleQuiz.questions.length}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === sampleQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === sampleQuiz.questions[index].correct
    ).length;

    return (
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-6">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <Award className={`w-10 h-10 ${
              score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600">Here are your results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{score}%</div>
            <div className="text-sm text-gray-600">Final Score</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}/{sampleQuiz.questions.length}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">85</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quizzes & Challenges</h2>
          <p className="text-gray-600">Test your knowledge and track your progress</p>
        </div>
        <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Skill Assessment</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{quiz.category}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{quiz.questions}</div>
                    <div className="text-xs text-gray-500">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{quiz.timeLimit}m</div>
                    <div className="text-xs text-gray-500">Time Limit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{quiz.points}</div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                </div>

                {quiz.bestScore && (
                  <div className="mb-4 p-2 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-700">
                      Best Score: {quiz.bestScore}% ({quiz.attempts} attempts)
                    </div>
                  </div>
                )}

                <button
                  onClick={() => startQuiz(quiz)}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>{quiz.attempts > 0 ? 'Retake Quiz' : 'Start Quiz'}</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      quiz.score >= 80 ? 'bg-green-100' : quiz.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <Award className={`w-6 h-6 ${
                        quiz.score >= 80 ? 'text-green-600' : quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">{quiz.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{quiz.score}%</div>
                    <div className="text-sm text-gray-500">
                      {quiz.correctAnswers}/{quiz.totalQuestions} correct
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Completed: {new Date(quiz.completedDate).toLocaleDateString()}</span>
                  <span>Time: {quiz.timeSpent} minutes</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && !challengeStarted && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Daily & Weekly Challenges</h3>
                <p className="text-gray-600">Complete challenges to earn extra points and improve your skills</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Challenge */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">Today</span>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{todaysChallenge.name}</h4>
                    <p className="text-gray-700 mb-3">{todaysChallenge.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{todaysChallenge.points}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{todaysChallenge.timeLimit}m</div>
                    <div className="text-xs text-gray-600">Time Limit</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{todaysChallenge.tasks.length}</div>
                    <div className="text-xs text-gray-600">Tasks</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{todaysChallenge.difficulty}</div>
                    <div className="text-xs text-gray-600">Level</div>
                  </div>
                </div>

                <motion.button
                  onClick={() => startChallenge(todaysChallenge)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" />
                  <span>Start Challenge</span>
                </motion.button>
              </motion.div>

              {/* Weekly Challenge */}
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">This Week</span>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{weeklyChallenge.name}</h4>
                    <p className="text-gray-700 mb-3">{weeklyChallenge.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-600">{weeklyChallenge.points}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-600">{weeklyChallenge.timeLimit}m</div>
                    <div className="text-xs text-gray-600">Time Limit</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-600">{weeklyChallenge.tasks.length}</div>
                    <div className="text-xs text-gray-600">Tasks</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-600">{weeklyChallenge.difficulty}</div>
                    <div className="text-xs text-gray-600">Level</div>
                  </div>
                </div>

                <motion.button
                  onClick={() => startChallenge(weeklyChallenge)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" />
                  <span>Start Challenge</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && challengeStarted && activeChallenge && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className={`inline-block ${activeChallenge.id === 1 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'} px-3 py-1 rounded-full text-xs font-bold mb-2`}>
                  {activeChallenge.title}
                </span>
                <h2 className="text-3xl font-bold text-gray-900">{activeChallenge.name}</h2>
                <p className="text-gray-600 mt-1">{activeChallenge.description}</p>
              </div>
              <button
                onClick={resetChallenge}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
              <p className="text-gray-700">{activeChallenge.instructions}</p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-900">Tasks to Complete</h3>
              {activeChallenge.tasks.map((task, index) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 font-medium">{task.problem}</h4>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">+{task.points} pts</span>
                  </div>
                  <div className="ml-8">
                    <p className="text-sm text-gray-600 italic">💡 {task.hint}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{activeChallenge.points}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{activeChallenge.timeLimit}</div>
                <div className="text-sm text-gray-600">Minutes Available</div>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={resetChallenge}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Exit Challenge
              </button>
              <motion.button
                onClick={completeChallenge}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Complete Challenge</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizSystem;
