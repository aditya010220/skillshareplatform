
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, Lock, CheckCircle, Star, Calendar, Trophy, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CertificationSystem = () => {
  const [activeTab, setActiveTab] = useState('earned');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const { toast } = useToast();

  const earnedCertificates = [
    {
      id: 1,
      title: 'React Developer Certification',
      issuer: 'SkillSwap Academy',
      earnedDate: '2024-12-15',
      validUntil: '2026-12-15',
      credentialId: 'SS-REACT-2024-001',
      skills: ['React', 'JavaScript', 'Component Design'],
      level: 'Advanced',
      hours: 40,
      verified: true
    },
    {
      id: 2,
      title: 'Python Data Science Certificate',
      issuer: 'SkillSwap Academy',
      earnedDate: '2024-11-20',
      validUntil: '2026-11-20',
      credentialId: 'SS-PYDS-2024-002',
      skills: ['Python', 'Pandas', 'Machine Learning'],
      level: 'Intermediate',
      hours: 60,
      verified: true
    }
  ];

  const availableCertificates = [
    {
      id: 1,
      title: 'Full Stack JavaScript Developer',
      description: 'Master both frontend and backend JavaScript development',
      requirements: ['Complete 5 projects', '50 hours of learning', 'Pass final assessment'],
      skills: ['Node.js', 'Express', 'React', 'MongoDB'],
      level: 'Advanced',
      estimatedHours: 80,
      progress: 65,
      nextMilestone: 'Complete backend project'
    },
    {
      id: 2,
      title: 'UI/UX Design Professional',
      description: 'Comprehensive design certification covering theory and practice',
      requirements: ['Design portfolio', '30 hours of learning', 'Peer review'],
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      level: 'Intermediate',
      estimatedHours: 45,
      progress: 20,
      nextMilestone: 'Complete color theory module'
    },
    {
      id: 3,
      title: 'DevOps Engineer Certification',
      description: 'Learn modern DevOps practices and tools',
      requirements: ['Deploy 3 applications', '40 hours of learning', 'Infrastructure project'],
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
      level: 'Advanced',
      estimatedHours: 70,
      progress: 0,
      nextMilestone: 'Start with Docker fundamentals'
    }
  ];

  const badges = [
    {
      id: 1,
      name: 'Early Adopter',
      description: 'Joined SkillSwap in the first month',
      icon: '🚀',
      earned: true,
      rarity: 'rare'
    },
    {
      id: 2,
      name: 'Knowledge Sharer',
      description: 'Completed 10 teaching sessions',
      icon: '📚',
      earned: true,
      rarity: 'common'
    },
    {
      id: 3,
      name: 'Mentor',
      description: 'Successfully mentored 5 students',
      icon: '👨‍🏫',
      earned: false,
      rarity: 'epic',
      progress: 60
    },
    {
      id: 4,
      name: 'Skill Master',
      description: 'Achieved expert level in 3 skills',
      icon: '⚡',
      earned: false,
      rarity: 'legendary',
      progress: 33
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleDownloadCertificate = (certificate) => {
    // Generate a simple PDF-like document
    const content = `
CERTIFICATE OF ACHIEVEMENT

${certificate.title}

This is to certify that the holder has successfully completed
the requirements for this certification.

Issued by: ${certificate.issuer}
Date Earned: ${new Date(certificate.earnedDate).toLocaleDateString()}
Valid Until: ${new Date(certificate.validUntil).toLocaleDateString()}
Credential ID: ${certificate.credentialId}

Skills Covered: ${certificate.skills.join(', ')}
Level: ${certificate.level}
Duration: ${certificate.hours} hours
    `;

    // Create a blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  const handleShareCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    const shareLink = `https://skillswap.com/verify/${selectedCertificate?.credentialId}`;
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Verification link copied to clipboard.",
    });
  };

  const shareToSocialMedia = (platform) => {
    const shareText = `I just earned my ${selectedCertificate?.title} certification! 🎉`;
    const shareLink = `https://skillswap.com/verify/${selectedCertificate?.credentialId}`;
    
    let url = '';
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast({
        title: "Shared Successfully",
        description: `Certificate shared on ${platform}!`,
      });
    }
  };

  const tabs = [
    { id: 'earned', label: 'My Certificates', icon: Award },
    { id: 'available', label: 'Available', icon: Trophy },
    { id: 'badges', label: 'Badges', icon: Star }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certifications & Badges</h2>
          <p className="text-gray-600">Showcase your achievements and earn recognition</p>
        </div>
        <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
          <Trophy className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-600">Achievement System</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-yellow-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'earned' && (
          <div className="space-y-6">
            {earnedCertificates.length > 0 ? (
              earnedCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{cert.title}</h3>
                          {cert.verified && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">Issued by {cert.issuer}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Earned: {new Date(cert.earnedDate).toLocaleDateString()}</span>
                          </div>
                          <span>•</span>
                          <span>Valid until: {new Date(cert.validUntil).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{cert.hours} hours</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDownloadCertificate(cert)}
                        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button 
                        onClick={() => handleShareCertificate(cert)}
                        className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-600">Credential ID: </span>
                      <span className="text-sm font-mono text-gray-900">{cert.credentialId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Level:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cert.level === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {cert.level}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
                <p className="text-gray-600 mb-4">Start earning certificates by completing courses and assessments</p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Browse Available Certificates
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'available' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{cert.estimatedHours} hours</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full ${
                          cert.level === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {cert.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {cert.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress: {cert.progress}%</span>
                    <span>Next: {cert.nextMilestone}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full"
                      style={{ width: `${cert.progress}%` }}
                    />
                  </div>
                </div>

                <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  cert.progress > 0
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {cert.progress > 0 ? 'Continue Progress' : 'Start Certificate'}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className={`bg-white rounded-xl shadow-lg p-6 text-center ${
                  badge.earned ? 'border-2 border-yellow-400' : 'opacity-75'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} flex items-center justify-center text-2xl`}>
                  {badge.earned ? badge.icon : <Lock className="w-6 h-6 text-white" />}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                  {badge.name}
                </h3>
                
                <p className={`text-sm mb-4 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                  {badge.description}
                </p>

                <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                  badge.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                  badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                  badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {badge.rarity.toUpperCase()}
                </div>

                {!badge.earned && badge.progress && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-1">{badge.progress}% Complete</div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} h-1 rounded-full`}
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Certificate</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{selectedCertificate.title}</h4>
                <p className="text-sm text-gray-600">Issued by {selectedCertificate.issuer}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {selectedCertificate.credentialId}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Link
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={`https://skillswap.com/verify/${selectedCertificate.credentialId}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyShareLink}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Share on Social Media
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => shareToSocialMedia('linkedin')}
                    className="flex flex-col items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mb-2">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => shareToSocialMedia('twitter')}
                    className="flex flex-col items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center mb-2">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Twitter</span>
                  </button>
                  <button
                    onClick={() => shareToSocialMedia('facebook')}
                    className="flex flex-col items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center mb-2">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Facebook</span>
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CertificationSystem;
