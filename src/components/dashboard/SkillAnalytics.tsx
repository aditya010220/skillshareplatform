
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Target, Award, Calendar, Users } from 'lucide-react';

const SkillAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const skillProgressData = [
    { skill: 'React', current: 85, target: 90, hours: 45 },
    { skill: 'Python', current: 70, target: 80, hours: 32 },
    { skill: 'Design', current: 60, target: 75, hours: 28 },
    { skill: 'Node.js', current: 40, target: 60, hours: 18 },
    { skill: 'TypeScript', current: 30, target: 50, hours: 12 }
  ];

  const weeklyActivityData = [
    { day: 'Mon', hours: 2.5, sessions: 1 },
    { day: 'Tue', hours: 3.2, sessions: 2 },
    { day: 'Wed', hours: 1.8, sessions: 1 },
    { day: 'Thu', hours: 4.1, sessions: 2 },
    { day: 'Fri', hours: 2.9, sessions: 1 },
    { day: 'Sat', hours: 5.5, sessions: 3 },
    { day: 'Sun', hours: 3.7, sessions: 2 }
  ];

  const skillCategoryData = [
    { name: 'Programming', value: 45, color: '#3B82F6' },
    { name: 'Design', value: 25, color: '#10B981' },
    { name: 'Business', value: 20, color: '#F59E0B' },
    { name: 'Languages', value: 10, color: '#EF4444' }
  ];

  const completionRateData = [
    { month: 'Jan', rate: 78 },
    { month: 'Feb', rate: 82 },
    { month: 'Mar', rate: 85 },
    { month: 'Apr', rate: 88 },
    { month: 'May', rate: 92 },
    { month: 'Jun', rate: 89 }
  ];

  const stats = [
    {
      title: 'Total Hours',
      value: '147.5',
      change: '+12%',
      positive: true,
      icon: Clock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Skills Mastered',
      value: '8',
      change: '+2',
      positive: true,
      icon: Award,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Completion Rate',
      value: '89%',
      change: '+5%',
      positive: true,
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Active Streak',
      value: '15 days',
      change: '+3',
      positive: true,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skill Analytics</h2>
          <p className="text-gray-600">Track your learning progress and insights</p>
        </div>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#3B82F6" name="Current Level" />
              <Bar dataKey="target" fill="#E5E7EB" name="Target Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={3} name="Hours" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Categories Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {skillCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Rate Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={completionRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#8B5CF6" strokeWidth={3} name="Completion %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Skill Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Skill Breakdown</h3>
        <div className="space-y-4">
          {skillProgressData.map((skill, index) => (
            <div key={skill.skill} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium text-gray-700">{skill.skill}</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress: {skill.current}%</span>
                  <span>Target: {skill.target}%</span>
                  <span>{skill.hours}h spent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 relative">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.current}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                  <div
                    className="absolute top-0 right-0 w-1 h-2 bg-red-400 rounded-full"
                    style={{ right: `${100 - skill.target}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillAnalytics;
