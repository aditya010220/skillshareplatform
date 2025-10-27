import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Home, Users, LogIn, UserPlus } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

const AppSidebar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { state } = useSidebar();

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navigationItems = [
    {
      title: 'Features',
      icon: Home,
      onClick: () => scrollToSection('features')
    },
    {
      title: 'Success Stories',
      icon: Users,
      onClick: () => scrollToSection('testimonials')
    }
  ];

  return (
    <>
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="p-6">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            {state === 'expanded' && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            )}
          </motion.div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={item.onClick}
                      tooltip={state === 'collapsed' ? item.title : undefined}
                      className="w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      {state === 'expanded' && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 space-y-3">
          <Button
            variant="ghost"
            onClick={() => openAuthModal('signin')}
            className="w-full justify-start"
            size={state === 'collapsed' ? 'icon' : 'default'}
          >
            <LogIn className="w-4 h-4" />
            {state === 'expanded' && <span className="ml-2">Sign In</span>}
          </Button>
          
          <Button
            onClick={() => openAuthModal('signup')}
            className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            size={state === 'collapsed' ? 'icon' : 'default'}
          >
            <UserPlus className="w-4 h-4" />
            {state === 'expanded' && <span className="ml-2">Get Started</span>}
          </Button>
        </SidebarFooter>
      </Sidebar>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default AppSidebar;