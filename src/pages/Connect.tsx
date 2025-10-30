import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Video, Calendar, Star, MapPin, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Connect = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Dummy data for people to connect with (Indian data)
  const people = [
    {
      id: 1,
      name: 'Priya Sharma',
      title: 'Full-Stack Developer & UI/UX Designer',
      bio: 'Full-stack developer from Mumbai who loves teaching React and improving product UX. Available for mentorship and pair-programming.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya_sharma',
      rating: 4.9,
      sessions: 28,
      location: 'Mumbai, MH',
      skills: {
        teaching: ['React', 'JavaScript', 'Node.js', 'UI/UX Design'],
        learning: ['Data Science', 'DevOps', 'Figma']
      },
      badges: ['Top Mentor', 'Community Helper', 'React Expert'],
      availability: 'Available now',
      languages: ['English', 'Hindi', 'Marathi']
    },
    {
      id: 2,
      name: 'Rohan Patel',
      title: 'Digital Marketing Specialist & Guitar Enthusiast',
      bio: 'Bengaluru-based digital marketer who also teaches basic guitar. Loves combining creativity with data-driven marketing.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan_patel',
      rating: 4.8,
      sessions: 35,
      location: 'Bengaluru, KA',
      skills: {
        teaching: ['Digital Marketing', 'SEO', 'Content Strategy', 'Guitar'],
        learning: ['Python', 'Data Analysis', 'Photography']
      },
      badges: ['Marketing Guru', 'Music Mentor'],
      availability: 'Available tomorrow',
      languages: ['English', 'Kannada', 'Hindi']
    },
    {
      id: 3,
      name: 'Anjali Reddy',
      title: 'Professional Photographer & Language Coach',
      bio: 'Photographer from Hyderabad with experience in teaching composition and photo-editing. Offers lessons and portfolio reviews.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali_reddy',
      rating: 4.7,
      sessions: 22,
      location: 'Hyderabad, TG',
      skills: {
        teaching: ['Photography', 'Lightroom', 'Storytelling'],
        learning: ['Video Editing', 'Cooking', 'Spanish']
      },
      badges: ['Photo Pro', 'Portfolio Coach'],
      availability: 'Available in 2 hours',
      languages: ['English', 'Telugu', 'Hindi']
    },
    {
      id: 4,
      name: 'Arjun Singh',
      title: 'Software Engineer & Fitness Coach',
      bio: 'Pune-based engineer who mentors on backend systems and also runs fitness workshops on weekends.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun_singh',
      rating: 4.6,
      sessions: 31,
      location: 'Pune, MH',
      skills: {
        teaching: ['Python', 'Django', 'Fitness Training', 'APIs'],
        learning: ['React Native', 'Machine Learning', 'Meditation']
      },
      badges: ['Code Mentor', 'Fitness Pro'],
      availability: 'Available this evening',
      languages: ['English', 'Hindi', 'Marathi']
    },
    {
      id: 5,
      name: 'Neha Gupta',
      title: 'Business Consultant & Illustrator',
      bio: 'Delhi-based consultant who helps startups with business strategy and also teaches digital illustration.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha_gupta',
      rating: 4.9,
      sessions: 19,
      location: 'New Delhi, DL',
      skills: {
        teaching: ['Business Strategy', 'Illustration', 'Public Speaking'],
        learning: ['Animation', 'French', 'UI/UX']
      },
      badges: ['Startup Mentor', 'Creative Lead'],
      availability: 'Available now',
      languages: ['English', 'Hindi']
    },
    {
      id: 6,
      name: 'Vikram Singh',
      title: 'Chef & Culinary Instructor',
      bio: 'Kolkata-based chef skilled in regional Indian cuisines, loves teaching home-cooking techniques and fusion recipes.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram_singh',
      rating: 4.8,
      sessions: 26,
      location: 'Kolkata, WB',
      skills: {
        teaching: ['Indian Cooking', 'Baking', 'Food Styling'],
        learning: ['Food Photography', 'Nutrition']
      },
      badges: ['Master Chef', 'Food Educator'],
      availability: 'Available weekends',
      languages: ['English', 'Bengali', 'Hindi']
    }
  ];

  const categories = ['Programming', 'Design', 'Marketing', 'Languages', 'Creative', 'Business', 'Health'];
  const locations = ['Mumbai, MH', 'Bengaluru, KA', 'New Delhi, DL', 'Pune, MH', 'Hyderabad, TG', 'Kolkata, WB'];

  const { toast } = useToast();
  const [requestsSent, setRequestsSent] = useState<number[]>([]);

  const handleConnect = (person: any) => {
    if (requestsSent.includes(person.id)) return;
    setRequestsSent(prev => [...prev, person.id]);
    toast({ title: 'Request was sent', description: `Your mentorship request was sent to ${person.name}.` });
  };

  const handleMessage = (person: any) => {
    // navigate to chat with selected member
    navigate('/chat', { state: { selectedMember: { full_name: person.name, id: person.id } } });
  };

  const handleVideoCall = (person: any) => {
    // Open Google Meet new meeting in a new tab (fallback to Zoom if preferred)
    toast({ title: 'Starting meeting', description: `Opening a Google Meet for you and ${person.name}...` });
    window.open('https://meet.google.com/new', '_blank', 'noopener');
  };

  const handleSchedule = (person: any) => {
    // Redirect to dashboard and open calendar with the selected member
    navigate('/dashboard', { state: { openCalendar: true, selectedMember: person } });
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
                  disabled={requestsSent.includes(person.id)}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${requestsSent.includes(person.id) ? 'bg-gray-200 text-gray-600 cursor-default' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {requestsSent.includes(person.id) ? 'Request Sent' : 'Connect'}
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
