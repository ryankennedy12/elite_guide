
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Check, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    // Check if user has already unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked === 'true') {
      navigate('/elite-12');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && acceptedTerms) {
      console.log('Lead captured:', { name: name.trim(), email: email.trim(), acceptedTerms });
      
      // Track analytics events
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'LeadMagnetDownloaded', {
          currency: 'USD',
          value: 0,
        });
      }
      
      // Store unlock state
      localStorage.setItem('elite12_unlocked', 'true');
      
      // Navigate to Elite 12 Questions page
      navigate('/elite-12');
    }
  };

  const isFormValid = name.trim() && email.trim() && acceptedTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
          {/* Top accent bar */}
          <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
          
          <div className="p-8 text-center">
            {/* Headline */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                Stop Basement Regret<br />
                <span className="text-gray-700">Before It Starts</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
                Get the exact 12-question script Columbus insiders use to vet waterproofing contractors.
              </p>
              
              {/* Urgency badge */}
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                LIMITED RELEASE: Free for Columbus homeowners
              </div>
            </div>
            
            {/* Locked Preview */}
            <div className="mb-8 relative">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden">
                <div className="blur-sm opacity-60">
                  <p className="text-gray-800 mb-3 font-medium">
                    <strong>Question #1:</strong> "Can you show me your diagnostic process before giving an estimate?"
                  </p>
                  <p className="text-red-600 text-sm">
                    <strong>🚩 Red Flag:</strong> "We know exactly what you need" or "It's always the same problem"
                  </p>
                </div>
                
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Lock className="w-8 h-8 text-gray-600 mb-3 animate-pulse" />
                  <p className="text-gray-700 font-medium">
                    See all 12 questions—unlock below
                  </p>
                </div>
              </div>
            </div>
            
            {/* What's Inside */}
            <div className="mb-8">
              <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-6">
                What's Inside
              </h3>
              
              <div className="space-y-4 text-left max-w-sm mx-auto">
                {[
                  'Pinpoints questions that reveal contractor red flags',
                  'Avoids hidden costs, unfinished jobs, and code violations', 
                  'Works for any type of basement, finished or not'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" strokeWidth={2.5} />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-12 text-center border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl text-lg placeholder:text-gray-400"
                    placeholder="Your full name"
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
                    className="w-full h-12 text-center border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl text-lg placeholder:text-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              {/* Terms checkbox */}
              <div className="flex items-start justify-center space-x-3 py-4">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
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
              
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full h-12 bg-gray-900 text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-base tracking-wide hover:shadow-lg transform hover:-translate-y-0.5"
              >
                UNLOCK MY GUIDE NOW
              </Button>
            </form>
            
            {/* Privacy notice */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Shield className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500 max-w-sm">
                We respect your inbox. You'll receive a short follow-up from K-Sump with bonus resources—unsubscribe any time.
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
