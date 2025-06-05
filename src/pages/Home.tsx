
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Check, Shield, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Progressive form states
  const [currentStep, setCurrentStep] = useState(1);
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    
    // Check if we're in development mode - include Vite's DEV flag
    const isDevelopment = import.meta.env.DEV || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    if (unlocked === 'true' && !isDevelopment) {
      navigate('/elite-12');
    }
  }, [navigate]);

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Name validation
  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  // Handle email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setEmailValid(isValid);
    
    if (isValid && currentStep === 1) {
      setTimeout(() => setCurrentStep(2), 1200);
    }
  };

  // Handle name input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const isValid = validateName(value);
    setNameValid(isValid);
    
    if (isValid && currentStep === 2) {
      setTimeout(() => setCurrentStep(3), 1200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && acceptedTerms && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Capture UTM source if present
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        
        // Save lead to Supabase
        const { error } = await supabase
          .from('leads')
          .insert({
            name: name.trim(),
            email: email.trim(),
            accepted_terms: acceptedTerms,
            utm_source: utmSource
          });

        if (error) {
          console.error('Error saving lead:', error);
          toast({
            title: "Error",
            description: "There was an issue saving your information. Please try again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        console.log('Lead captured and saved to database:', { 
          name: name.trim(), 
          email: email.trim(), 
          acceptedTerms,
          utm_source: utmSource 
        });
        
        // Track analytics events
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'LeadMagnetDownloaded', {
            currency: 'USD',
            value: 0,
          });
        }
        
        // Store unlock state
        localStorage.setItem('elite12_unlocked', 'true');
        
        setShowSuccess(true);
        
        setTimeout(() => {
          toast({
            title: "Success!",
            description: "Welcome! Your guide is now unlocked.",
          });
          
          // Navigate to Elite 12 Questions page
          navigate('/elite-12');
        }, 2000);
        
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid = name.trim() && email.trim() && acceptedTerms && !isSubmitting;

  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.6); }
        }
        
        @keyframes slideInFromTop {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .hero-background {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          animation: particleFloat 6s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
        .particle:nth-child(3) { top: 60%; left: 20%; animation-delay: 2s; }
        .particle:nth-child(4) { top: 80%; left: 70%; animation-delay: 3s; }
        .particle:nth-child(5) { top: 40%; left: 90%; animation-delay: 4s; }
        
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        .golden-gradient {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 2s ease-in-out infinite;
        }
        
        .glow-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffd700, transparent);
          margin: 1rem auto 2rem;
          animation: glowPulse 2s ease-in-out infinite;
        }
        
        .premium-form {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 24px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: sticky;
          top: 40px;
        }
        
        .premium-form:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.15),
            0 15px 30px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        .neumorphic-input {
          background: #f0f0f0;
          border: none;
          box-shadow: 
            inset 8px 8px 16px rgba(0, 0, 0, 0.1),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .neumorphic-input:focus {
          box-shadow: 
            inset 8px 8px 16px rgba(0, 0, 0, 0.1),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8),
            0 0 0 3px rgba(255, 215, 0, 0.3);
          transform: translateY(-2px);
        }
        
        .neumorphic-input.valid {
          background: linear-gradient(145deg, #e8f5e8, #f0fff0);
          box-shadow: 
            inset 8px 8px 16px rgba(0, 0, 0, 0.05),
            inset -8px -8px 16px rgba(255, 255, 255, 0.9),
            0 0 0 2px rgba(34, 197, 94, 0.3);
        }
        
        .progress-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 2rem;
        }
        
        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e5e7eb;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .progress-dot.active {
          background: #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          transform: scale(1.2);
        }
        
        .progress-dot.completed {
          background: #22c55e;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
        }
        
        .golden-button {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
          background-size: 200% 200%;
          border: none;
          color: #1a1a1a;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        .golden-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 10px 30px rgba(255, 215, 0, 0.4),
            0 5px 15px rgba(255, 215, 0, 0.2);
        }
        
        .golden-button:disabled {
          opacity: 0.6;
          transform: none;
          animation: none;
        }
        
        .benefit-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .benefit-card:hover::before {
          left: 100%;
        }
        
        .security-badge {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          box-shadow: 
            inset 4px 4px 8px rgba(0, 0, 0, 0.05),
            inset -4px -4px 8px rgba(255, 255, 255, 0.9);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .security-badge:hover {
          border-color: #ffd700;
          color: #1a1a1a;
        }
        
        .step-transition {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-badge {
          animation: slideInFromTop 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }
        
        .hero-title {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
        }
        
        .hero-subtitle {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both;
        }
        
        .cta-badge {
          animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s both;
        }
        
        .success-animation {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div className="min-h-screen hero-background flex items-center justify-center p-4">
        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            {/* Development mode notice */}
            {isDevelopment && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-center">
                <p className="text-sm text-blue-800">
                  <strong>Development Mode:</strong> You can navigate freely using the navigation above, or fill out the form below to unlock content.
                </p>
              </div>
            )}

            {/* Hero Badge */}
            <div className="text-center lg:text-left hero-badge">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full text-sm font-bold mb-6">
                <span className="text-lg mr-2">🚨</span>
                EXCLUSIVE ACCESS: Limited-Time Resource – FREE for Columbus Homeowners!
              </div>
            </div>

            {/* Headlines */}
            <div className="text-center lg:text-left hero-title">
              <div className="glow-line w-16"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                <span className="gradient-text">Protect Your Home: Unlock the </span>
                <span className="golden-gradient">12 Questions</span>
                <br />
                <span className="gradient-text">Columbus Insiders Use to Vet </span>
                <span className="golden-gradient">Waterproofing Pros</span>
              </h1>
            </div>

            <div className="text-center lg:text-left hero-subtitle">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover the <em className="golden-gradient font-semibold">proven</em> 12-question script Columbus waterproofing experts use to 
                <span className="golden-gradient font-semibold"> expose hidden flaws</span> and secure reliable contractors.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-4 cta-badge">
              {[
                {
                  title: 'Expose Hidden Contractor Red Flags',
                  description: 'Instantly identify unreliable contractors before you hire them, saving you countless headaches and wasted money.'
                },
                {
                  title: 'Slash Unexpected Costs & Delays', 
                  description: 'Prevent surprise charges, unfinished work, and costly code violations by asking the right questions upfront.'
                },
                {
                  title: 'Comprehensive for Any Basement',
                  description: 'Whether your basement is finished or unfinished, these questions are universally applicable to secure expert waterproofing.'
                },
                {
                  title: 'Gain Absolute Peace of Mind',
                  description: 'Confidently select a reliable contractor knowing you\'ve asked every crucial question to ensure a successful, lasting job.'
                }
              ].map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center mt-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-black" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-2">{benefit.title}:</div>
                      <span className="text-gray-700 leading-relaxed text-sm">{benefit.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why This Matters Section */}
            <div className="benefit-card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why This Matters For Your Home</h3>
              <p className="text-gray-700 leading-relaxed">
                Hiring a basement waterproofing contractor can feel overwhelming. Without the right questions, you risk overpaying, shoddy workmanship, and even costly repairs down the line. Our exclusive script levels the playing field, empowering you with the exact insights professionals use to ensure your home's long-term protection.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="premium-form p-8">
            {showSuccess ? (
              <div className="text-center success-animation">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Success!</h3>
                <p className="text-gray-600 mb-6">Your 12-Question Script is being prepared. Redirecting you now...</p>
                <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : (
              <>
                {/* Progress Dots */}
                <div className="progress-dots">
                  <div className={`progress-dot ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}></div>
                  <div className={`progress-dot ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}></div>
                  <div className={`progress-dot ${currentStep >= 3 ? 'active' : ''}`}></div>
                </div>

                {/* Locked Preview */}
                <div className="mb-8 relative group">
                  <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-300 group-hover:shadow-lg group-hover:border-yellow-300">
                    <div className="relative h-48 w-full">
                      <img 
                        src="/lovable-uploads/673e2590-5b67-45cc-a3d3-993323344ba4.png"
                        alt="Preview of Elite 12 Questions guide"
                        className="w-full h-full object-cover opacity-95 transition-all duration-300 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/5 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-purple-500/10"></div>
                    </div>
                    
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-white/70">
                      <div className="text-center transform transition-all duration-300 group-hover:scale-105">
                        <Lock className="w-8 h-8 text-gray-600 mb-3 transition-colors duration-300 group-hover:text-yellow-600" />
                        <p className="text-gray-700 font-bold mb-2">
                          Unlock Instant Access to the Full 12-Question Contractor Vetting Script
                        </p>
                        <p className="text-sm text-gray-500">
                          See How to Avoid Costly Basement Mistakes!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progressive Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Email */}
                  {currentStep >= 1 && (
                    <div className="step-transition">
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          inputMode="email"
                          value={email}
                          onChange={handleEmailChange}
                          required
                          disabled={isSubmitting}
                          className={`neumorphic-input w-full h-14 text-lg px-6 ${emailValid ? 'valid' : ''}`}
                          placeholder="Enter your email address"
                        />
                        {emailValid && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Name */}
                  {currentStep >= 2 && (
                    <div className="step-transition">
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          required
                          disabled={isSubmitting}
                          className={`neumorphic-input w-full h-14 text-lg px-6 ${nameValid ? 'valid' : ''}`}
                          placeholder="Enter your first name"
                        />
                        {nameValid && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Terms & Submit */}
                  {currentStep >= 3 && (
                    <div className="step-transition space-y-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={acceptedTerms}
                          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                        <Label 
                          htmlFor="terms" 
                          className="text-sm text-gray-600 leading-5 cursor-pointer"
                        >
                          I accept the{' '}
                          <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                            terms and conditions
                          </a>
                          {' '}and{' '}
                          <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                            privacy policy
                          </a>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid}
                        className="golden-button w-full h-16 text-lg font-bold tracking-wide rounded-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin w-6 h-6 border-3 border-current border-t-transparent rounded-full mr-3"></div>
                            PROCESSING...
                          </div>
                        ) : (
                          "GET MY FREE 12-QUESTION SCRIPT NOW!"
                        )}
                      </Button>
                    </div>
                  )}
                </form>

                {/* Security Badges */}
                <div className="grid grid-cols-3 gap-3 mt-8">
                  <div className="security-badge text-center">
                    <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                    <span className="text-xs font-medium">SSL Secure</span>
                  </div>
                  <div className="security-badge text-center">
                    <span className="text-lg mb-1 block">🚫</span>
                    <span className="text-xs font-medium">No Spam</span>
                  </div>
                  <div className="security-badge text-center">
                    <span className="text-lg mb-1 block">🛡️</span>
                    <span className="text-xs font-medium">GDPR Safe</span>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">
                    Your information is 100% secure. We will never share your email.{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-12 h-px bg-yellow-400 mx-auto mb-4 opacity-60"></div>
          <p className="text-sm text-gray-400">
            K-Sump Solutions • Waterproofing Authority • Columbus, OH
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
