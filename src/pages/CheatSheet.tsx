
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PremiumCheatSheet from '@/components/PremiumCheatSheet';

const CheatSheet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <PremiumCheatSheet />
    </div>
  );
};

export default CheatSheet;
