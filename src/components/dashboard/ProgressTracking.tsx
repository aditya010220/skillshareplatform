
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Calendar, Clock, Star } from 'lucide-react';

interface ProgressTrackingProps {
  profile: any;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ profile }) => {
  const currentLevel = Math.floor((profile?.level_points || 0) / 100) + 1;
  const pointsInCurrentLevel = (profile?.level_points || 0) % 100;
  const pointsToNextLevel = 100 - pointsInCurrentLevel;
  
  const progressData = [
    {
      label: 'Sessions Completed',
      value: profile?.completed_sessions || 0,
      target: 20,
      color: 'from-blue-500 to-blue-600',
      icon: Calendar
    },
    {
      label: 'Hours Exchanged',
      value: Math.round(((profile?.completed_sessions || 0) * 60) / 60),
      target: 50,
      color: 'from-green-500 to-green-600',
      icon: Clock
    },
    {
      label: 'Average Rating',
      value: profile?.rating || 0,
      target: 5,
      color: 'from-yellow-500 to-yellow-600',
      icon: Star
    },
    {
      label: 'Skills Mastered',
      value: 3,
      target: 10,
      color: 'from-purple-500 to-purple-600',
      icon: Award
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Progress Tracking</h2>
        <div className="flex items-center space-x-2 text-blue-600">
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium">Level {currentLevel}</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-900">
            Level {currentLevel} Progress
          </span>
          <span className="text-sm text-gray-600">
            {pointsInCurrentLevel}/100 XP
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${pointsInCurrentLevel}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Level {currentLevel}</span>
          <span>{pointsToNextLevel} XP to Level {currentLevel + 1}</span>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressData.map((item, index) => {
          const percentage = Math.min((item.value / item.target) * 100, 100);
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={item.label}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${item.color} rounded-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {item.label === 'Average Rating' ? item.value.toFixed(1) : item.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    of {item.target} {item.label === 'Average Rating' ? 'stars' : ''}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              {percentage >= 100 && (
                <motion.div
                  className="flex items-center space-x-1 text-sm text-green-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Target className="w-4 h-4" />
                  <span>Goal achieved!</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Skill Progress */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Level Progression</h3>
        <div className="space-y-4">
          {['React', 'Python', 'Guitar'].map((skill, index) => {
            const level = ['Beginner', 'Intermediate', 'Advanced'][index];
            const progress = [30, 60, 85][index];
            
            return (
              <div key={skill} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-700">{skill}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{level}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracking;
