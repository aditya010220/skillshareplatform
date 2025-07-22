
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Moon, Sun, Monitor, Sparkles } from 'lucide-react';

const ThemePersonalization = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [autoMode, setAutoMode] = useState(false);

  const themes = [
    { id: 'blue', name: 'Ocean Blue', colors: ['#3B82F6', '#1E40AF'], bg: 'from-blue-500 to-blue-600' },
    { id: 'purple', name: 'Royal Purple', colors: ['#8B5CF6', '#6D28D9'], bg: 'from-purple-500 to-purple-600' },
    { id: 'green', name: 'Forest Green', colors: ['#10B981', '#047857'], bg: 'from-green-500 to-green-600' },
    { id: 'pink', name: 'Cherry Blossom', colors: ['#EC4899', '#BE185D'], bg: 'from-pink-500 to-pink-600' },
    { id: 'orange', name: 'Sunset Orange', colors: ['#F59E0B', '#D97706'], bg: 'from-orange-500 to-orange-600' },
    { id: 'teal', name: 'Ocean Teal', colors: ['#14B8A6', '#0F766E'], bg: 'from-teal-500 to-teal-600' },
  ];

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'blue';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedAutoMode = localStorage.getItem('autoMode') === 'true';
    
    setSelectedTheme(savedTheme);
    setIsDarkMode(savedDarkMode);
    setAutoMode(savedAutoMode);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem('theme', themeId);
    // Apply theme to CSS variables
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.colors[0]);
      document.documentElement.style.setProperty('--primary-dark', theme.colors[1]);
    }
  };

  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleAutoModeToggle = () => {
    const newAutoMode = !autoMode;
    setAutoMode(newAutoMode);
    localStorage.setItem('autoMode', newAutoMode.toString());
    
    if (newAutoMode) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);
      document.documentElement.classList.toggle('dark', mediaQuery.matches);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Theme & Personalization</h2>
          <p className="text-gray-600">Customize your dashboard appearance</p>
        </div>
      </div>

      {/* Dark Mode Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Mode</h3>
        
        {/* Auto Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
          <div className="flex items-center space-x-3">
            <Monitor className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Auto Mode</p>
              <p className="text-sm text-gray-600">Follow system preference</p>
            </div>
          </div>
          <motion.button
            onClick={handleAutoModeToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              autoMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: autoMode ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {/* Manual Dark Mode Toggle */}
        <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl ${autoMode ? 'opacity-50' : ''}`}>
          <div className="flex items-center space-x-3">
            {isDarkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
            <div>
              <p className="font-medium text-gray-900">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-sm text-gray-600">
                {isDarkMode ? 'Easy on the eyes' : 'Bright and clear'}
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleDarkModeToggle}
            disabled={autoMode}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: isDarkMode ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Color Themes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme, index) => (
            <motion.button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTheme === theme.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-full h-12 bg-gradient-to-r ${theme.bg} rounded-lg mb-3`} />
              <p className="font-medium text-gray-900">{theme.name}</p>
              {selectedTheme === theme.id && (
                <motion.div
                  className="mt-2 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${themes.find(t => t.id === selectedTheme)?.bg} rounded-full`} />
            <div>
              <h4 className="font-semibold text-gray-900">Dashboard Preview</h4>
              <p className="text-sm text-gray-600">See how your theme looks</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-8 bg-gradient-to-r ${themes.find(t => t.id === selectedTheme)?.bg} rounded opacity-${30 + i * 20}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles className="w-5 h-5" />
        <span>Apply Theme</span>
      </motion.button>

      {/* Reset to Default */}
      <button
        onClick={() => {
          handleThemeChange('blue');
          setIsDarkMode(false);
          setAutoMode(false);
          localStorage.removeItem('theme');
          localStorage.removeItem('darkMode');
          localStorage.removeItem('autoMode');
        }}
        className="w-full mt-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        Reset to Default
      </button>
    </motion.div>
  );
};

export default ThemePersonalization;
