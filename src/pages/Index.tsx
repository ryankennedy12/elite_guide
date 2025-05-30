
import React, { useState, useEffect } from 'react';
import { GateModal } from '@/components/GateModal';
import { CoverHero } from '@/components/CoverHero';
import { HowToUse } from '@/components/HowToUse';
import { Navigation } from '@/components/Navigation';
import { Elite12Questions } from '@/components/Elite12Questions';
import { CheatSheet } from '@/components/CheatSheet';
import { PrepChecklist } from '@/components/PrepChecklist';
import { Glossary } from '@/components/Glossary';
import { DownloadSection } from '@/components/DownloadSection';
import { ProgressBar } from '@/components/ProgressBar';

const Index = () => {
  const [isGateOpen, setIsGateOpen] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleGateSubmit = (data: { name: string; email: string }) => {
    console.log('Lead captured:', data);
    
    // Track GA4 and Meta events
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        currency: 'USD',
        value: 0,
      });
    }
    
    setIsGateOpen(false);
    setTimeout(() => {
      setShowContent(true);
      // Smooth scroll to introduction
      document.getElementById('introduction')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 300);
  };

  useEffect(() => {
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-inter">
      <ProgressBar />
      
      <GateModal 
        isOpen={isGateOpen} 
        onSubmit={handleGateSubmit} 
      />
      
      {showContent && (
        <div className="animate-fade-in">
          <Navigation />
          
          <main className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-12">
            <CoverHero />
            <HowToUse />
            <Elite12Questions />
            <CheatSheet />
            <PrepChecklist />
            <Glossary />
            <DownloadSection />
          </main>
        </div>
      )}
    </div>
  );
};

export default Index;
