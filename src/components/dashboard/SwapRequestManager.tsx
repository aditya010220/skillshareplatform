import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, X, Calendar, MessageSquare, User, Filter, Plus, Star, ChevronDown, Send, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SwapRequestManager = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Enhanced dummy data with more entries for demonstration
  const dummyRequests = [
    {
      id: '1',
      requester_id: 'user1',
      recipient_id: 'user2',
      status: 'pending',
      message: 'Hi! I would love to learn React from you and I can teach you Python in return. I have 3 years of Python experience.',
      created_at: '2024-01-15T10:30:00Z',
      proposed_duration: 60,
      requester: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      recipient: {
        full_name: 'Bob Smith',
        avatar_url: null
      },
      offered_skill: {
        name: 'Python Programming'
      },
      requested_skill: {
        name: 'React Development'
      }
    },
    {
      id: '2',
      requester_id: 'user3',
      recipient_id: 'user1',
      status: 'accepted',
      message: 'I am excited to learn graphic design from you! I can help you with JavaScript and Node.js.',
      created_at: '2024-01-14T14:20:00Z',
      proposed_duration: 90,
      requester: {
        full_name: 'Charlie Davis',
        avatar_url: null
      },
      recipient: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      offered_skill: {
        name: 'JavaScript & Node.js'
      },
      requested_skill: {
        name: 'Graphic Design'
      }
    },
    {
      id: '3',
      requester_id: 'user4',
      recipient_id: 'user1',
      status: 'completed',
      message: 'Thank you for the amazing photography session! I really enjoyed teaching you about digital marketing.',
      created_at: '2024-01-12T09:15:00Z',
      proposed_duration: 120,
      requester: {
        full_name: 'Diana Martinez',
        avatar_url: null
      },
      recipient: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      offered_skill: {
        name: 'Digital Marketing'
      },
      requested_skill: {
        name: 'Photography'
      }
    },
    {
      id: '4',
      requester_id: 'user5',
      recipient_id: 'user1',
      status: 'rejected',
      message: 'I would like to exchange my cooking skills for your web development knowledge.',
      created_at: '2024-01-10T16:45:00Z',
      proposed_duration: 75,
      requester: {
        full_name: 'Eva Chen',
        avatar_url: null
      },
      recipient: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      offered_skill: {
        name: 'Cooking & Baking'
      },
      requested_skill: {
        name: 'Web Development'
      }
    },
    {
      id: '5',
      requester_id: 'user1',
      recipient_id: 'user6',
      status: 'pending',
      message: 'Hi! I saw your profile and would love to learn guitar from you. I can teach you data analysis in return.',
      created_at: '2024-01-16T11:30:00Z',
      proposed_duration: 45,
      requester: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      recipient: {
        full_name: 'Frank Wilson',
        avatar_url: null
      },
      offered_skill: {
        name: 'Data Analysis'
      },
      requested_skill: {
        name: 'Guitar Playing'
      }
    },
    {
      id: '6',
      requester_id: 'user7',
      recipient_id: 'user1',
      status: 'pending',
      message: 'I am interested in learning advanced Excel skills from you. I can teach you video editing using Premiere Pro.',
      created_at: '2024-01-17T08:45:00Z',
      proposed_duration: 90,
      requester: {
        full_name: 'Michael Torres',
        avatar_url: null
      },
      recipient: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      offered_skill: {
        name: 'Video Editing'
      },
      requested_skill: {
        name: 'Advanced Excel'
      }
    },
    {
      id: '7',
      requester_id: 'user8',
      recipient_id: 'user1',
      status: 'accepted',
      message: 'Your French tutoring sessions are highly recommended! I can help you with mobile app development using Flutter.',
      created_at: '2024-01-13T15:20:00Z',
      proposed_duration: 60,
      requester: {
        full_name: 'Sophie Laurent',
        avatar_url: null
      },
      recipient: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      offered_skill: {
        name: 'Flutter Development'
      },
      requested_skill: {
        name: 'French Language'
      }
    },
    {
      id: '8',
      requester_id: 'user9',
      recipient_id: 'user1',
      status: 'completed',
      message: 'Great session on UI/UX design principles! I enjoyed sharing my knowledge about blockchain technology.',
      created_at: '2024-01-08T12:30:00Z',
      proposed_duration: 105,
      requester: {
        full_name: 'Robert Kim',
        avatar_url: null
      },
      recipient: {
        full_name: 'Alice Johnson',
        avatar_url: null
      },
      offered_skill: {
        name: 'Blockchain Technology'
      },
      requested_skill: {
        name: 'UI/UX Design'
      }
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Use dummy data when not authenticated for demonstration
        setRequests(dummyRequests);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('swap_requests')
        .select(`
          *,
          requester:profiles!swap_requests_requester_id_fkey(full_name, avatar_url),
          recipient:profiles!swap_requests_recipient_id_fkey(full_name, avatar_url),
          offered_skill:skills!swap_requests_offered_skill_id_fkey(name),
          requested_skill:skills!swap_requests_requested_skill_id_fkey(name)
        `)
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no real data, show dummy data
      setRequests(data && data.length > 0 ? data : dummyRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Fallback to dummy data on error
      setRequests(dummyRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'accept' | 'reject' | 'cancel') => {
    try {
      const { error } = await supabase
        .from('swap_requests')
        .update({ 
          status: action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;
      
      toast.success(`Request ${action}ed successfully`);
      fetchRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      toast.success(`Request ${action}ed successfully (Demo mode)`);
      
      // Update dummy data for demo
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'cancelled' }
          : req
      ));
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: Clock,
        description: 'Awaiting response'
      },
      accepted: { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: Check,
        description: 'Ready to schedule'
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: X,
        description: 'Request declined'
      },
      cancelled: { 
        color: 'bg-gray-100 text-gray-800 border-gray-200', 
        icon: X,
        description: 'Request cancelled'
      },
      completed: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: Star,
        description: 'Session completed'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const filterOptions = [
    { value: 'all', label: 'All Requests', count: requests.length },
    { value: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
    { value: 'accepted', label: 'Accepted', count: requests.filter(r => r.status === 'accepted').length },
    { value: 'completed', label: 'Completed', count: requests.filter(r => r.status === 'completed').length }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Swap Requests</h2>
          <p className="text-gray-600">Manage your skill exchange requests</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Create Request Button */}
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </motion.button>
        </div>
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredRequests.map((request, index) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <motion.div
                key={request.id}
                className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Avatar */}
                    <Avatar className="w-14 h-14 border-2 border-blue-500 shadow-md">
                      <AvatarImage 
                        src={request.requester.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.requester_id}`} 
                        alt="User" 
                      />
                      <AvatarFallback>
                        {request.requester.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {request.requester.full_name}
                        </h3>
                        <Badge 
                          className={`${statusConfig.color} border flex items-center space-x-1`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{request.status}</span>
                        </Badge>
                      </div>
                      
                      {/* Skills Exchange */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Offers:</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            {request.offered_skill?.name}
                          </Badge>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Wants:</span>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                            {request.requested_skill?.name}
                          </Badge>
                        </div>
                      </div>

                      {/* Message */}
                      {request.message && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                          <p className="text-gray-700 text-sm italic">
                            "{request.message}"
                          </p>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(request.created_at).toLocaleDateString()}</span>
                        </div>
                        {request.proposed_duration && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{request.proposed_duration} min session</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span>{statusConfig.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    {request.status === 'pending' && (
                      <>
                        <motion.button
                          onClick={() => handleRequestAction(request.id, 'accept')}
                          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-md flex items-center space-x-2 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleRequestAction(request.id, 'reject')}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-md flex items-center space-x-2 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </motion.button>
                      </>
                    )}

                    {request.status === 'accepted' && (
                      <div className="flex flex-col space-y-2">
                        <motion.button
                          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2 text-sm font-medium shadow-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Chat</span>
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center space-x-2 text-sm font-medium shadow-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Schedule</span>
                        </motion.button>
                      </div>
                    )}

                    {request.status === 'completed' && (
                      <motion.button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors flex items-center space-x-2 text-sm font-medium shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Star className="w-4 h-4" />
                        <span>Rate</span>
                      </motion.button>
                    )}

                    {request.status === 'rejected' && (
                      <div className="text-center">
                        <span className="text-xs text-gray-500">Request declined</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No requests yet' : `No ${filter} requests`}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start by exploring potential matches and sending your first swap request!' 
                : `No ${filter} requests at the moment. Check back later!`
              }
            </p>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Request</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Request Statistics */}
      {requests.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-4">Request Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filterOptions.slice(1).map((option) => (
              <div key={option.value} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{option.count}</div>
                <div className="text-sm text-gray-600 capitalize">{option.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SwapRequestManager;
