
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    skill: "Learned Web Development",
    content: "I traded my photography skills for coding lessons and now I'm building my own websites! The community here is incredibly supportive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b5b73e4d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Mark Chen",
    skill: "Taught Mandarin",
    content: "Teaching Mandarin while learning guitar has been amazing. I've made great friends and improved my English at the same time.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Emma Davis",
    skill: "Learned Cooking",
    content: "From burning toast to cooking three-course meals! My cooking teacher became a great friend. This platform changed my life.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateY: 45
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.3,
      rotate: 180,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Animations */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #3B82F6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8B5CF6 1px, transparent 1px)",
          backgroundSize: "60px 60px, 40px 40px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 30px rgba(59,130,246,0.4)"
            }}
          >
            What Our Community Says
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Real stories from real people who've transformed their lives through skill sharing
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative group cursor-pointer"
              variants={cardVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  type: "spring" as const,
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                <Quote className="w-6 h-6 text-white" />
              </motion.div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"
                style={{ padding: '2px' }}
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 2 }}
              >
                <div className="w-full h-full bg-white rounded-2xl" />
              </motion.div>

              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-transparent group-hover:border-blue-500 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      borderColor: "#3B82F6"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <motion.h4 
                      className="font-semibold text-gray-900"
                      whileHover={{ color: "#3B82F6" }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {testimonial.skill}
                    </motion.p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex mb-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={starVariants}
                      custom={i}
                      whileHover="hover"
                      className="cursor-pointer"
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.p 
                  className="text-gray-700 leading-relaxed italic relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    "{testimonial.content}"
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
