
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Users, BookOpen, Trophy, Zap, Globe, Heart } from 'lucide-react';

const CTABanner = () => {
  const features = [
    { icon: Users, label: '10K+ Learners', color: 'text-blue-400' },
    { icon: BookOpen, label: '500+ Skills', color: 'text-green-400' },
    { icon: Trophy, label: '98% Success', color: 'text-yellow-400' },
  ];

  const benefits = [
    { icon: Zap, title: 'Instant Connections', description: 'Match with perfect learning partners in seconds' },
    { icon: Globe, title: 'Global Community', description: 'Connect with learners from around the world' },
    { icon: Heart, title: 'Supportive Environment', description: 'Learn in a friendly, encouraging atmosphere' },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-purple-600/30" />
        
        {/* Animated Mesh Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
            `,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main Heading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Ready to{' '}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Transform
                </span>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-300" />
                </motion.div>
              </motion.span>
              <br />
              Your Skills?
            </h2>
          </motion.div>

          {/* Features Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                <span className="text-white font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of passionate learners who are already sharing knowledge and 
            discovering new skills. Your transformation journey starts with a single connection.
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <benefit.icon className="w-8 h-8 text-blue-300 mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold px-10 py-4 text-lg rounded-full shadow-2xl group transition-all duration-300"
              >
                Start Your Journey
                <motion.div
                  className="ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 font-semibold px-10 py-4 text-lg rounded-full backdrop-blur-sm bg-white/5 transition-all duration-300"
              >
                Explore Community
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 text-sm mb-4">Trusted by learners worldwide</p>
            <div className="flex flex-wrap justify-center gap-6 text-white/40">
              <span className="text-sm">✓ Verified Community</span>
              <span className="text-sm">✓ Safe & Secure</span>
              <span className="text-sm">✓ 100% Free to Join</span>
              <span className="text-sm">✓ Expert Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
