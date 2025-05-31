
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Check, Shield, AlertTriangle, Target } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked === 'true') {
      navigate('/elite-12');
    }
    
    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      {/* Main container with glassmorphism */}
      <div className={`relative w-full max-w-lg mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
          {/* Top yellow accent bar */}
          <div className="w-full h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
          
          <div className="p-8 md:p-12 text-center">
            {/* Hero Headlines */}
            <div className="mb-8">
              <h1 className="font-inter-tight font-black text-black mb-4 leading-[1.1]" style={{ fontSize: 'clamp(26px, 6vw, 36px)' }}>
                Stop Basement <span className="relative">Regret<span className="absolute -inset-1 bg-yellow-400/20 rounded-lg -z-10"></span></span><br />
                Before It Starts.
              </h1>
              
              <p className="text-black/80 text-lg leading-relaxed mb-6 max-w-md mx-auto">
                Instantly access the exact questions Columbus homeowners use to outsmart waterproofing contractors. No jargon, no sales pitch, just pure insider strategy.
              </p>
              
              {/* Urgency badge */}
              <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-8">
                LIMITED RELEASE: Free for Columbus homeowners
              </div>
            </div>
            
            {/* Locked Content Preview */}
            <div className="mb-8 relative">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden">
                <div className="blur-sm opacity-60">
                  <div className="text-left mb-3">
                    <strong className="text-black">Question #1:</strong> Can you show me exactly how you'd diagnose the root cause of water intrusion in my basement?
                  </div>
                  <div className="text-red-600 text-sm">
                    <strong>🚩 Red Flag:</strong> "It's always the same problem" or "We know exactly what you need"
                  </div>
                </div>
                
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Lock className="w-8 h-8 text-black mb-3 animate-pulse" style={{ animationDuration: '2s' }} />
                  <span className="text-black font-semibold text-center px-4">
                    See the game-changing questions—locked until you enter your info.
                  </span>
                </div>
              </div>
            </div>
            
            {/* What's Inside */}
            <div className="mb-8">
              <div className="space-y-4">
                {[
                  { icon: AlertTriangle, text: 'Instantly spot contractor red flags' },
                  { icon: Shield, text: 'Avoid hidden costs and unfinished jobs' },
                  { icon: Target, text: 'Works for ANY basement—finished or not' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-center gap-4 transition-all duration-500 delay-${index * 200}`}
                    style={{ 
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                  >
                    <item.icon className="w-6 h-6 text-black flex-shrink-0" strokeWidth={2} />
                    <span className="text-black font-medium text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Divider */}
              <div className="w-24 h-px bg-gray-300 mx-auto mt-8"></div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-14 text-center text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-200 bg-white"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 text-center text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-200 bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              {/* Terms checkbox */}
              <div className="flex items-start justify-center space-x-3 py-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1 border-2 border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-black/70 leading-5 cursor-pointer text-center max-w-xs"
                >
                  I accept the{' '}
                  <a href="#" className="underline hover:text-black transition-colors">
                    terms and conditions
                  </a>
                  {' '}and{' '}
                  <a href="#" className="underline hover:text-black transition-colors">
                    privacy policy
                  </a>
                </Label>
              </div>
              
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full h-14 bg-black text-white hover:bg-gray-900 focus:ring-4 focus:ring-yellow-400/30 font-bold text-lg uppercase tracking-wider rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-yellow-400/20 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Unlock My Guide Now
              </Button>
            </form>
            
            {/* Privacy notice */}
            <p className="text-sm text-black/60 mt-6 leading-relaxed max-w-sm mx-auto">
              We respect your inbox. You'll receive a short follow-up from K-Sump with bonus resources—unsubscribe any time.
            </p>
          </div>
          
          {/* Bottom yellow accent */}
          <div className="w-full h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
        </div>
        
        {/* Yellow glow under card */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-yellow-400/30 blur-xl rounded-full"></div>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-black/40">
          K-Sump Solutions • Waterproofing Authority • Columbus, OH
        </p>
      </div>
    </div>
  );
};

export default Home;
