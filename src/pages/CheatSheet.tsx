
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { EnhancedCheatSheet } from '@/components/EnhancedCheatSheet';
import { ProgressBar } from '@/components/ProgressBar';

const CheatSheet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter">
      <ProgressBar />
      
      <div className="animate-fade-in">
        <Navigation />
        
        <main className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-12">
          <EnhancedCheatSheet isUnlocked={true} onUnlockClick={scrollToTop} />
        </main>
      </div>
    </div>
  );
};

export default CheatSheet;
