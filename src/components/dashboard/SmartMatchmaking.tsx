
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Filter, MapPin, Clock, Star, RefreshCw } from 'lucide-react';

const SmartMatchmaking = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    availability: ''
  });

  // Enhanced dummy data with more matches
  const matches = [
    {
      id: 1,
      full_name: 'Sarah Johnson',
      bio: 'Passionate web developer with 5 years of experience. Love teaching React and learning new design patterns.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 4.8,
      total_sessions: 24,
      location: 'San Francisco, CA',
      offeredSkills: ['React', 'JavaScript', 'Node.js'],
      wantedSkills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      availability: 'Evenings & Weekends'
    },
    {
      id: 2,
      full_name: 'Mike Chen',
      bio: 'Digital marketing expert and guitar enthusiast. Always excited to share marketing strategies and learn new instruments.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      rating: 4.9,
      total_sessions: 31,
      location: 'New York, NY',
      offeredSkills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      wantedSkills: ['Guitar', 'Music Theory', 'Piano'],
      availability: 'Flexible'
    },
    {
      id: 3,
      full_name: 'Emily Rodriguez',
      bio: 'Professional photographer and Spanish teacher. Love capturing moments and helping others learn languages.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      rating: 4.7,
      total_sessions: 18,
      location: 'Austin, TX',
      offeredSkills: ['Photography', 'Spanish', 'Lightroom'],
      wantedSkills: ['Cooking', 'Yoga', 'Meditation'],
      availability: 'Weekdays'
    },
    {
      id: 4,
      full_name: 'David Kim',
      bio: 'Full-stack developer and fitness coach. Passionate about clean code and helping people stay healthy.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      rating: 4.6,
      total_sessions: 27,
      location: 'Seattle, WA',
      offeredSkills: ['Python', 'Django', 'Fitness Training'],
      wantedSkills: ['Data Science', 'Machine Learning', 'AI'],
      availability: 'Mornings'
    },
    {
      id: 5,
      full_name: 'Jessica Wang',
      bio: 'UX designer with a passion for creating intuitive user experiences. Also love teaching Mandarin Chinese.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica',
      rating: 4.9,
      total_sessions: 35,
      location: 'Los Angeles, CA',
      offeredSkills: ['UI/UX Design', 'Figma', 'Mandarin Chinese'],
      wantedSkills: ['Flutter', 'Mobile Development', 'Swift'],
      availability: 'Evenings'
    },
    {
      id: 6,
      full_name: 'Carlos Mendoza',
      bio: 'Backend engineer and salsa dance instructor. Love building scalable systems and teaching Latin dance.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      rating: 4.8,
      total_sessions: 22,
      location: 'Miami, FL',
      offeredSkills: ['Java', 'Spring Boot', 'Salsa Dancing'],
      wantedSkills: ['DevOps', 'Kubernetes', 'AWS'],
      availability: 'Weekends'
    },
    {
      id: 7,
      full_name: 'Aisha Patel',
      bio: 'Data scientist and yoga instructor. Passionate about turning data into insights and helping others find balance.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha',
      rating: 4.7,
      total_sessions: 19,
      location: 'Chicago, IL',
      offeredSkills: ['Data Science', 'Python', 'Yoga'],
      wantedSkills: ['Graphic Design', 'Photoshop', 'Illustrator'],
      availability: 'Flexible'
    },
    {
      id: 8,
      full_name: 'Marcus Thompson',
      bio: 'Cybersecurity expert and chess enthusiast. Dedicated to making the digital world safer and strategic thinking.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
      rating: 4.9,
      total_sessions: 28,
      location: 'Boston, MA',
      offeredSkills: ['Cybersecurity', 'Ethical Hacking', 'Chess'],
      wantedSkills: ['Blockchain', 'Cryptocurrency', 'Trading'],
      availability: 'Evenings & Weekends'
    },
    {
      id: 9,
      full_name: 'Lisa Chang',
      bio: 'Product manager and French language tutor. Love building great products and sharing the beauty of French culture.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      rating: 4.8,
      total_sessions: 33,
      location: 'Portland, OR',
      offeredSkills: ['Product Management', 'French', 'Agile'],
      wantedSkills: ['Video Editing', 'After Effects', 'Motion Graphics'],
      availability: 'Weekdays'
    },
    {
      id: 10,
      full_name: 'Ahmed Hassan',
      bio: 'Mobile app developer and Arabic teacher. Enjoy creating innovative mobile solutions and preserving language heritage.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
      rating: 4.6,
      total_sessions: 21,
      location: 'Houston, TX',
      offeredSkills: ['React Native', 'iOS Development', 'Arabic'],
      wantedSkills: ['Game Development', 'Unity', '3D Modeling'],
      availability: 'Mornings & Evenings'
    }
  ];

  const handleSwipe = (direction: 'like' | 'pass') => {
    if (direction === 'like') {
      console.log('Liked user:', matches[currentIndex]);
      // In a real app, this would send a match request
    }
    
    setCurrentIndex(prev => (prev + 1) % matches.length);
  };

  const handleRefresh = () => {
    setCurrentIndex(0);
  };

  const currentMatch = matches[currentIndex];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Matches</h2>
          <p className="text-gray-600">Discover perfect skill exchange partners</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div
          key={currentMatch.id}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-gray-200 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-6 mb-6">
            <img
              src={currentMatch.avatar_url}
              alt="Match"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentMatch.full_name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{currentMatch.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>{currentMatch.total_sessions} sessions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{currentMatch.location}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{currentMatch.availability}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6 p-4 bg-white/70 rounded-lg leading-relaxed">
            {currentMatch.bio}
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                Skills Offered
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentMatch.offeredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                Wants to Learn
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentMatch.wantedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-8">
            <motion.button
              onClick={() => handleSwipe('pass')}
              className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={() => handleSwipe('like')}
              className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-8 h-8" />
            </motion.button>
          </div>
        </motion.div>

        <div className="flex justify-center mt-6 space-x-2">
          <div className="text-center text-sm text-gray-500">
            {currentIndex + 1} of {matches.length} matches
          </div>
        </div>

        {/* Match indicators */}
        <div className="flex justify-center mt-4 space-x-1">
          {matches.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex % 5 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SmartMatchmaking;
