
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Calendar, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const GoalTracker = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const goals = [
    {
      id: 1,
      title: 'Master React Hooks',
      description: 'Complete advanced React hooks course and build 3 projects',
      category: 'Programming',
      targetDate: '2025-02-15',
      progress: 75,
      status: 'on-track',
      milestones: [
        { id: 1, title: 'Complete useState & useEffect', completed: true },
        { id: 2, title: 'Learn useContext & useReducer', completed: true },
        { id: 3, title: 'Master custom hooks', completed: false },
        { id: 4, title: 'Build 3 projects', completed: false }
      ],
      timeSpent: 28,
      targetTime: 40
    },
    {
      id: 2,
      title: 'Learn UI/UX Design',
      description: 'Complete design fundamentals and create portfolio',
      category: 'Design',
      targetDate: '2025-03-01',
      progress: 45,
      status: 'behind',
      milestones: [
        { id: 1, title: 'Design principles', completed: true },
        { id: 2, title: 'Color theory', completed: false },
        { id: 3, title: 'Typography', completed: false },
        { id: 4, title: 'Portfolio creation', completed: false }
      ],
      timeSpent: 15,
      targetTime: 35
    },
    {
      id: 3,
      title: 'Python Data Science',
      description: 'Complete data science bootcamp and certification',
      category: 'Data Science',
      targetDate: '2025-04-10',
      progress: 90,
      status: 'ahead',
      milestones: [
        { id: 1, title: 'Python basics', completed: true },
        { id: 2, title: 'Pandas & NumPy', completed: true },
        { id: 3, title: 'Machine Learning', completed: true },
        { id: 4, title: 'Final project', completed: false }
      ],
      timeSpent: 42,
      targetTime: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'behind': return 'text-red-600 bg-red-100';
      case 'ahead': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return CheckCircle;
      case 'behind': return AlertCircle;
      case 'ahead': return TrendingUp;
      default: return Target;
    }
  };

  const filteredGoals = goals.filter(goal => 
    activeFilter === 'all' || goal.status === activeFilter
  );

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Goal Tracker</h2>
          <p className="text-gray-600">Set and track your learning objectives</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {['all', 'on-track', 'behind', 'ahead'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              activeFilter === filter
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
              <p className="text-2xl font-bold text-green-600">{goals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Avg Progress</h3>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Time Invested</h3>
              <p className="text-2xl font-bold text-purple-600">
                {goals.reduce((acc, goal) => acc + goal.timeSpent, 0)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal, index) => {
          const StatusIcon = getStatusIcon(goal.status);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const completedMilestones = goal.milestones.filter(m => m.completed).length;
          
          return (
            <motion.div
              key={goal.id}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {goal.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{daysRemaining} days left</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{goal.timeSpent}h / {goal.targetTime}h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>{completedMilestones}/{goal.milestones.length} milestones</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{goal.progress}%</div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Milestones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {goal.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        milestone.completed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${
                        milestone.completed ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <span className="text-sm">{milestone.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your goal title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe your goal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default GoalTracker;
