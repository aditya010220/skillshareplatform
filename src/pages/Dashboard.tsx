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
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [calendarSelectedMember, setCalendarSelectedMember] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // If navigated here with state to open calendar, handle it
  React.useEffect(() => {
    try {
      const state = (location && (location as any).state) || {};
      if (state.openCalendar) {
        setActiveTab('calendar');
        if (state.selectedMember) setCalendarSelectedMember(state.selectedMember);
        // clear history state so repeated navigation doesn't reopen
        if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
          window.history.replaceState({}, document.title);
        }
      }
    } catch (e) {
      console.error('Failed to handle navigation state for calendar', e);
    }
  }, [location]);

  // Load cached session/profile to avoid blocking UI on navigation back
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const cachedUser = sessionStorage.getItem('ss_user');
      const cachedProfile = sessionStorage.getItem('ss_profile');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }
      if (cachedProfile) {
        setProfile(JSON.parse(cachedProfile));
      }
      if (cachedUser || cachedProfile) {
        setLoading(false);
      }
    } catch (e) {
      console.error('Error reading cached session/profile', e);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (session?.user) {
          console.log('User is authenticated:', session.user.id);
          try { sessionStorage.setItem('ss_user', JSON.stringify(session.user)); } catch (e) { console.error('Could not cache user', e); }
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
          try { sessionStorage.setItem('ss_user', JSON.stringify(session.user)); } catch (e) { console.error('Could not cache user', e); }
          setUser(session.user);
          await fetchUserProfile(session.user);
          setLoading(false);
        } else {
          console.log('User signed out, redirecting to home');
          try { sessionStorage.removeItem('ss_user'); sessionStorage.removeItem('ss_profile'); } catch (e) { /* ignore */ }
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
        console.error('Error fetching profile:', error?.message || (typeof error === 'object' ? JSON.stringify(error) : String(error)));
        setProfile(dummyProfile);
      } else {
        console.log('Profile loaded successfully');
        const finalProfile = profileData || dummyProfile;
        setProfile(finalProfile);
        try { sessionStorage.setItem('ss_profile', JSON.stringify(finalProfile)); } catch (e) { console.error('Could not cache profile', e?.message || (typeof e === 'object' ? JSON.stringify(e) : String(e))); }
      }
    } catch (error) {
      console.error('Error fetching profile:', error?.message || (typeof error === 'object' ? JSON.stringify(error) : String(error)));
      setProfile(dummyProfile);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Failed to sign out. Please try again.');
        return;
      }

      // Clear local UI state and redirect to home
      try { sessionStorage.removeItem('ss_user'); sessionStorage.removeItem('ss_profile'); } catch (e) { /* ignore */ }
      setUser(null);
      setProfile(null);
      toast.success('Signed out successfully');

      // Use router navigation; fallback to a hard redirect if routing doesn't trigger
      try {
        navigate('/');
      } catch (navErr) {
        console.error('Navigation after sign out failed:', navErr);
        window.location.assign('/');
      }
    } catch (err) {
      console.error('Sign out exception:', err);
      toast.error('An unexpected error occurred while signing out.');
    }
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
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            {state === 'expanded' && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            )}
          </motion.div>
        </SidebarHeader>

        <SidebarContent>
          {/* Main Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('overview')}
                    tooltip={state === 'collapsed' ? 'Overview' : undefined}
                    className={`w-full ${activeTab === 'overview' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Home className="w-4 h-4" />
                    {state === 'expanded' && <span>Overview</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('recommendations')}
                    tooltip={state === 'collapsed' ? 'Recommendations' : undefined}
                    className={`w-full ${activeTab === 'recommendations' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Bell className="w-4 h-4" />
                    {state === 'expanded' && <span>Recommendations</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('analytics')}
                    tooltip={state === 'collapsed' ? 'Analytics' : undefined}
                    className={`w-full ${activeTab === 'analytics' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <BarChart3 className="w-4 h-4" />
                    {state === 'expanded' && <span>Analytics</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('goals')}
                    tooltip={state === 'collapsed' ? 'Goals' : undefined}
                    className={`w-full ${activeTab === 'goals' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Target className="w-4 h-4" />
                    {state === 'expanded' && <span>Goals</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Learning Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Learning</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('ai-assistant')}
                    tooltip={state === 'collapsed' ? 'AI Assistant' : undefined}
                    className={`w-full ${activeTab === 'ai-assistant' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Brain className="w-4 h-4" />
                    {state === 'expanded' && <span>AI Assistant</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('quizzes')}
                    tooltip={state === 'collapsed' ? 'Quizzes' : undefined}
                    className={`w-full ${activeTab === 'quizzes' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <HelpCircle className="w-4 h-4" />
                    {state === 'expanded' && <span>Quizzes</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('certificates')}
                    tooltip={state === 'collapsed' ? 'Certificates' : undefined}
                    className={`w-full ${activeTab === 'certificates' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Award className="w-4 h-4" />
                    {state === 'expanded' && <span>Certificates</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('progress')}
                    tooltip={state === 'collapsed' ? 'Progress' : undefined}
                    className={`w-full ${activeTab === 'progress' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <BarChart3 className="w-4 h-4" />
                    {state === 'expanded' && <span>Progress</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Mentorship Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Mentorship</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate('/connect')}
                    tooltip={state === 'collapsed' ? 'Find Matches' : undefined}
                    className={`w-full ${activeTab === 'matchmaking' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Users className="w-4 h-4" />
                    {state === 'expanded' && <span>Find Matches</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('mentorship')}
                    tooltip={state === 'collapsed' ? 'Mentorship Requests' : undefined}
                    className={`w-full ${activeTab === 'mentorship' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <MessageCircle className="w-4 h-4" />
                    {state === 'expanded' && <span>Mentorship Requests</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Achievements Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Achievements</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('achievements')}
                    tooltip={state === 'collapsed' ? 'Achievements' : undefined}
                    className={`w-full ${activeTab === 'achievements' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Award className="w-4 h-4" />
                    {state === 'expanded' && <span>Achievements</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Search */}
          <SidebarGroup>
            <SidebarGroupLabel>Search</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab('search')}
                    tooltip={state === 'collapsed' ? 'Search' : undefined}
                    className={`w-full ${activeTab === 'search' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'hover:bg-gray-100'}`}>
                    <Search className="w-4 h-4" />
                    {state === 'expanded' && <span>Search</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>

        <SidebarFooter className="p-4 space-y-3">
          <div
            onClick={() => setActiveTab('settings')}
            title="Open Settings"
            className="flex items-center space-x-3 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
          >
            <img
              src={profile?.avatar_url}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-indigo-600"
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
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  SkillSwap Dashboard
                </motion.h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <NotificationCenter />
                <button
                  onClick={() => setActiveTab('calendar')}
                  className="px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Open Calendar"
                >
                  Calendar
                </button>
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
              {activeTab === 'calendar' && <SessionCalendar selectedPartner={calendarSelectedMember} />}
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
