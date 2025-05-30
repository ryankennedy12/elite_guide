
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[400px] md:max-w-[500px] overflow-hidden animate-fade-in" style={{ marginTop: '-24px' }}>
        {/* Top yellow accent bar */}
        <div className="w-full h-1.5 bg-yellow-500"></div>
        
        <div className="p-6 md:p-8">
          {/* Headline */}
          <h1 className="font-inter-tight font-bold text-black mb-2 leading-tight" style={{ fontSize: 'clamp(32px, 6vw, 44px)' }}>
            Stop Basement Regret Before It Starts.
          </h1>
          
          {/* Subheadline */}
          <p className="text-black mb-2 leading-relaxed max-w-[32ch]" style={{ fontSize: 'clamp(18px, 4.2vw, 22px)' }}>
            Get the exact 12-question script Columbus insiders use to vet waterproofing contractors. Instant access, zero cost.
          </p>
          
          {/* Scarcity message */}
          <p className="text-black opacity-80 text-sm mb-6">
            <strong>Free for Columbus homeowners — limited launch edition.</strong>
          </p>
          
          {/* Blurred Preview/Teaser Box */}
          <div className="mb-6 relative rounded-lg overflow-hidden border border-gray-200">
            <div className="p-4 blur-box">
              <p className="text-black mb-2">
                <strong>Why This Question Matters:</strong> Most basement jobs fail because contractors skip the diagnostic phase and assume they know the problem. Without proper moisture mapping and hydrostatic pressure testing, you're gambling with your home's foundation...
              </p>
              <p className="text-red-600 text-sm">
                <strong>🚩 Red Flag:</strong> "It's always the same problem" or "We know exactly what you need"
              </p>
            </div>
            <div className="lock-overlay">
              <Lock className="w-8 h-8 text-black animate-pulse" style={{ animationDuration: '2.5s' }} />
              <span className="text-black text-sm font-medium text-center">
                Unlock all answers instantly—enter your name and email below.
              </span>
            </div>
          </div>
          
          {/* Divider and What's Inside */}
          <hr className="w-full h-px bg-gray-300 border-0 mb-3" />
          <h4 className="text-xs uppercase tracking-wider text-black font-medium mb-4 text-center">
            WHAT'S INSIDE
          </h4>
          
          {/* Benefits */}
          <ul className="space-y-3 mb-6">
            {[
              'Pinpoints the questions that reveal contractor red flags',
              'Avoids hidden costs, unfinished jobs, and code violations', 
              'Works for any type of basement, finished or not'
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-black mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="text-black">{benefit}</span>
              </li>
            ))}
          </ul>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div>
              <Label htmlFor="name" className="text-black font-medium">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-lg"
                style={{ minHeight: '56px', fontSize: '18px', borderRadius: '8px' }}
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-black font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-lg"
                style={{ minHeight: '56px', fontSize: '18px', borderRadius: '8px' }}
                placeholder="your.email@example.com"
              />
            </div>
            
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start space-x-3 py-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-1"
              />
              <Label 
                htmlFor="terms" 
                className="text-sm text-black leading-5 cursor-pointer"
              >
                I accept the{' '}
                <a href="#" className="underline hover:text-gray-600">
                  terms and conditions
                </a>
                {' '}and{' '}
                <a href="#" className="underline hover:text-gray-600">
                  privacy policy
                </a>
                {' '}*
              </Label>
            </div>
            
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', padding: '20px 0', borderRadius: '8px' }}
            >
              Unlock My Guide Now
            </Button>
          </form>
          
          {/* Privacy notice */}
          <div className="flex items-start gap-2 mb-6" style={{ marginTop: '16px' }}>
            <Lock className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
            <p className="text-black" style={{ fontSize: '13px' }}>
              We respect your inbox. You'll receive a short follow-up from K-Sump with bonus resources—unsubscribe any time.
            </p>
          </div>
        </div>
        
        {/* Bottom yellow accent bar */}
        <div className="w-full h-1.5 bg-yellow-500"></div>
        
        {/* Company info */}
        <div className="bg-gray-50 py-3 text-center">
          <p className="text-sm text-black">
            K-Sump Solutions • Waterproofing Authority • Columbus, OH
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
