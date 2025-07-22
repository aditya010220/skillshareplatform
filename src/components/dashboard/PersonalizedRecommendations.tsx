
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Target, Star, Clock, ArrowRight } from 'lucide-react';

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState('sessions');

  const sessionRecommendations = [
    {
      id: 1,
      title: 'Advanced React Hooks Workshop',
      instructor: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 4.9,
      duration: '2 hours',
      matchScore: 95,
      skills: ['React', 'JavaScript', 'Hooks'],
      reason: 'Based on your recent Python learning'
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      rating: 4.8,
      duration: '1.5 hours',
      matchScore: 88,
      skills: ['Design', 'Figma', 'User Experience'],
      reason: 'Complements your frontend skills'
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      rating: 4.7,
      duration: '3 hours',
      matchScore: 92,
      skills: ['Python', 'Data Analysis', 'Machine Learning'],
      reason: 'Matches your learning goals'
    }
  ];

  const skillRecommendations = [
    {
      id: 1,
      name: 'TypeScript',
      category: 'Programming',
      level: 'Intermediate',
      trending: true,
      learners: 1240,
      reason: 'Popular among React developers',
      icon: '💻'
    },
    {
      id: 2,
      name: 'Adobe Photoshop',
      category: 'Design',
      level: 'Beginner',
      trending: false,
      learners: 890,
      reason: 'Enhances your design capabilities',
      icon: '🎨'
    },
    {
      id: 3,
      name: 'Project Management',
      category: 'Business',
      level: 'Intermediate',
      trending: true,
      learners: 567,
      reason: 'High demand in your field',
      icon: '📊'
    }
  ];

  const userRecommendations = [
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      skills: ['Node.js', 'MongoDB', 'Express'],
      wants: ['React', 'TypeScript'],
      matchScore: 96,
      location: 'San Francisco, CA',
      sessions: 25
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      skills: ['Graphic Design', 'Illustrator'],
      wants: ['Web Development', 'CSS'],
      matchScore: 89,
      location: 'Austin, TX',
      sessions: 18
    }
  ];

  const tabs = [
    { id: 'sessions', label: 'Sessions', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Target },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
          <p className="text-gray-600">Curated suggestions based on your activity and preferences</p>
        </div>
        <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">AI Powered</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
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
      <div className="space-y-4">
        {activeTab === 'sessions' && (
          <>
            {sessionRecommendations.map((session, index) => (
              <motion.div
                key={session.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={session.avatar}
                      alt={session.instructor}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                        <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-green-600">
                            {session.matchScore}% match
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">by {session.instructor}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{session.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {session.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 italic">{session.reason}</p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <span>Book Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {activeTab === 'skills' && (
          <>
            {skillRecommendations.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{skill.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                        {skill.trending && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            Trending
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{skill.category} • {skill.level}</p>
                      <p className="text-sm text-gray-500">{skill.learners} learners • {skill.reason}</p>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Start Learning
                  </button>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {activeTab === 'users' && (
          <>
            {userRecommendations.map((user, index) => (
              <motion.div
                key={user.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-green-600">
                            {user.matchScore}% match
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{user.location} • {user.sessions} sessions</p>
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-xs text-gray-500">Offers: </span>
                          <span className="text-xs font-medium text-green-600">{user.skills.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Wants: </span>
                          <span className="text-xs font-medium text-blue-600">{user.wants.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PersonalizedRecommendations;
