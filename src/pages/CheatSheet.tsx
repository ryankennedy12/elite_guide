
import React from 'react';
import Navigation from '@/components/Navigation';
import PremiumCheatSheet from '@/components/PremiumCheatSheet';
import { useContentAccess } from '@/hooks/useContentAccess';

const CheatSheet = () => {
  useContentAccess();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <PremiumCheatSheet />
    </div>
  );
};

export default CheatSheet;
