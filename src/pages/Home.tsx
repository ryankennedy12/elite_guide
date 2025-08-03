import React from 'react';
import Navigation from '@/components/Navigation';
import { HeroSection } from '@/components/Home/HeroSection';
import { ProblemExplanation } from '@/components/Home/ProblemExplanation';
import { HowItWorks } from '@/components/Home/HowItWorks';
import { ToolTutorials } from '@/components/Home/ToolTutorials';
import { RedFlagsGuide } from '@/components/Home/RedFlagsGuide';
import { PreparationGuide } from '@/components/Home/PreparationGuide';
import { FAQ } from '@/components/Home/FAQ';
import { SimpleGetStarted } from '@/components/Home/SimpleGetStarted';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main>
        <HeroSection />
        <ProblemExplanation />
        <HowItWorks />
        <ToolTutorials />
        <RedFlagsGuide />
        <PreparationGuide />
        <FAQ />
        <SimpleGetStarted />
      </main>
    </div>
  );
};

export default Home;