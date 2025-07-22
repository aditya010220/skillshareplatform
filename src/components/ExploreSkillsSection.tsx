
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Code, Camera, Palette, Music, Heart, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExploreSkillsSection = () => {
  const skills = [
    { name: 'Web Development', icon: Code, count: '1.2k', color: 'bg-blue-500', students: 234 },
    { name: 'Photography', icon: Camera, count: '856', color: 'bg-green-500', students: 189 },
    { name: 'Digital Art', icon: Palette, count: '743', color: 'bg-purple-500', students: 156 },
    { name: 'Music Production', icon: Music, count: '692', color: 'bg-red-500', students: 123 },
    { name: 'Cooking', icon: Heart, count: '1.5k', color: 'bg-orange-500', students: 287 },
    { name: 'Game Design', icon: Gamepad2, count: '543', color: 'bg-indigo-500', students: 98 },
    { name: 'Language Learning', icon: BookOpen, count: '2.1k', color: 'bg-teal-500', students: 456 },
    { name: 'Public Speaking', icon: Users, count: '432', color: 'bg-pink-500', students: 87 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      rotateX: -15, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 12, 
        duration: 0.6 
      }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const statsVariants = {
    hover: { 
      rotate: -2, 
      scale: 1.05,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section id="explore" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Popular{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of skills shared by our community. From coding to cooking, 
            there's always something new to learn and teach.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`p-3 rounded-lg ${skill.color} text-white`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <skill.icon className="w-6 h-6" />
                  </motion.div>
                  <motion.div
                    className="text-right"
                    variants={statsVariants}
                    whileHover="hover"
                  >
                    <div className="text-sm text-gray-500">Available</div>
                    <div className="font-bold text-gray-900">{skill.count}</div>
                  </motion.div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{skill.students} students</span>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Browse All Skills
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSkillsSection;
