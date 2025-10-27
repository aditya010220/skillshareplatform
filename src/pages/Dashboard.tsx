import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Bell, MessageCircle, Home, Target, Award, Brain, HelpCircle, Users, Calendar, BarChart3, Search, ArrowRightLeft, Code, Palette, Calculator, BookOpen } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UserProfileSummary from '@/components/dashboard/UserProfileSummary';
import SwapRequestManager from '@/components/dashboard/SwapRequestManager';
import SmartMatchmaking from '@/components/dashboard/SmartMatchmaking';
import SessionCalendar from '@/components/dashboard/SessionCalendar';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import RatingSystem from '@/components/dashboard/RatingSystem';
import ProgressTracking from '@/components/dashboard/ProgressTracking';
import Gamification from '@/components/dashboard/Gamification';
import SearchFilters from '@/components/dashboard/SearchFilters';
import ThemePersonalization from '@/components/dashboard/ThemePersonalization';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import SettingsPage from '@/components/dashboard/SettingsPage';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import SkillAnalytics from '@/components/dashboard/SkillAnalytics';
import GoalTracker from '@/components/dashboard/GoalTracker';
import MentorshipProgram from '@/components/dashboard/MentorshipProgram';
import CertificationSystem from '@/components/dashboard/CertificationSystem';
import AILearningAssistant from '@/components/dashboard/AILearningAssistant';
import QuizSystem from '@/components/dashboard/QuizSystem';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (session?.user) {
          console.log('User is authenticated:', session.user.id);
          setUser(session.user);
          await fetchUserProfile(session.user);
        } else {
          console.log('No user session found, redirecting to home');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        if (mounted) {
          navigate('/');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;
        
        if (session?.user) {
          console.log('User authenticated via state change');
          setUser(session.user);
          await fetchUserProfile(session.user);
          setLoading(false);
        } else {
          console.log('User signed out, redirecting to home');
          setUser(null);
          setProfile(null);
          navigate('/');
        }
      }
    );

    checkAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (user: any) => {
    try {
      console.log('Fetching profile for user:', user.id);
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      const dummyProfile = {
        id: user.id,
        full_name: user.user_metadata?.full_name || 'Aarav Kumar',
        avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        bio: 'Passionate learner and teacher. Love sharing knowledge and discovering new skills!',
        level_points: 250,
        rating: 4.8,
        total_sessions: 15,
        completed_sessions: 12,
        rating_count: 8
      };
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        setProfile(dummyProfile);
      } else {
        console.log('Profile loaded successfully');
        setProfile(profileData || dummyProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSignOut = async () => {
    console.log('Signing out...');
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
  };



  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'recommendations', label: 'Recommendations', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'requests', label: 'Requests', icon: Bell },
    { id: 'matchmaking', label: 'Find Matches', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'search', label: 'Search', icon: Search },
  ];

  const DashboardSidebar = () => {
    const { state } = useSidebar();

    return (
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="p-6">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            {state === 'expanded' && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            )}
          </motion.div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tabs.map((tab) => (
                  <SidebarMenuItem key={tab.id}>
                    <SidebarMenuButton
                      onClick={() => {
                        if (tab.id === 'chat') {
                          navigate('/chat');
                        } else {
                          setActiveTab(tab.id);
                        }
                      }}
                      tooltip={state === 'collapsed' ? tab.label : undefined}
                      className={`w-full ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {state === 'expanded' && <span>{tab.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 space-y-3">
          <div className="flex items-center space-x-3 p-2">
            <img
              src={profile?.avatar_url}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
            {state === 'expanded' && (
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {profile?.full_name}
                </p>
                <p className="text-xs text-gray-500">Level {Math.floor((profile?.level_points || 0) / 100) + 1}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-start p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            {state === 'expanded' && <span className="ml-2">Sign Out</span>}
          </button>
        </SidebarFooter>
      </Sidebar>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-50 to-purple-50">
        <DashboardSidebar />
        
        <div className="flex-1">
          {/* Header */}
          <motion.header
            className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center py-4 px-6">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  SkillSwap Dashboard
                </motion.h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <NotificationCenter />
                <button
                  onClick={() => navigate('/chat')}
                  className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  title="Open Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <DashboardOverview profile={profile} />}
              {activeTab === 'recommendations' && <PersonalizedRecommendations />}
              {activeTab === 'analytics' && <SkillAnalytics />}
              {activeTab === 'goals' && <GoalTracker />}
              {activeTab === 'mentorship' && <MentorshipProgram />}
              {activeTab === 'certificates' && <CertificationSystem />}
              {activeTab === 'ai-assistant' && <AILearningAssistant />}
              {activeTab === 'quizzes' && <QuizSystem />}
              {activeTab === 'requests' && <SwapRequestManager />}
              {activeTab === 'matchmaking' && <SmartMatchmaking />}
              {activeTab === 'calendar' && <SessionCalendar />}
              {activeTab === 'progress' && <ProgressTracking profile={profile} />}
              {activeTab === 'achievements' && <Gamification profile={profile} />}
              {activeTab === 'search' && <SearchFilters />}
              {activeTab === 'settings' && <SettingsPage />}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
