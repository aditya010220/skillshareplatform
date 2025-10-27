import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Star, MessageCircle, Calendar, Search, Filter, MapPin, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Dummy community data (India)
  const communityMembers = [
    {
      id: 1,
      name: 'Priya Sharma',
      title: 'Full-Stack Developer',
      bio: 'Passionate about web development and helping others learn coding. 5+ years experience in React and Node.js.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-sharma',
      rating: 4.9,
      totalSessions: 45,
      location: 'Mumbai, India',
      badges: ['Top Teacher', 'Mentor', 'Expert'],
      skills: ['React', 'JavaScript', 'Node.js', 'UI/UX'],
      joinedDate: '2023-01-15',
      isOnline: true
    },
    {
      id: 2,
      name: 'Rohan Patel',
      title: 'Digital Marketing Specialist',
      bio: 'Marketing expert with a passion for data-driven strategies. Loves sharing knowledge about SEO and growth.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan-patel',
      rating: 4.8,
      totalSessions: 38,
      location: 'Bengaluru, India',
      badges: ['Marketing Guru', 'Community Helper'],
      skills: ['SEO', 'Content Marketing', 'Analytics', 'Growth'],
      joinedDate: '2023-02-20',
      isOnline: true
    },
    {
      id: 3,
      name: 'Anjali Reddy',
      title: 'Photographer & Language Teacher',
      bio: 'Professional photographer and language teacher. Passionate about visual storytelling and languages.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali-reddy',
      rating: 4.7,
      totalSessions: 52,
      location: 'Hyderabad, India',
      badges: ['Photography Pro', 'Language Expert'],
      skills: ['Photography', 'Spanish', 'Lightroom', 'Editing'],
      joinedDate: '2022-11-10',
      isOnline: false
    },
    {
      id: 4,
      name: 'Arjun Singh',
      title: 'Data Scientist & Fitness Coach',
      bio: 'Data scientist and fitness enthusiast. Combining tech skills with health and wellness expertise.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun-singh',
      rating: 4.6,
      totalSessions: 29,
      location: 'Delhi, India',
      badges: ['Data Expert', 'Fitness Coach'],
      skills: ['Python', 'Machine Learning', 'Fitness Training', 'Nutrition'],
      joinedDate: '2023-03-05',
      isOnline: true
    },
    {
      id: 5,
      name: 'Neha Kapoor',
      title: 'Business Consultant & Artist',
      bio: 'Helping businesses grow while pursuing creative passions. Loves strategy and creativity.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha-kapoor',
      rating: 4.9,
      totalSessions: 41,
      location: 'Pune, India',
      badges: ['Business Expert', 'Creative Soul', 'Mentor'],
      skills: ['Business Strategy', 'Design', 'Public Speaking', 'Art'],
      joinedDate: '2022-12-01',
      isOnline: false
    },
    {
      id: 6,
      name: 'Vikram Joshi',
      title: 'Chef & Culinary Instructor',
      bio: 'Professional chef with years of experience. Passionate about teaching regional cuisines and techniques.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram-joshi',
      rating: 4.8,
      totalSessions: 67,
      location: 'Chennai, India',
      badges: ['Master Chef', 'Food Educator', 'Top Rated'],
      skills: ['Cooking', 'Indian Cuisine', 'Food Photography', 'Nutrition'],
      joinedDate: '2022-08-15',
      isOnline: true
    }
  ];

  const categories = ['All', 'Programming', 'Design', 'Marketing', 'Languages', 'Creative', 'Business', 'Health'];
  const locations = ['All', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Miami, FL'];

  const filteredMembers = communityMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'All' ||
                           member.skills.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesLocation = !selectedLocation || selectedLocation === 'All' || member.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleConnect = (member: any) => {
    console.log('Connecting with:', member.name);
    // Navigate to chat with this member
    navigate('/chat', { state: { selectedMember: member } });
  };

  const handleMessage = (member: any) => {
    console.log('Messaging:', member.name);
    // Navigate to chat with this member
    navigate('/chat', { state: { selectedMember: member } });
  };

  const handleSchedule = (member: any) => {
    console.log('Scheduling with:', member.name);
    // Here you would implement the scheduling logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <motion.header
        className="bg-white shadow-lg border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Community
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{communityMembers.filter(m => m.isOnline).length} members online</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {communityMembers.length}
            </div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {communityMembers.reduce((sum, member) => sum + member.totalSessions, 0)}
            </div>
            <div className="text-gray-600">Total Sessions</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {[...new Set(communityMembers.flatMap(member => member.skills))].length}
            </div>
            <div className="text-gray-600">Skills Available</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {communityMembers.filter(m => m.isOnline).length}
            </div>
            <div className="text-gray-600">Online Now</div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search members by name or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Profile Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full border-4 border-blue-500"
                  />
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{member.rating}</span>
                    <span>•</span>
                    <span>{member.totalSessions} sessions</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4 text-sm">{member.bio}</p>

              {/* Location */}
              <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{member.location}</span>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{member.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {member.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center space-x-1"
                  >
                    <Award className="w-3 h-3" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <motion.button
                  onClick={() => handleConnect(member)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect
                </motion.button>
                
                <motion.button
                  onClick={() => handleMessage(member)}
                  className="border border-gray-300 text-gray-700 py-2 px-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleSchedule(member)}
                  className="border border-gray-300 text-gray-700 py-2 px-3 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
