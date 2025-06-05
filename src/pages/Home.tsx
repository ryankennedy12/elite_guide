
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Check, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // In development mode, don't auto-redirect - let user see the opt-in form
    // but they can navigate freely using the navigation
  }, [navigate]);

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
        
        toast({
          title: "Success!",
          description: "Welcome! Your guide is now unlocked.",
        });
        
        // Navigate to Elite 12 Questions page
        navigate('/elite-12');
        
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

  // Check if we're in development mode - include Vite's DEV flag
  const isDevelopment = import.meta.env.DEV || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Development mode notice */}
        {isDevelopment && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              <strong>Development Mode:</strong> You can navigate freely using the navigation above, or fill out the form below to unlock content.
            </p>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
          {/* Top accent bar */}
          <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
          
          <div className="p-8 text-center">
            {/* Enhanced Headline */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                Protect Your Home: Unlock the 12 Questions<br />
                <span className="text-gray-700">Columbus Insiders Use to Vet Waterproofing Pros</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
                Discover the <em>proven</em> 12-question script Columbus waterproofing experts use to expose hidden flaws and secure reliable contractors.
              </p>
              
              {/* Enhanced urgency badge */}
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-8">
                <span className="text-lg mr-2">🚨</span>
                <span className="font-semibold">EXCLUSIVE ACCESS: Get this <em>Limited-Time</em> Resource – Absolutely FREE for Columbus Homeowners!</span>
              </div>
            </div>
            
            {/* Enhanced Locked Preview with Image */}
            <div className="mb-8 relative group">
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-300 group-hover:shadow-lg group-hover:border-yellow-300">
                {/* Background Image */}
                <div className="relative h-64 w-full">
                  <img 
                    src="/lovable-uploads/673e2590-5b67-45cc-a3d3-993323344ba4.png"
                    alt="Preview of Elite 12 Questions guide"
                    className="w-full h-full object-cover opacity-95 transition-all duration-300 group-hover:opacity-80"
                  />
                  
                  {/* Color overlay for visual hierarchy */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/5 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-purple-500/10"></div>
                </div>
                
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-white/70">
                  <div className="text-center transform transition-all duration-300 group-hover:scale-105">
                    <Lock className="w-8 h-8 text-gray-600 mb-3 transition-colors duration-300 group-hover:text-yellow-600" />
                    <p className="text-gray-700 font-medium mb-2">
                      Unlock Instant Access to the Full 12-Question Contractor Vetting Script
                    </p>
                    <p className="text-sm text-gray-500">
                      See How to Avoid Costly Basement Mistakes!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Matters Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Why This Matters For Your Home</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Hiring a basement waterproofing contractor can feel overwhelming. Without the right questions, you risk overpaying, shoddy workmanship, and even costly repairs down the line. Our exclusive script levels the playing field, empowering you with the exact insights professionals use to ensure your home's long-term protection.
              </p>
            </div>
            
            {/* Enhanced What's Inside */}
            <div className="mb-8">
              <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-6">
                What's Inside
              </h3>
              
              <div className="space-y-4 text-left max-w-sm mx-auto">
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
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1 flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">{benefit.title}:</div>
                      <span className="text-gray-700 leading-relaxed text-sm">{benefit.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 text-center border-gray-300 focus:border-gray-400 focus:ring-0 focus:outline-none rounded-xl text-lg placeholder:text-gray-400"
                    placeholder="First Name"
                  />
                </div>
                
                <div>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 text-center border-gray-300 focus:border-gray-400 focus:ring-0 focus:outline-none rounded-xl text-lg placeholder:text-gray-400"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              
              {/* Terms checkbox */}
              <div className="flex items-start justify-center space-x-3 py-4">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-gray-600 leading-5 cursor-pointer max-w-xs"
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
              
              {/* Enhanced CTA Button */}
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full h-14 bg-orange-600 text-white hover:bg-orange-700 focus:ring-0 focus:outline-none font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-lg tracking-wide hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {isSubmitting ? "PROCESSING..." : "GET MY FREE 12-QUESTION SCRIPT NOW!"}
              </Button>
            </form>
            
            {/* Enhanced Privacy notice */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Shield className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500 max-w-sm">
                Your information is 100% secure. We will never share your email.{' '}
                <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          
          {/* Bottom accent */}
          <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <div className="w-12 h-px bg-yellow-400 mx-auto mb-4 opacity-60"></div>
          <p className="text-sm text-gray-500">
            K-Sump Solutions • Waterproofing Authority • Columbus, OH
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
