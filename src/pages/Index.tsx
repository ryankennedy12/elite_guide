
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OptInGate } from '@/components/OptInGate';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked === 'true') {
      navigate('/content');
    }
  }, [navigate]);

  const handleOptIn = (data: { name: string; email: string; acceptedTerms: boolean; utm_source?: string }) => {
    console.log('Lead captured:', data);
    
    // Track analytics events
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'LeadMagnetDownloaded', {
        currency: 'USD',
        value: 0,
      });
    }
    
    // Store unlock state
    localStorage.setItem('elite12_unlocked', 'true');
    
    // Navigate to content page
    navigate('/content');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <OptInGate onSubmit={handleOptIn} />
    </div>
  );
};

export default Index;
