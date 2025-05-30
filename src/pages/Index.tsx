
import React, { useState, useEffect } from 'react';
import { OptInGate } from '@/components/OptInGate';
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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    // Check if user has already unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
      setShowGate(false);
    }
  }, []);

  const handleOptIn = (data: { name: string; email: string; utm_source?: string }) => {
    console.log('Lead captured:', data);
    
    // Track analytics events
    if (typeof window !== 'undefined' && 'gtag' in window) {
      gtag('event', 'LeadMagnetDownloaded', {
        currency: 'USD',
        value: 0,
      });
    }
    
    // Store unlock state
    localStorage.setItem('elite12_unlocked', 'true');
    setIsUnlocked(true);
    setShowGate(false);
    
    // Smooth scroll to content
    setTimeout(() => {
      document.getElementById('main-content')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 300);
  };

  const scrollToGate = () => {
    if (!isUnlocked && showGate) {
      document.getElementById('opt-in-gate')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter">
      <ProgressBar />
      
      {showGate && !isUnlocked && (
        <OptInGate 
          id="opt-in-gate"
          onSubmit={handleOptIn} 
        />
      )}
      
      <div id="main-content" className={isUnlocked ? 'animate-fade-in' : ''}>
        <Navigation />
        
        <main className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-12">
          <CoverHero />
          <HowToUse />
          <Elite12Questions isUnlocked={isUnlocked} onUnlockClick={scrollToGate} />
          <CheatSheet isUnlocked={isUnlocked} onUnlockClick={scrollToGate} />
          <PrepChecklist isUnlocked={isUnlocked} onUnlockClick={scrollToGate} />
          <Glossary isUnlocked={isUnlocked} onUnlockClick={scrollToGate} />
          <DownloadSection isUnlocked={isUnlocked} onUnlockClick={scrollToGate} />
        </main>
        
        {!isUnlocked && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 md:hidden">
            <button
              onClick={scrollToGate}
              className="w-full bg-black text-white py-3 px-6 rounded-2xl font-medium focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Unlock All Red Flags & Pro Tips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
