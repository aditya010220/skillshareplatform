
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Features
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                How It Works
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Success Stories
              </motion.button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={() => openAuthModal('signin')}
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => openAuthModal('signup')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            className={`md:hidden overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}
            initial={false}
            animate={{ 
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4 space-y-4 border-t border-gray-100">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                Success Stories
              </button>
              
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <motion.button
                  onClick={() => openAuthModal('signin')}
                  className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)",
                    y: -1
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => openAuthModal('signup')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
