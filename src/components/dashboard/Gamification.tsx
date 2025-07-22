
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Zap, Crown, Target } from 'lucide-react';

interface GamificationProps {
  profile: any;
}

const Gamification: React.FC<GamificationProps> = ({ profile }) => {
  // Dummy achievements data
  const achievements = [
    { id: 1, name: 'First Step', icon: '🎯', points_required: 10 },
    { id: 2, name: 'Teacher', icon: '👨‍🏫', points_required: 50 },
    { id: 3, name: 'Student', icon: '🎓', points_required: 50 },
    { id: 4, name: 'Social', icon: '🤝', points_required: 100 },
    { id: 5, name: 'Expert', icon: '⭐', points_required: 200 },
    { id: 6, name: 'Master', icon: '🏆', points_required: 500 }
  ];

  // Dummy user achievements
  const userAchievements = [
    { id: 1, achievement_id: 1, earned_at: '2024-01-10' },
    { id: 2, achievement_id: 2, earned_at: '2024-01-15' },
    { id: 3, achievement_id: 3, earned_at: '2024-01-20' }
  ];

  const earnedAchievementIds = userAchievements.map(ua => ua.achievement_id);
  const currentLevel = Math.floor((profile?.level_points || 250) / 100) + 1;
  
  const levelRanks = [
    { level: 1, title: 'Explorer', color: 'from-gray-500 to-gray-600', icon: Target },
    { level: 5, title: 'Apprentice', color: 'from-blue-500 to-blue-600', icon: Star },
    { level: 10, title: 'Mentor', color: 'from-purple-500 to-purple-600', icon: Award },
    { level: 20, title: 'Expert', color: 'from-orange-500 to-orange-600', icon: Trophy },
    { level: 50, title: 'Guru', color: 'from-yellow-500 to-yellow-600', icon: Crown },
  ];

  const currentRank = levelRanks
    .filter(rank => currentLevel >= rank.level)
    .pop() || levelRanks[0];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="font-medium text-gray-700">{profile?.level_points || 250} XP</span>
        </div>
      </div>

      {/* Current Rank */}
      <motion.div
        className={`p-6 bg-gradient-to-r ${currentRank.color} rounded-xl text-white mb-8`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <currentRank.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{currentRank.title}</h3>
              <p className="opacity-90">Level {currentLevel}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Next Rank</p>
            <p className="font-semibold">
              {levelRanks.find(rank => rank.level > currentLevel)?.title || 'Max Level'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => {
          const isEarned = earnedAchievementIds.includes(achievement.id);
          
          return (
            <motion.div
              key={achievement.id}
              className={`p-4 border-2 rounded-xl transition-all text-center ${
                isEarned
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`text-4xl mb-3 ${isEarned ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                {achievement.icon}
              </div>
              <div className="flex items-center justify-center space-x-2">
                <h4 className="font-bold text-gray-900 text-sm">
                  {achievement.name}
                </h4>
                {isEarned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Achievement Progress</p>
            <p className="text-lg font-semibold text-gray-900">
              {userAchievements.length} of {achievements.length} earned
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-lg font-semibold text-blue-600">
              {Math.round((userAchievements.length / achievements.length) * 100)}%
            </p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(userAchievements.length / achievements.length) * 100}%`
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Gamification;
