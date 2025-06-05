
import React, { useState, useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { FormContainer } from './FormContainer';
import { BenefitsList } from './BenefitsList';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import styles from './OptinForm.module.css';

interface FormData {
  email: string;
  firstName: string;
  termsAccepted: boolean;
}

interface ValidationState {
  emailValid: boolean;
  nameValid: boolean;
  isSubmitting: boolean;
}

export const OptinForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    termsAccepted: false
  });
  const [validationState, setValidationState] = useState<ValidationState>({
    emailValid: false,
    nameValid: false,
    isSubmitting: false
  });
  const { toast } = useToast();

  // Auto-advance logic
  useEffect(() => {
    if (currentStep === 1 && validationState.emailValid) {
      const timer = setTimeout(() => setCurrentStep(2), 1200);
      return () => clearTimeout(timer);
    }
    if (currentStep === 2 && validationState.nameValid) {
      const timer = setTimeout(() => setCurrentStep(3), 1200);
      return () => clearTimeout(timer);
    }
  }, [validationState, currentStep]);

  const handleSubmit = async () => {
    if (!validationState.emailValid || !validationState.nameValid || !formData.termsAccepted) {
      return;
    }

    setValidationState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Capture UTM source if present
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      
      // Save lead to Supabase using existing schema
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.firstName,
          email: formData.email,
          accepted_terms: formData.termsAccepted,
          utm_source: utmSource
        });

      if (error) {
        console.error('Error saving lead:', error);
        toast({
          title: "Error",
          description: "There was an issue saving your information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Track analytics events
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'LeadMagnetDownloaded', {
          currency: 'USD',
          value: 0,
        });
      }
      
      // Store unlock state
      localStorage.setItem('elite12_unlocked', 'true');
      
      toast({
        title: "Success!",
        description: "Welcome! Your guide is now unlocked.",
      });
      
      // Navigate to Elite 12 Questions page
      window.location.href = '/elite-12';
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setValidationState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className={styles.container}>
      <HeroSection />
      <div className={styles.mainContent}>
        <BenefitsList />
        <FormContainer 
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
          validationState={validationState}
          setValidationState={setValidationState}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
