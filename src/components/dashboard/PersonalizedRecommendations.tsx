import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Calendar, Star, Clock, MapPin, Search, Filter, MessageSquare, Heart, X, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const categoryColors = {
    Programming: { bg: 'from-blue-500 to-cyan-600', light: 'from-blue-50 to-cyan-50' },
    Design: { bg: 'from-purple-500 to-pink-600', light: 'from-purple-50 to-pink-50' },
    Languages: { bg: 'from-green-500 to-emerald-600', light: 'from-green-50 to-emerald-50' },
    Creative: { bg: 'from-orange-500 to-red-600', light: 'from-orange-50 to-red-50' },
    Business: { bg: 'from-amber-500 to-yellow-600', light: 'from-amber-50 to-yellow-50' }
  };

  // Skills Data for "Start Learning" tab
  const skillsToLearn = [
    {
      id: 1,
      name: 'React Advanced Patterns',
      category: 'Programming',
      rating: 4.9,
      students: 342,
      instructor: 'Priya Sharma',
      duration: '8 weeks',
      level: 'Advanced',
      price: 'Free (Skill Exchange)',
      description: 'Master advanced React patterns, hooks, and performance optimization',
      popularity: 'trending'
    },
    {
      id: 2,
      name: 'UI/UX Design Fundamentals',
      category: 'Design',
      rating: 4.8,
      students: 287,
      instructor: 'Rohan Patel',
      duration: '6 weeks',
      level: 'Beginner',
      price: 'Free (Skill Exchange)',
      description: 'Learn design principles, user research, and wireframing',
      popularity: 'trending'
    },
    {
      id: 3,
      name: 'Python for Data Science',
      category: 'Programming',
      rating: 4.7,
      students: 521,
      instructor: 'Anjali Reddy',
      duration: '10 weeks',
      level: 'Intermediate',
      price: 'Free (Skill Exchange)',
      description: 'Data analysis, visualization, and machine learning basics',
      popularity: 'new'
    },
    {
      id: 4,
      name: 'Digital Photography Masterclass',
      category: 'Creative',
      rating: 4.9,
      students: 198,
      instructor: 'Kavya Desai',
      duration: '5 weeks',
      level: 'Beginner',
      price: 'Free (Skill Exchange)',
      description: 'Composition, lighting, and post-processing techniques',
      popularity: null
    },
    {
      id: 5,
      name: 'Full-Stack Web Development',
      category: 'Programming',
      rating: 4.8,
      students: 612,
      instructor: 'Arjun Singh',
      duration: '12 weeks',
      level: 'Intermediate',
      price: 'Free (Skill Exchange)',
      description: 'Frontend, backend, databases, and deployment',
      popularity: 'trending'
    },
    {
      id: 6,
      name: 'Spanish Conversation Practice',
      category: 'Languages',
      rating: 4.6,
      students: 156,
      instructor: 'Nisha Iyer',
      duration: '4 weeks',
      level: 'Intermediate',
      price: 'Free (Skill Exchange)',
      description: 'Real-world conversations and pronunciation tips',
      popularity: 'new'
    },
    {
      id: 7,
      name: 'Graphic Design with Adobe Suite',
      category: 'Design',
      rating: 4.7,
      students: 234,
      instructor: 'Vikram Singh',
      duration: '8 weeks',
      level: 'Intermediate',
      price: 'Free (Skill Exchange)',
      description: 'Photoshop, Illustrator, and InDesign essentials',
      popularity: null
    },
    {
      id: 8,
      name: 'Business Strategy & Marketing',
      category: 'Business',
      rating: 4.8,
      students: 289,
      instructor: 'Arjun Kumar',
      duration: '7 weeks',
      level: 'Intermediate',
      price: 'Free (Skill Exchange)',
      description: 'Market analysis, strategy development, and campaigns',
      popularity: 'trending'
    }
  ];

  // Users for "Connect" tab
  const usersToConnect = [
    {
      id: 1,
      name: 'Arjun Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
      location: 'Bangalore, India',
      rating: 4.9,
      sessions: 45,
      offers: ['Node.js', 'MongoDB', 'Express'],
      wants: ['React', 'TypeScript'],
      matchScore: 96,
      bio: 'Full-stack developer passionate about teaching backend technologies',
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Neha Gupta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
      location: 'Delhi, India',
      rating: 4.7,
      sessions: 32,
      offers: ['Graphic Design', 'Illustrator', 'UI Design'],
      wants: ['Web Development', 'CSS'],
      matchScore: 89,
      bio: 'Creative designer eager to learn web development',
      availability: 'Weekday evenings'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      location: 'Mumbai, India',
      rating: 4.8,
      sessions: 58,
      offers: ['React', 'JavaScript', 'Web Design'],
      wants: ['Python', 'Data Science'],
      matchScore: 94,
      bio: 'React expert looking to dive into data science',
      availability: 'Flexible'
    },
    {
      id: 4,
      name: 'Rohan Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan',
      location: 'Pune, India',
      rating: 4.6,
      sessions: 27,
      offers: ['Digital Marketing', 'SEO', 'Content Strategy'],
      wants: ['Video Editing', 'Motion Graphics'],
      matchScore: 85,
      bio: 'Marketing professional interested in creative skills',
      availability: 'Mornings'
    },
    {
      id: 5,
      name: 'Anjali Reddy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali',
      location: 'Hyderabad, India',
      rating: 4.9,
      sessions: 52,
      offers: ['Python', 'Data Science', 'Machine Learning'],
      wants: ['Photography', 'Video Production'],
      matchScore: 92,
      bio: 'Data scientist with creative interests',
      availability: 'Evenings & Weekends'
    },
    {
      id: 6,
      name: 'Kavya Desai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavya',
      location: 'Ahmedabad, India',
      rating: 4.7,
      sessions: 35,
      offers: ['Photography', 'Video Production', 'Editing'],
      wants: ['UI/UX Design', 'Figma'],
      matchScore: 88,
      bio: 'Professional photographer exploring design',
      availability: 'Flexible'
    }
  ];

  const categories = ['all', 'Programming', 'Design', 'Languages', 'Creative', 'Business'];

  const filteredSkills = skillsToLearn.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartLearning = (skill) => {
    toast.success(`Started learning ${skill.name}! Check your sessions calendar.`);
  };

  const handleConnect = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    toast.success(`Connection request sent to ${selectedUser.name}!`);
    setShowMessageModal(false);
  };

  const handleBookSession = (user) => {
    setSelectedUser(user);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }
    toast.success(`Session booked with ${selectedUser.name}!`);
    setShowBookingModal(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  const tabs = [
    { id: 'learn', label: 'Start Learning', icon: BookOpen, count: filteredSkills.length },
    { id: 'connect', label: 'Connect', icon: Users, count: usersToConnect.length },
    { id: 'book', label: 'Book Session', icon: Calendar, count: usersToConnect.length }
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Personalized Recommendations
            </h2>
            <p className="text-gray-600">Discover skills, connect with learners, and schedule sessions</p>
          </div>
          <div className="flex items-center space-x-1 bg-blue-100 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">AI Powered</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Start Learning Tab */}
        {activeTab === 'learn' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Search & Filters */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 overflow-hidden hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Card Header */}
                    <div className={`p-6 bg-gradient-to-r ${categoryColors[skill.category]?.light || 'from-gray-50 to-gray-100'} border-b border-gray-200`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`h-1 w-12 bg-gradient-to-r ${categoryColors[skill.category]?.bg || 'from-gray-400 to-gray-500'} rounded-full`}></div>
                        {skill.popularity && (
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            skill.popularity === 'trending'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {skill.popularity === 'trending' ? '🔥 Trending' : '✨ New'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.name}</h3>
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      {/* Rating & Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{skill.rating}</span>
                          <span className="text-gray-500">({skill.students} learning)</span>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{skill.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Instructor</p>
                        <p className="font-semibold text-gray-900">{skill.instructor}</p>
                      </div>

                      {/* Button */}
                      <motion.button
                        onClick={() => handleStartLearning(skill)}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Start Learning
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No skills found</h3>
                <p className="text-gray-500">Try adjusting your search or category filters</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Connect Tab */}
        {activeTab === 'connect' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {usersToConnect.map((user, index) => (
                <motion.div
                  key={user.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 overflow-hidden hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-14 h-14 rounded-full border-3 border-white shadow-md"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-md">
                          {user.matchScore}% Match
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-700">{user.bio}</p>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    {/* Rating & Sessions */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{user.rating}</span>
                        </div>
                        <span className="text-gray-500">{user.sessions} sessions</span>
                      </div>
                      <span className="text-xs text-gray-500">{user.availability}</span>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-2">Offers:</p>
                        <div className="flex flex-wrap gap-2">
                          {user.offers.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-2">Wants to Learn:</p>
                        <div className="flex flex-wrap gap-2">
                          {user.wants.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <motion.button
                      onClick={() => handleConnect(user)}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleBookSession(user)}
                      className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-bold hover:from-indigo-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book</span>
                    </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Book Session Tab */}
        {activeTab === 'book' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {usersToConnect.map((user, index) => (
                <motion.div
                  key={user.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 overflow-hidden hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border-3 border-white shadow-md"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.offers.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Booking Info */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-100">
                      <p className="text-sm font-semibold text-purple-900 mb-3">Next Available Slots</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {['Today, 3PM', 'Tomorrow, 10AM', 'Friday, 4PM'].map((slot, idx) => (
                          <button key={idx} className="py-2 px-3 bg-white border border-purple-200 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-50 transition-colors">
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <motion.button
                      onClick={() => handleBookSession(user)}
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-bold hover:from-indigo-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book Session</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Connect with {selectedUser.name}</h3>
              <button onClick={() => setShowMessageModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-600">{selectedUser.location}</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Why connect?</strong> Perfect match for skill exchange! You offer what they want and vice versa.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea
                  placeholder="Hi! I'd love to exchange skills with you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSendMessage}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 font-semibold transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Request</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6 max-h-96 overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Book Session</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-600">{selectedUser.availability}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <motion.button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                        selectedTime === time
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-900">✓ Duration: 60 minutes (flexible)</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 font-semibold transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Confirm</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalizedRecommendations;
