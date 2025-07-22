
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Video, Calendar, Star, MapPin, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Connect = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Dummy data for people to connect with
  const people = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Full-Stack Developer & UI/UX Designer',
      bio: 'Passionate about creating beautiful and functional web applications. Love teaching React and learning new design trends.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 4.9,
      sessions: 28,
      location: 'San Francisco, CA',
      skills: {
        teaching: ['React', 'JavaScript', 'Node.js', 'UI/UX Design'],
        learning: ['Python', 'Data Science', 'Machine Learning']
      },
      badges: ['Expert Teacher', 'Community Helper', 'Top Rated'],
      availability: 'Available now',
      languages: ['English', 'Spanish']
    },
    {
      id: 2,
      name: 'Mike Chen',
      title: 'Digital Marketing Specialist & Musician',
      bio: 'Marketing professional by day, music enthusiast by night. Love sharing marketing strategies and learning new instruments.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      rating: 4.8,
      sessions: 35,
      location: 'New York, NY',
      skills: {
        teaching: ['Digital Marketing', 'SEO', 'Content Strategy', 'Guitar'],
        learning: ['Piano', 'Music Production', 'Photography']
      },
      badges: ['Marketing Guru', 'Music Mentor'],
      availability: 'Available tomorrow',
      languages: ['English', 'Mandarin']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Professional Photographer & Language Teacher',
      bio: 'Capturing moments and teaching languages are my passions. Always excited to help others see the world through different lenses.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      rating: 4.7,
      sessions: 22,
      location: 'Austin, TX',
      skills: {
        teaching: ['Photography', 'Spanish', 'Adobe Lightroom', 'Travel Planning'],
        learning: ['Video Editing', 'Cooking', 'Yoga']
      },
      badges: ['Photo Pro', 'Language Expert'],
      availability: 'Available in 2 hours',
      languages: ['English', 'Spanish', 'Portuguese']
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Software Engineer & Fitness Coach',
      bio: 'Clean code and clean living! I help people write better code and live healthier lives through fitness and nutrition.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      rating: 4.6,
      sessions: 31,
      location: 'Seattle, WA',
      skills: {
        teaching: ['Python', 'Django', 'Fitness Training', 'Nutrition'],
        learning: ['React Native', 'AI/ML', 'Meditation']
      },
      badges: ['Code Master', 'Fitness Pro'],
      availability: 'Available this evening',
      languages: ['English', 'Korean']
    },
    {
      id: 5,
      name: 'Anna Williams',
      title: 'Business Consultant & Artist',
      bio: 'Helping businesses grow while pursuing my passion for art. Love the intersection of creativity and strategy.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
      rating: 4.9,
      sessions: 19,
      location: 'Chicago, IL',
      skills: {
        teaching: ['Business Strategy', 'Watercolor Painting', 'Public Speaking'],
        learning: ['Digital Art', 'Animation', 'French']
      },
      badges: ['Business Expert', 'Creative Soul'],
      availability: 'Available now',
      languages: ['English']
    },
    {
      id: 6,
      name: 'Carlos Martinez',
      title: 'Chef & Culinary Instructor',
      bio: 'Bringing flavors to life! Professional chef who loves teaching cooking techniques and exploring world cuisines.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      rating: 4.8,
      sessions: 26,
      location: 'Miami, FL',
      skills: {
        teaching: ['Cooking', 'Baking', 'Food Photography', 'Restaurant Management'],
        learning: ['Wine Pairing', 'Food Blogging', 'Italian']
      },
      badges: ['Master Chef', 'Food Educator'],
      availability: 'Available weekends',
      languages: ['English', 'Spanish']
    }
  ];

  const categories = ['Programming', 'Design', 'Marketing', 'Languages', 'Creative', 'Business', 'Health'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Miami, FL'];

  const handleConnect = (person: any) => {
    console.log('Connecting with:', person.name);
    // Here you would implement the connection logic
  };

  const handleMessage = (person: any) => {
    console.log('Messaging:', person.name);
    // Here you would implement the messaging logic
  };

  const handleVideoCall = (person: any) => {
    console.log('Video calling:', person.name);
    // Here you would implement the video call logic
  };

  const handleSchedule = (person: any) => {
    console.log('Scheduling with:', person.name);
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Connect & Learn
              </h1>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, skill, or expertise..."
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
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* People Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {people.map((person, index) => (
            <motion.div
              key={person.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Profile Header */}
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {person.availability}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-1">{person.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{person.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{person.sessions} sessions</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{person.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4">{person.bio}</p>

              {/* Skills */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-sm font-semibold text-gray-900 mb-2 block">Can Teach:</span>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.teaching.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 mb-2 block">Wants to Learn:</span>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.learning.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {person.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-900 mr-2">Languages:</span>
                <span className="text-sm text-gray-600">{person.languages.join(', ')}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => handleConnect(person)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect
                </motion.button>
                
                <motion.button
                  onClick={() => handleMessage(person)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleVideoCall(person)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Call</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleSchedule(person)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connect;
