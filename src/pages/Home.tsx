import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
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
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is authenticated, they'll be redirected to dashboard
  if (user) {
    return null;
  }

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