import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Calendar, TrendingUp, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserProfileSummaryProps {
  profile: any;
}

const UserProfileSummary: React.FC<UserProfileSummaryProps> = ({ profile }) => {
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      fetchUserSkills();
    }
  }, [profile]);

  const fetchUserSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          *,
          skills (name, category)
        `)
        .eq('user_id', profile.id);

      if (error) throw error;
      setUserSkills(data || []);
    } catch (error) {
      console.error('Error fetching user skills:', error?.message || (typeof error === 'object' ? JSON.stringify(error) : String(error)));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const offeredSkills = userSkills.filter(skill => skill.skill_type === 'offered');
  const wantedSkills = userSkills.filter(skill => skill.skill_type === 'wanted');
  const completionRate = profile?.total_sessions > 0 ? Math.round((profile.completed_sessions / profile.total_sessions) * 100) : 0;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.img
            src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.id}`}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-gradient-to-r from-blue-500 to-purple-600"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name || 'Anonymous'}</h2>
            <p className="text-gray-600">{profile?.bio || 'No bio yet'}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {profile?.rating?.toFixed(1) || '0.0'} ({profile?.rating_count || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
          <Edit className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white"
          whileHover={{ scale: 1.05 }}
        >
          <Calendar className="w-6 h-6 mb-2" />
          <p className="text-2xl font-bold">{profile?.total_sessions || 0}</p>
          <p className="text-sm opacity-90">Total Sessions</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white"
          whileHover={{ scale: 1.05 }}
        >
          <Award className="w-6 h-6 mb-2" />
          <p className="text-2xl font-bold">{profile?.completed_sessions || 0}</p>
          <p className="text-sm opacity-90">Completed</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white"
          whileHover={{ scale: 1.05 }}
        >
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="text-2xl font-bold">{completionRate}%</p>
          <p className="text-sm opacity-90">Success Rate</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white"
          whileHover={{ scale: 1.05 }}
        >
          <Star className="w-6 h-6 mb-2" />
          <p className="text-2xl font-bold">{profile?.level_points || 0}</p>
          <p className="text-sm opacity-90">XP Points</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-medium">Profile Completion</span>
          <span className="text-blue-600 font-bold">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Skills I Offer ({offeredSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {offeredSkills.length > 0 ? (
              offeredSkills.map((skill, index) => (
                <motion.span
                  key={skill.id}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill.skills?.name || 'Unknown Skill'}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills offered yet</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Skills I Want to Learn ({wantedSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {wantedSkills.length > 0 ? (
              wantedSkills.map((skill, index) => (
                <motion.span
                  key={skill.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill.skills?.name || 'Unknown Skill'}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No learning goals set yet</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileSummary;
