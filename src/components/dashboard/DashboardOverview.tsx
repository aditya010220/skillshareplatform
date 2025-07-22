
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Star, Award, BookOpen, MessageSquare, Target, Video, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SkillsManagement from './SkillsManagement';

interface DashboardOverviewProps {
  profile: any;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ profile }) => {
  const navigate = useNavigate();
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const handleFindMatches = () => {
    navigate('/connect');
    toast.success('Redirecting to find matches...');
  };

  const handleScheduleSession = () => {
    // Create a mailto link for scheduling
    const subject = encodeURIComponent('Schedule a SkillSwap Session');
    const body = encodeURIComponent(`Hi there!

I'd like to schedule a skill exchange session with you through SkillSwap.

Please let me know your available times and we can set up a video call.

Best regards,
${profile?.full_name || 'SkillSwap User'}`);
    
    const mailtoLink = `mailto:artheya029@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    toast.success('Opening email client to schedule session...');
  };

  const handleAddSkills = () => {
    setShowSkillsModal(true);
  };

  const handleBrowseCommunity = () => {
    navigate('/community');
    toast.success('Exploring the community...');
  };

  const stats = [
    {
      title: 'Total Sessions',
      value: profile?.total_sessions || 15,
      change: '+3 this week',
      color: 'from-blue-500 to-blue-600',
      icon: Calendar,
      trend: 'up'
    },
    {
      title: 'Average Rating',
      value: `${profile?.rating || 4.8}/5.0`,
      change: '+0.2 this month',
      color: 'from-yellow-500 to-yellow-600',
      icon: Star,
      trend: 'up'
    },
    {
      title: 'Skills Taught',
      value: '8',
      change: '+2 new skills',
      color: 'from-green-500 to-green-600',
      icon: BookOpen,
      trend: 'up'
    },
    {
      title: 'XP Points',
      value: profile?.level_points || 250,
      change: '+45 this week',
      color: 'from-purple-500 to-purple-600',
      icon: Award,
      trend: 'up'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'React Fundamentals',
      partner: 'Sarah Johnson',
      time: '2:00 PM Today',
      skill: 'React',
      type: 'teaching'
    },
    {
      id: 2,
      title: 'Spanish Conversation',
      partner: 'Emily Rodriguez',
      time: '4:30 PM Tomorrow',
      skill: 'Spanish',
      type: 'learning'
    },
    {
      id: 3,
      title: 'Photography Basics',
      partner: 'Mike Chen',
      time: '10:00 AM Friday',
      skill: 'Photography',
      type: 'learning'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Completed session',
      details: 'Python Basics with David Kim',
      time: '2 hours ago',
      type: 'session'
    },
    {
      id: 2,
      action: 'New match found',
      details: 'Alex Thompson wants to learn React',
      time: '5 hours ago',
      type: 'match'
    },
    {
      id: 3,
      action: 'Achievement unlocked',
      details: 'Teacher Badge - 10 sessions taught',
      time: '1 day ago',
      type: 'achievement'
    },
    {
      id: 4,
      action: 'Received rating',
      details: '5 stars from Maria Garcia',
      time: '2 days ago',
      type: 'rating'
    }
  ];

  if (showSkillsModal) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => setShowSkillsModal(false)}
            className="text-blue-600 hover:text-blue-700 font-medium"
            whileHover={{ scale: 1.02 }}
          >
            ← Back to Overview
          </motion.button>
        </div>
        <SkillsManagement />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'John'}! 👋
            </h2>
            <p className="text-blue-100 text-lg">
              You're on Level {Math.floor((profile?.level_points || 0) / 100) + 1}. 
              Keep learning and teaching to reach the next level!
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src={profile?.avatar_url}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.trend}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-xs text-green-600 mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Upcoming Sessions</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className={`p-3 rounded-full ${
                  session.type === 'teaching' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {session.type === 'teaching' ? <BookOpen className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-600">with {session.partner}</p>
                  <p className="text-xs text-gray-500">{session.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  session.type === 'teaching'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {session.type === 'teaching' ? 'Teaching' : 'Learning'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  activity.type === 'session' ? 'bg-blue-100' :
                  activity.type === 'match' ? 'bg-green-100' :
                  activity.type === 'achievement' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'session' && <Calendar className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'match' && <Users className="w-4 h-4 text-green-600" />}
                  {activity.type === 'achievement' && <Award className="w-4 h-4 text-yellow-600" />}
                  {activity.type === 'rating' && <Star className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            onClick={handleFindMatches}
            className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Find Matches</span>
          </motion.button>
          
          <motion.button
            onClick={handleScheduleSession}
            className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Video className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Schedule Session</span>
          </motion.button>
          
          <motion.button
            onClick={handleAddSkills}
            className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Add Skills</span>
          </motion.button>
          
          <motion.button
            onClick={handleBrowseCommunity}
            className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Browse Community</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
