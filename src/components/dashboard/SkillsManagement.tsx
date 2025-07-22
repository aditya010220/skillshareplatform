
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Search, BookOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const SkillsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [skillType, setSkillType] = useState<'teaching' | 'learning'>('teaching');

  // Dummy user skills data
  const [userSkills, setUserSkills] = useState({
    teaching: [
      { id: 1, name: 'React', category: 'Programming', level: 'Expert' },
      { id: 2, name: 'JavaScript', category: 'Programming', level: 'Advanced' },
      { id: 3, name: 'UI/UX Design', category: 'Design', level: 'Intermediate' },
      { id: 4, name: 'Photography', category: 'Creative', level: 'Advanced' }
    ],
    learning: [
      { id: 5, name: 'Python', category: 'Programming', level: 'Beginner' },
      { id: 6, name: 'Data Science', category: 'Programming', level: 'Beginner' },
      { id: 7, name: 'Spanish', category: 'Languages', level: 'Intermediate' },
      { id: 8, name: 'Cooking', category: 'Lifestyle', level: 'Beginner' }
    ]
  });

  const categories = ['Programming', 'Design', 'Languages', 'Creative', 'Business', 'Health', 'Lifestyle'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleAddSkill = () => {
    if (!newSkill.trim() || !newSkillCategory) {
      toast.error('Please fill in all fields');
      return;
    }

    const skill = {
      id: Date.now(),
      name: newSkill,
      category: newSkillCategory,
      level: 'Beginner'
    };

    setUserSkills(prev => ({
      ...prev,
      [skillType]: [...prev[skillType], skill]
    }));

    setNewSkill('');
    setNewSkillCategory('');
    toast.success(`${newSkill} added to ${skillType} skills!`);
  };

  const handleRemoveSkill = (skillId: number, type: 'teaching' | 'learning') => {
    setUserSkills(prev => ({
      ...prev,
      [type]: prev[type].filter(skill => skill.id !== skillId)
    }));
    toast.success('Skill removed successfully');
  };

  const filteredSkills = (type: 'teaching' | 'learning') => {
    return userSkills[type].filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Your Skills</h2>
        <BookOpen className="w-6 h-6 text-blue-600" />
      </div>

      {/* Add New Skill Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g., React, Spanish, Photography"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value as 'teaching' | 'learning')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="teaching">Can Teach</option>
              <option value="learning">Want to Learn</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              onClick={handleAddSkill}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Skills Lists */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Teaching Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Skills I Can Teach ({filteredSkills('teaching').length})</span>
          </h3>
          
          <div className="space-y-3">
            {filteredSkills('teaching').map((skill) => (
              <motion.div
                key={skill.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div>
                  <h4 className="font-medium text-gray-900">{skill.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{skill.category}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                      {skill.level}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveSkill(skill.id, 'teaching')}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Skills I Want to Learn ({filteredSkills('learning').length})</span>
          </h3>
          
          <div className="space-y-3">
            {filteredSkills('learning').map((skill) => (
              <motion.div
                key={skill.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div>
                  <h4 className="font-medium text-gray-900">{skill.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{skill.category}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                      {skill.level}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveSkill(skill.id, 'learning')}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsManagement;
