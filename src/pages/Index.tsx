
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ExploreSkillsSection from '@/components/ExploreSkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <div id="features">
          <ExploreSkillsSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <CTABanner />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
