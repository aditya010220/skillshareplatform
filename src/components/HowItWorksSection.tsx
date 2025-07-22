
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, MessageCircle, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and list the skills you can teach and what you want to learn.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Search,
      title: 'Find Perfect Matches',
      description: 'Our smart algorithm connects you with people who have complementary skills.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Connect & Schedule',
      description: 'Chat with your matches and schedule convenient learning sessions.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Learn & Teach',
      description: 'Exchange knowledge in structured sessions and grow your skills together.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const cardHover = {
    hover: { 
      scale: 1.05, 
      y: -5, 
      rotateY: 5,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How SkillSwap Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of learners exchanging skills in a supportive community. 
            Here's how easy it is to get started.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              whileHover="hover"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 z-0" />
              )}
              
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative z-10 border border-gray-100"
                variants={cardHover}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                      Step {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community of skill-swappers and start your learning journey today. 
              It's completely free to get started!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">100% Free to Join</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Verified Community</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Safe & Secure</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
