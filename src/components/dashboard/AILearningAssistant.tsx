
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Lightbulb, BookOpen, Target, Zap } from 'lucide-react';

const AILearningAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI Learning Assistant. I'm here to help you with your learning journey. Ask me anything about your skills, goals, or need guidance on what to learn next!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        await fetchGeminiResponse('Hello, test connection');
        setApiStatus('connected');
      } catch (error) {
        console.error('API connection test failed:', error);
        setApiStatus('error');
      }
    };

    testConnection();
  }, []);

  const quickActions = [
    {
      id: 1,
      title: 'Skill Assessment',
      description: 'Get personalized skill recommendations',
      icon: Target,
      action: 'skill-assessment'
    },
    {
      id: 2,
      title: 'Learning Path',
      description: 'Create a custom learning roadmap',
      icon: BookOpen,
      action: 'learning-path'
    },
    {
      id: 3,
      title: 'Study Tips',
      description: 'Get effective learning strategies',
      icon: Lightbulb,
      action: 'study-tips'
    },
    {
      id: 4,
      title: 'Quick Help',
      description: 'Solve doubts instantly',
      icon: Zap,
      action: 'quick-help'
    }
  ];

  const sampleResponses = {
    'skill-assessment': "I'd be happy to help assess your skills! Let me ask you a few questions:\n\n1. What's your current experience level with programming?\n2. Which technologies are you most comfortable with?\n3. What are your learning goals for the next 3 months?\n\nBased on your answers, I can recommend specific skills to focus on and create a personalized learning plan.",
    'learning-path': "Great choice! Let's create a personalized learning path for you. Here's what I recommend:\n\n📚 **Phase 1: Foundation (Weeks 1-2)**\n- Review JavaScript fundamentals\n- Practice with coding exercises\n\n🚀 **Phase 2: Framework (Weeks 3-6)**\n- Deep dive into React\n- Build 2-3 small projects\n\n⚡ **Phase 3: Advanced (Weeks 7-8)**\n- Learn state management\n- Deploy projects\n\nWould you like me to adjust this plan based on your specific goals?",
    'study-tips': "Here are some proven learning strategies that work great for skill development:\n\n🎯 **Active Learning**\n- Practice by building projects\n- Teach others what you learn\n\n⏰ **Spaced Repetition**\n- Review concepts regularly\n- Use the 50/10 rule: 50 min study, 10 min break\n\n🤝 **Social Learning**\n- Join study groups\n- Participate in coding challenges\n\n📝 **Documentation**\n- Keep a learning journal\n- Document your progress\n\nWhich area would you like me to elaborate on?",
    'quick-help': "I'm here to help! What specific topic or problem are you working on? I can assist with:\n\n• Code debugging and explanations\n• Concept clarification\n• Best practices and tips\n• Resource recommendations\n• Career guidance\n\nJust describe what you're stuck on, and I'll provide step-by-step guidance!"
  };

  // Google AI (Gemini) API call with fallback models
  const fetchGeminiResponse = async (question: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
      setApiStatus('error');
      return 'API key not configured. Please check your environment variables.';
    }

    // Try different models in order of preference
    const models = ['gemini-2.5-flash'];
    
    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI Learning Assistant for a skill-sharing platform. Help with this learning-related question: ${question}. Provide helpful, educational responses focused on skill development, learning strategies, and career growth.`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
                topP: 0.8,
                topK: 40
              }
            })
          });
        
        if (!response.ok) {
          console.warn(`Model ${model} failed with status: ${response.status}`);
          if (model === models[models.length - 1]) {
            // Last model failed
            setApiStatus('error');
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          continue; // Try next model
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.warn(`Model ${model} returned error:`, data.error);
          if (model === models[models.length - 1]) {
            setApiStatus('error');
            return `Sorry, I encountered an error: ${data.error.message || 'Unknown error'}. Please try again.`;
          }
          continue; // Try next model
        }
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
          console.warn(`Model ${model} returned unexpected response structure:`, data);
          if (model === models[models.length - 1]) {
            setApiStatus('error');
            return 'Sorry, I received an unexpected response format. Please try rephrasing your question.';
          }
          continue; // Try next model
        }
        
        console.log(`Successfully used model: ${model}`);
        setApiStatus('connected');
        return data.candidates[0].content.parts[0].text || 'Sorry, I could not generate a response.';
        
      } catch (error) {
        console.warn(`Model ${model} failed:`, error);
        if (model === models[models.length - 1]) {
          // Last model failed
          console.error('All models failed:', error);
          setApiStatus('error');
          
          // Provide more specific error messages
          if (error instanceof TypeError && error.message.includes('fetch')) {
            return 'Sorry, there was a network error. Please check your internet connection and try again.';
          }
          
          return `Sorry, there was an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`;
        }
        // Continue to next model
      }
    }
    
    // This should never be reached, but just in case
    setApiStatus('error');
    return 'Sorry, all AI models are currently unavailable. Please try again later.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call Gemini API for real AI response
      const aiAnswer = await fetchGeminiResponse(inputMessage);
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: aiAnswer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Message sending error:', error);
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again or check your internet connection.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
    
    setIsTyping(false);
  };

  const handleQuickAction = async (action: string) => {
    const actionMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `Help me with ${action.replace('-', ' ')}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);
    setIsTyping(true);

    try {
      // Try to get AI response first
      const aiResponse = await fetchGeminiResponse(`Help me with ${action.replace('-', ' ')}`);
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      // Fallback to sample responses if API fails
      console.error('Quick action API error:', error);
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: sampleResponses[action as keyof typeof sampleResponses],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }
    
    setIsTyping(false);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Learning Assistant</h2>
            <p className="text-sm text-gray-600">Your 24/7 learning companion</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
            apiStatus === 'connected' ? 'bg-green-100' : 
            apiStatus === 'error' ? 'bg-red-100' : 'bg-yellow-100'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              apiStatus === 'connected' ? 'bg-green-500' : 
              apiStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`text-xs font-medium ${
              apiStatus === 'connected' ? 'text-green-600' : 
              apiStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {apiStatus === 'connected' ? 'AI Connected' : 
               apiStatus === 'error' ? 'AI Error' : 'Connecting...'}
            </span>
          </div>
          {apiStatus === 'error' && (
            <button
              onClick={() => {
                setApiStatus('loading');
                const testConnection = async () => {
                  try {
                    await fetchGeminiResponse('Hello, test connection');
                    setApiStatus('connected');
                  } catch (error) {
                    console.error('API connection test failed:', error);
                    setApiStatus('error');
                  }
                };
                testConnection();
              }}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Retry
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">{action.title}</span>
                </div>
                <p className="text-xs text-gray-600">{action.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
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
              <div className="p-2 bg-gray-200 rounded-full">
                <Bot className="w-4 h-4 text-gray-600" />
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
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your learning journey..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AILearningAssistant;
