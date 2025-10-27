import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Clock, Star, User } from 'lucide-react';

const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    skill: '',
    category: '',
    location: '',
    availability: '',
    rating: 0,
    experience: ''
  });

  // Dummy skills data
  const skills = [
    { id: 1, name: 'React', category: 'Programming' },
    { id: 2, name: 'Python', category: 'Programming' },
    { id: 3, name: 'Digital Marketing', category: 'Marketing' },
    { id: 4, name: 'Photography', category: 'Creative' },
    { id: 5, name: 'Spanish', category: 'Languages' },
    { id: 6, name: 'Guitar', category: 'Music' },
    { id: 7, name: 'UI/UX Design', category: 'Design' },
    { id: 8, name: 'Fitness Training', category: 'Health' }
  ];

  // Dummy search results
  const results = [
    {
      id: 1,
      full_name: 'Priya Sharma',
      bio: 'Passionate web developer with 5 years of experience. Love teaching React and learning new design patterns.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      rating: 4.8,
      total_sessions: 24,
      location: 'San Francisco, CA',
      offeredSkills: ['React', 'JavaScript', 'Node.js'],
      wantedSkills: ['UI/UX Design', 'Figma', 'Adobe XD']
    },
    {
      id: 2,
      full_name: 'Rohan Patel',
      bio: 'Digital marketing expert and guitar enthusiast. Always excited to share marketing strategies.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan',
      rating: 4.9,
      total_sessions: 31,
      location: 'New York, NY',
      offeredSkills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      wantedSkills: ['Guitar', 'Music Theory', 'Piano']
    },
    {
      id: 3,
      full_name: 'Anjali Reddy',
      bio: 'Professional photographer and Spanish teacher. Love capturing moments and helping others learn languages.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali',
      rating: 4.7,
      total_sessions: 18,
      location: 'Austin, TX',
      offeredSkills: ['Photography', 'Spanish', 'Lightroom'],
      wantedSkills: ['Cooking', 'Yoga', 'Meditation']
    },
    {
      id: 4,
      full_name: 'Arjun Singh',
      bio: 'Full-stack developer and fitness coach. Passionate about clean code and helping people stay healthy.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
      rating: 4.6,
      total_sessions: 27,
      location: 'Seattle, WA',
      offeredSkills: ['Python', 'Django', 'Fitness Training'],
      wantedSkills: ['Data Science', 'Machine Learning', 'AI']
    }
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  const filteredResults = results.filter((profile) => {
    // Search query match
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const hay = `${profile.full_name} ${profile.bio} ${profile.offeredSkills.join(' ')} ${profile.wantedSkills.join(' ')} ${profile.location}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    // Skill filter
    if (filters.skill) {
      const skillList = [...profile.offeredSkills, ...profile.wantedSkills];
      if (!skillList.includes(filters.skill)) return false;
    }

    // Category filter
    if (filters.category) {
      const skillNamesInCat = skills.filter((s) => s.category === filters.category).map((s) => s.name);
      const hasCategory = [...profile.offeredSkills, ...profile.wantedSkills].some((s) => skillNamesInCat.includes(s));
      if (!hasCategory) return false;
    }

    // Rating filter
    if (filters.rating && Number(filters.rating) > 0) {
      if (profile.rating < Number(filters.rating)) return false;
    }

    // Location filter
    if (filters.location) {
      if (!profile.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Search & Filters</h2>
        <Filter className="w-6 h-6 text-gray-500" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users, skills, or expertise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <select
          value={filters.skill}
          onChange={(e) => setFilters({...filters, skill: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">All Skills</option>
          {skills.map(skill => (
            <option key={skill.id} value={skill.name}>{skill.name}</option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filters.rating}
          onChange={(e) => setFilters({...filters, rating: parseInt(e.target.value)})}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value={0}>Any Rating</option>
          <option value={4}>4+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Search Results ({filteredResults.length})</h3>

        <AnimatePresence>
          {filteredResults.map((profile, index) => (
            <motion.div
              key={profile.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {profile.full_name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {profile.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({profile.total_sessions} sessions)
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{profile.bio}</p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Offers: </span>
                      <div className="inline-flex flex-wrap gap-1">
                        {profile.offeredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-700">Wants: </span>
                      <div className="inline-flex flex-wrap gap-1">
                        {profile.wantedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <motion.button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchFilters;
