import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, X } from 'lucide-react';

const SessionCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [newSessionDate, setNewSessionDate] = useState('');
  const [newSessionTime, setNewSessionTime] = useState('');

  // Reduced dummy sessions data
  const sessions = [
    // Future sessions
    {
      id: 1,
      title: 'React Fundamentals',
      scheduled_at: '2025-01-25T14:00:00Z',
      duration: 60,
      status: 'scheduled',
      meeting_link: 'https://meet.google.com/abc-def-ghi',
      partner: 'Priya Sharma',
      offered_skill: 'React',
      requested_skill: 'UI/UX Design',
      partner_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya'
    },
    {
      id: 2,
      title: 'Spanish Conversation',
      scheduled_at: '2025-01-28T16:30:00Z',
      duration: 45,
      status: 'scheduled',
      meeting_link: 'https://zoom.us/j/123456789',
      partner: 'Anjali Reddy',
      offered_skill: 'Spanish',
      requested_skill: 'Photography',
      partner_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali'
    },
    {
      id: 3,
      title: 'Python Workshop',
      scheduled_at: '2025-02-05T10:00:00Z',
      duration: 120,
      status: 'scheduled',
      meeting_link: 'https://meet.google.com/xyz-abc-def',
      partner: 'Arjun Singh',
      offered_skill: 'Python',
      requested_skill: 'UI Design',
      partner_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun'
    },
    // Past sessions
    {
      id: 4,
      title: 'Photography Basics',
      scheduled_at: '2025-01-18T10:00:00Z',
      duration: 90,
      status: 'completed',
      partner: 'Anjali Reddy',
      offered_skill: 'Photography',
      requested_skill: 'Digital Marketing',
      partner_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali',
      rating: 5,
      feedback: 'Excellent session! Learned so much about composition and lighting.'
    },
    {
      id: 5,
      title: 'Web Development Basics',
      scheduled_at: '2025-01-12T14:30:00Z',
      duration: 120,
      status: 'completed',
      partner: 'Vikram Singh',
      offered_skill: 'Web Development',
      requested_skill: 'Design',
      partner_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
      rating: 4,
      feedback: 'Great introduction to backend development!'
    }
  ];

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleScheduleSession = () => {
    if (!newSessionDate || !newSessionTime) {
      alert('Please select both date and time');
      return;
    }
    alert(`✅ Session scheduled for ${newSessionDate} at ${newSessionTime}`);
    setShowScheduleModal(false);
    setNewSessionDate('');
    setNewSessionTime('');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'scheduled': return { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: Calendar,
        description: 'Upcoming session'
      };
      case 'in_progress': return { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: Video,
        description: 'Session in progress'
      };
      case 'completed': return { 
        color: 'bg-purple-100 text-purple-800 border-purple-200', 
        icon: CheckCircle,
        description: 'Session completed'
      };
      case 'cancelled': return { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: AlertCircle,
        description: 'Session cancelled'
      };
      default: return { 
        color: 'bg-gray-100 text-gray-800 border-gray-200', 
        icon: Calendar,
        description: 'Unknown status'
      };
    }
  };

  const now = new Date();
  const upcomingSessions = sessions.filter(session => 
    new Date(session.scheduled_at) > now
  ).sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

  const pastSessions = sessions.filter(session => 
    new Date(session.scheduled_at) <= now
  ).sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());

  const getFilteredSessions = () => {
    switch (viewMode) {
      case 'upcoming': return upcomingSessions;
      case 'past': return pastSessions;
      case 'all': return sessions.sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());
      default: return upcomingSessions;
    }
  };

  const filteredSessions = getFilteredSessions();

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Session Calendar</h2>
          <p className="text-gray-600">Manage your learning sessions</p>
        </div>
        <div className="flex space-x-2">
          {['upcoming', 'past', 'all'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-4 py-2 rounded-lg text-sm capitalize font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {mode} ({mode === 'upcoming' ? upcomingSessions.length : mode === 'past' ? pastSessions.length : sessions.length})
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <motion.button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <h3 className="text-lg font-semibold text-gray-900">
          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <motion.button
          onClick={handleNextMonth}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {viewMode} sessions
            </h3>
            <p className="text-gray-500">
              {viewMode === 'upcoming' && "You don't have any upcoming sessions scheduled."}
              {viewMode === 'past' && "No past sessions found."}
              {viewMode === 'all' && "No sessions found."}
            </p>
          </div>
        ) : (
          filteredSessions.map((session, index) => {
            const statusConfig = getStatusConfig(session.status);
            const StatusIcon = statusConfig.icon;
            const sessionDate = new Date(session.scheduled_at);
            const isPast = sessionDate <= now;
            
            return (
              <motion.div
                key={session.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Partner Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={session.partner_avatar}
                        alt={session.partner}
                        className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Session Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {session.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {session.status}
                        </span>
                      </div>
                      
                      {/* Session Details */}
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {sessionDate.toLocaleDateString()} at{' '}
                              {sessionDate.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>with {session.partner}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{session.duration} minutes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Teaching: {session.offered_skill}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Learning: {session.requested_skill}
                          </span>
                        </div>
                      </div>

                      {/* Past Session Feedback */}
                      {isPast && session.feedback && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-purple-800">Your Feedback:</span>
                            {session.rating && (
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-xs ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-purple-700 italic">"{session.feedback}"</p>
                        </div>
                      )}

                      {/* Cancellation Reason */}
                      {session.status === 'cancelled' && session.cancellation_reason && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <p className="text-sm text-red-700">
                            <strong>Cancelled:</strong> {session.cancellation_reason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    {!isPast && session.status === 'scheduled' && (
                      <>
                        {session.meeting_link && (
                          <motion.button
                            onClick={() => window.open(session.meeting_link, '_blank')}
                            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center space-x-2 text-sm font-medium shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Video className="w-4 h-4" />
                            <span>Join</span>
                          </motion.button>
                        )}
                        <motion.button
                          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium shadow-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Reschedule
                        </motion.button>
                      </>
                    )}

                    {isPast && session.status === 'completed' && !session.rating && (
                      <motion.button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors text-sm font-medium shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Rate Session
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <motion.button
          onClick={() => setShowScheduleModal(true)}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Schedule New Session
        </motion.button>
        <motion.button
          onClick={() => setShowCalendarView(!showCalendarView)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showCalendarView ? 'Hide Calendar' : 'View Calendar'}
        </motion.button>
      </div>

      {/* Session Statistics */}
      {sessions.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-4">Session Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{upcomingSessions.length}</div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{pastSessions.filter(s => s.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{sessions.filter(s => s.status === 'cancelled').length}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{sessions.reduce((total, s) => total + s.duration, 0)}</div>
              <div className="text-sm text-gray-600">Total Minutes</div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule New Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Schedule New Session</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newSessionDate}
                  onChange={(e) => setNewSessionDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newSessionTime}
                  onChange={(e) => setNewSessionTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  placeholder="60"
                  min="15"
                  max="180"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleScheduleSession}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Calendar Grid View */}
      {showCalendarView && (
        <motion.div
          className="mt-8 p-6 bg-white rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="font-semibold text-gray-900 mb-4">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Calendar
          </h4>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-gray-700 p-2 text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, index) => {
              const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
              const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
              let dayNumber = index - firstDay + 1;

              const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
              const hasSession = isCurrentMonth && sessions.some(session => {
                const sessionDate = new Date(session.scheduled_at);
                return sessionDate.getDate() === dayNumber &&
                  sessionDate.getMonth() === selectedDate.getMonth() &&
                  sessionDate.getFullYear() === selectedDate.getFullYear();
              });

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center text-sm font-medium transition-colors ${
                    isCurrentMonth
                      ? hasSession
                        ? 'bg-blue-100 text-blue-900 border-2 border-blue-500'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                      : 'bg-transparent text-gray-300'
                  }`}
                >
                  {isCurrentMonth && dayNumber}
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              📌 Highlighted dates have scheduled sessions
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SessionCalendar;
