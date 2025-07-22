
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Lightbulb, BookOpen, Target, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const AIHelper = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI Learning Assistant powered by Gemini. I can help you with skill recommendations, learning paths, study tips, and answer any questions about your learning journey. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    {
      id: 1,
      text: "Help me create a learning roadmap",
      icon: Target
    },
    {
      id: 2,
      text: "What skills should I learn next?",
      icon: Lightbulb
    },
    {
      id: 3,
      text: "Give me study tips for programming",
      icon: BookOpen
    },
    {
      id: 4,
      text: "How can I improve my coding skills?",
      icon: MessageCircle
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const callGeminiAPI = async (message: string) => {
    if (!geminiApiKey) {
      toast.error('Please enter your Gemini API key first');
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful AI learning assistant for SkillSwap, a skill exchange platform. 
              Answer the following question in a helpful, encouraging, and educational manner. 
              Focus on learning, skill development, and personal growth. 
              Question: ${message}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini API');
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a proper response.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const message = messageText || inputMessage;
    if (!message.trim()) return;

    if (!geminiApiKey) {
      toast.error('Please enter your Gemini API key first');
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await callGeminiAPI(message);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error while processing your request. Please check your API key and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response');
    } finally {
      setIsTyping(false);
    }
  };

  const handleApiKeySubmit = () => {
    if (geminiApiKey.trim()) {
      setShowApiKeyInput(false);
      toast.success('API key saved! You can now chat with the AI assistant.');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (showApiKeyInput) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Setup AI Assistant</h3>
            <p className="text-gray-600 text-sm">
              Enter your Google Gemini API key to start chatting with the AI assistant
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter your Gemini API key"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleApiKeySubmit}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Start Chatting
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>How to get API key:</strong><br />
              1. Go to Google AI Studio<br />
              2. Create a new API key<br />
              3. Copy and paste it here
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* AI Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-full">
            <Bot className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Learning Assistant</h3>
            <p className="text-sm text-gray-600">Powered by Google Gemini</p>
          </div>
          <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full ml-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {quickSuggestions.map((suggestion) => {
            const IconComponent = suggestion.icon;
            return (
              <motion.button
                key={suggestion.id}
                onClick={() => handleQuickSuggestion(suggestion.text)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">{suggestion.text}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`p-2 rounded-full ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-purple-100'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div className={`p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm whitespace-pre-line">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start space-x-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about learning and skills..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIHelper;
