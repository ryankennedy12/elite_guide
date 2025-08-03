import React from 'react';
import Navigation from '@/components/Navigation';
import { HeroSection } from '@/components/Home/HeroSection';
import { HowItWorks } from '@/components/Home/HowItWorks';
import { FeatureShowcase } from '@/components/Home/FeatureShowcase';
import { SocialProof } from '@/components/Home/SocialProof';
import { FAQ } from '@/components/Home/FAQ';
import { CTA } from '@/components/Home/CTA';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main>
        <HeroSection />
        <HowItWorks />
        <FeatureShowcase />
        <SocialProof />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
};

export default Home;