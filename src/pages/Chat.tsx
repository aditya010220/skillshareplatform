import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Bot, User, Users, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AIHelper from '@/components/chat/AIHelper';

const Chat = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIHelper, setShowAIHelper] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat data - in real app, this would come from database
  const chats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Great session on React hooks!',
      timestamp: '2 min ago',
      isOnline: true,
      unreadCount: 2
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      lastMessage: 'Thanks for the marketing tips',
      timestamp: '1 hour ago',
      isOnline: false,
      unreadCount: 0
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      lastMessage: 'Spanish lesson was amazing!',
      timestamp: '3 hours ago',
      isOnline: true,
      unreadCount: 1
    },
    {
      id: 4,
      name: 'AI Helper',
      avatar: '/placeholder.svg',
      lastMessage: 'How can I help you today?',
      timestamp: 'Always available',
      isOnline: true,
      unreadCount: 0,
      isAI: true
    }
  ];

  const location = useLocation();

  // If navigated here with a selectedMember, pre-select a chat with them
  React.useEffect(() => {
    const sel = (location.state as any)?.selectedMember;
    if (sel) {
      const chatObj = {
        id: sel.id ?? `user-${Date.now()}`,
        name: sel.full_name || sel.name,
        avatar: sel.avatar_url || sel.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${sel.full_name || sel.name}`,
        lastMessage: '',
        timestamp: 'Just now',
        isOnline: false,
        unreadCount: 0
      };
      setSelectedChat(chatObj);
      setMessages([]);
    }
  }, [location.state]);

  const mockMessages = [
    {
      id: 1,
      senderId: 1,
      content: 'Hey! Thanks for the great React session yesterday',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false
    },
    {
      id: 2,
      senderId: 'current-user',
      content: 'You\'re welcome! I\'m glad you found it helpful',
      timestamp: new Date(Date.now() - 240000),
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      content: 'Could we schedule another session on advanced hooks?',
      timestamp: new Date(Date.now() - 120000),
      isOwn: false
    },
    {
      id: 4,
      senderId: 'current-user',
      content: 'Absolutely! How about next Tuesday at 3 PM?',
      timestamp: new Date(Date.now() - 60000),
      isOwn: true
    }
  ];

  useEffect(() => {
    if (selectedChat && !selectedChat.isAI) {
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: 'current-user',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
    if (chat.isAI) {
      setShowAIHelper(true);
    } else {
      setShowAIHelper(false);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  Chat
                </h1>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
          {/* Chat List */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedChat?.id === chat.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full border-2 border-blue-500"
                      />
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {chat.isAI && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                          <Bot className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <span className="bg-blue-500 text-white rounded-full text-xs px-2 py-1 min-w-[20px] text-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg flex flex-col">
            {selectedChat ? (
              <>
                {showAIHelper ? (
                  <AIHelper />
                ) : (
                  <>
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={selectedChat.avatar}
                              alt={selectedChat.name}
                              className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                            {selectedChat.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                            <p className="text-sm text-gray-600">
                              {selectedChat.isOnline ? 'Online' : 'Last seen 1 hour ago'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <Phone className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <Video className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.isOwn ? 'text-blue-200' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <motion.button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
