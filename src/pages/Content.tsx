
import React from 'react';
import Navigation from '@/components/Navigation';
import { Elite12Questions } from '@/components/Elite12Questions';
import PremiumCheatSheet from '@/components/PremiumCheatSheet';
import { PrepChecklist } from '@/components/PrepChecklist';
import { Glossary } from '@/components/Glossary';
import { DownloadSection } from '@/components/DownloadSection';
import { ProgressBar } from '@/components/ProgressBar';
import { useContentAccess } from '@/hooks/useContentAccess';

const Content = () => {
  useContentAccess();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter">
      <ProgressBar />
      
      <div className="animate-fade-in">
        <Navigation />
        
        <main className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-12">
          <div className="text-center py-12">
            <h1 className="font-inter-tight font-bold text-3xl md:text-4xl mb-4">
              Your Elite 12 Waterproofing Guide
            </h1>
            <p className="text-gray-600 text-lg">
              Complete access to all questions, red flags, and pro tips
            </p>
          </div>
          
          <Elite12Questions isUnlocked={true} onUnlockClick={scrollToTop} />
          
          <section id="cheat-sheet" className="mb-18 md:mb-24">
            <PremiumCheatSheet />
          </section>
          
          <PrepChecklist isUnlocked={true} onUnlockClick={scrollToTop} />
          <Glossary isUnlocked={true} onUnlockClick={scrollToTop} />
          <DownloadSection isUnlocked={true} onUnlockClick={scrollToTop} />
        </main>
      </div>
    </div>
  );
};

export default Content;
