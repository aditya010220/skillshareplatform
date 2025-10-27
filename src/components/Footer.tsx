import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Phone, Zap, Instagram, MessageCircle, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Browse Skills', href: '#explore' },
    { name: 'Success Stories', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const categories = [
    'Web Development',
    'Design & Arts',
    'Music & Audio',
    'Photography',
    'Cooking & Culinary',
    'Languages',
    'Business Skills',
    'Health & Fitness'
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: '#', 
      color: 'hover:text-pink-500',
      bgColor: 'hover:bg-pink-50'
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      href: '#', 
      color: 'hover:text-green-500',
      bgColor: 'hover:bg-green-50'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: '#', 
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-50'
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      href: '#', 
      color: 'hover:text-gray-900',
      bgColor: 'hover:bg-gray-50'
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-500 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <motion.div
                className="flex items-center mb-6"
                variants={logoVariants}
                whileHover="hover"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="mr-3"
                >
                  <Zap className="w-8 h-8 text-blue-400" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  SkillSwap
                </h3>
              </motion.div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connect, learn, and grow together. SkillSwap makes it easy to share your knowledge 
                and discover new passions through our vibrant community.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-sm ${social.color} ${social.bgColor} transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <motion.li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      variants={{
                        hover: { 
                          x: 5, 
                          color: "#60A5FA",
                          transition: { 
                            duration: 0.2, 
                            ease: [0.4, 0, 0.2, 1] as const
                          }
                        }
                      }}
                      whileHover="hover"
                    >
                      <span className="group-hover:text-blue-400 transition-colors duration-200">
                        {link.name}
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white">Popular Categories</h4>
              <ul className="space-y-3">
                {categories.slice(0, 6).map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white">Get in Touch</h4>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center text-gray-300"
                  variants={{
                    hover: { 
                      scale: 1.05, 
                      y: -2,
                      transition: { 
                        duration: 0.2, 
                        ease: [0.4, 0, 0.2, 1] as const
                      }
                    },
                    tap: { scale: 0.95 }
                  }}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span>hello@skillswap.com</span>
                </motion.div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-green-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-red-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h5 className="text-sm font-semibold mb-3 text-white">Stay Updated</h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 py-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} SkillSwap.for learners everywhere.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
