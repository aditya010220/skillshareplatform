import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Calendar, Star, Award, Search, Filter, Video, Send, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MentorshipProgram = () => {
  const [activeTab, setActiveTab] = useState('find-mentor');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState('60');
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();

  const mentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      title: 'Senior Software Engineer at Google',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-mentor',
      rating: 4.9,
      sessions: 156,
      expertise: ['React', 'System Design', 'Career Growth'],
      bio: 'Former tech lead with 10+ years experience. Passionate about mentoring junior developers.',
      hourlyRate: 75,
      availability: 'Weekends',
      responseTime: '< 2 hours'
    },
    {
      id: 2,
      name: 'Rohan Gupta',
      title: 'UX Design Director',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan-mentor',
      rating: 4.8,
      sessions: 89,
      expertise: ['UI/UX Design', 'Design Systems', 'Product Strategy'],
      bio: 'Award-winning designer who has worked with Fortune 500 companies.',
      hourlyRate: 65,
      availability: 'Evenings',
      responseTime: '< 4 hours'
    },
    {
      id: 3,
      name: 'Anjali Reddy',
      title: 'Data Science Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali-mentor',
      rating: 4.9,
      sessions: 203,
      expertise: ['Python', 'Machine Learning', 'Data Analysis'],
      bio: 'PhD in Computer Science. Specializes in AI/ML and data-driven solutions.',
      hourlyRate: 80,
      availability: 'Flexible',
      responseTime: '< 1 hour'
    }
  ];

  const myMentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-mentor',
      expertise: ['React', 'System Design'],
      nextSession: '2025-01-05 14:00',
      totalSessions: 8,
      status: 'active'
    }
  ];

  const mentees = [
    {
      id: 1,
      name: 'Arjun Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun-mentee',
      level: 'Beginner',
      interests: ['React', 'JavaScript'],
      joinedDate: '2024-12-15',
      progress: 75
    },
    {
      id: 2,
      name: 'Kavya Desai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavya-mentee',
      level: 'Intermediate',
      interests: ['Node.js', 'MongoDB'],
      joinedDate: '2024-12-10',
      progress: 60
    }
  ];

  const tabs = [
    { id: 'find-mentor', label: 'Find Mentor', icon: Search },
    { id: 'my-mentors', label: 'My Mentors', icon: Users },
    { id: 'my-mentees', label: 'My Mentees', icon: Award },
    { id: 'become-mentor', label: 'Become Mentor', icon: Star }
  ];

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const handleSendMessage = (mentor) => {
    setSelectedMentor(mentor);
    setShowMessageModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your session.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Session Booked!",
      description: `Your session with ${selectedMentor?.name} has been scheduled for ${selectedDate} at ${selectedTime}.`,
    });

    setShowBookingModal(false);
    setSelectedDate('');
    setSelectedTime('');
    setSessionDuration('60');
  };

  const handleSendMessageSubmit = () => {
    if (!messageText.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${selectedMentor?.name}.`,
    });

    setShowMessageModal(false);
    setMessageText('');
  };

  const handleApplyMentor = () => {
    toast({
      title: "Application Submitted!",
      description: "Your mentor application has been received. We'll review it and get back to you soon.",
    });
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
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
          <h2 className="text-2xl font-bold text-gray-900">Mentorship Program</h2>
          <p className="text-gray-600">Connect with mentors or guide others in their journey</p>
        </div>
        <div className="flex items-center space-x-1 bg-purple-100 px-3 py-1 rounded-full">
          <Award className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">Premium Feature</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
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
      <div>
        {activeTab === 'find-mentor' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search mentors by expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{mentor.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{mentor.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{mentor.sessions} sessions</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">₹{mentor.hourlyRate * 83}/hr</div>
                      <div className="text-xs text-gray-500">{mentor.responseTime}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{mentor.bio}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Available: {mentor.availability}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleSendMessage(mentor)}
                        className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                      <button 
                        onClick={() => handleBookSession(mentor)}
                        className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Session</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my-mentors' && (
          <div className="space-y-6">
            {myMentors.length > 0 ? (
              myMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.expertise.join(', ')}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                      {mentor.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{mentor.totalSessions}</div>
                      <div className="text-xs text-gray-500">Total Sessions</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {new Date(mentor.nextSession).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">Next Session</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {new Date(mentor.nextSession).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div className="text-xs text-gray-500">Time</div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Video className="w-4 h-4" />
                      <span>Join Session</span>
                    </button>
                    <button 
                      onClick={() => handleSendMessage(mentor)}
                      className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                      <Calendar className="w-4 h-4" />
                      <span>Reschedule</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mentors Yet</h3>
                <p className="text-gray-600 mb-4">Start your mentorship journey by finding a mentor</p>
                <button
                  onClick={() => setActiveTab('find-mentor')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Find a Mentor
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-mentees' && (
          <div className="space-y-6">
            {mentees.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mentees.map((mentee, index) => (
                  <motion.div
                    key={mentee.id}
                    className="bg-white rounded-xl shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={mentee.avatar}
                        alt={mentee.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{mentee.name}</h3>
                        <p className="text-sm text-gray-600">{mentee.level} Level</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">{mentee.progress}%</div>
                        <div className="text-xs text-gray-500">Progress</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Learning Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentee.interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Progress</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${mentee.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleSendMessage(mentee)}
                        className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mentees Yet</h3>
                <p className="text-gray-600 mb-4">Start mentoring others by becoming a mentor</p>
                <button
                  onClick={() => setActiveTab('become-mentor')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Become a Mentor
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'become-mentor' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Become a Mentor</h3>
              <p className="text-gray-600">Share your expertise and help others grow in their skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">₹4,150-8,300/hr</div>
                <div className="text-sm text-gray-600">Average Earnings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Flexible</div>
                <div className="text-sm text-gray-600">Schedule</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Impact</div>
                <div className="text-sm text-gray-600">Make a Difference</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['React', 'Python', 'Design', 'Marketing', 'Data Science', 'Mobile', 'Backend', 'DevOps'].map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                <input
                  type="number"
                  placeholder="Enter your hourly rate"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your experience and what you can teach..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={handleApplyMentor}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Apply to Become a Mentor
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Book Session</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={selectedMentor?.avatar}
                  alt={selectedMentor?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedMentor?.name}</h4>
                  <p className="text-sm text-gray-600">₹{selectedMentor?.hourlyRate ? selectedMentor.hourlyRate * 83 : 0}/hr</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Duration
                </label>
                <select
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={selectedMentor?.avatar}
                  alt={selectedMentor?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedMentor?.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedMentor?.title || `${selectedMentor?.level} Level`}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessageSubmit}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MentorshipProgram;
