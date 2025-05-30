
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Check } from 'lucide-react';

interface OptInGateProps {
  onSubmit: (data: { name: string; email: string; acceptedTerms: boolean; utm_source?: string }) => void;
}

export const OptInGate: React.FC<OptInGateProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && acceptedTerms) {
      // Capture UTM source if present
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      
      onSubmit({ 
        name: name.trim(), 
        email: email.trim(),
        acceptedTerms,
        ...(utmSource && { utm_source: utmSource })
      });
    }
  };

  // Validate form for button state
  const isFormValid = name.trim() && email.trim() && email.includes('@') && acceptedTerms;

  return (
    <div className="bg-white rounded-lg w-full max-w-[400px] md:max-w-[600px] overflow-hidden lifted-card">
      {/* Top yellow bar */}
      <div className="w-full h-1.5 bg-yellow-500"></div>
      
      <div className="px-6 py-8 md:px-8 md:py-12">
        {/* Headline */}
        <h1 className="font-inter-tight font-bold text-black mb-2 leading-tight" style={{ fontSize: 'clamp(32px, 6vw, 44px)' }}>
          Stop Basement Regret Before It Starts.
        </h1>
        
        {/* Subheadline */}
        <p className="text-black mb-2 leading-relaxed max-w-[32ch]" style={{ fontSize: 'clamp(18px, 4.2vw, 22px)' }}>
          Get the exact 12-question script Columbus insiders use to vet waterproofing contractors. Instant access, zero cost.
        </p>
        
        {/* Scarcity/Exclusivity microcopy */}
        <p className="text-black text-sm mb-8 opacity-80">
          <strong>Free for Columbus homeowners — limited launch edition.</strong>
        </p>
        
        {/* Curiosity Teaser with Blur Preview */}
        <div className="mb-6 relative rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/061b29ba-8424-4b72-8951-226180787228.png"
            alt="Preview of waterproofing guide content"
            className="w-full h-48 object-cover filter blur-sm opacity-75"
          />
          <div className="blur-box absolute inset-0 bg-black/10">
            <div className="p-4 text-black">
              <p className="text-sm leading-relaxed">
                <strong>Why This Question Matters:</strong> Most basement jobs fail because contractors skip the diagnostic phase…
              </p>
            </div>
            <div className="lock-overlay absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Lock className="w-8 h-8 text-black animate-pulse" />
              <span className="text-sm font-medium text-black">Unlock the full answer above.</span>
            </div>
          </div>
        </div>
        
        {/* What's Inside Divider */}
        <hr className="divider w-full border-t border-gray-300 mb-4" />
        <h4 className="inside-label text-xs font-medium tracking-wider text-black mb-6 text-center">
          WHAT'S INSIDE
        </h4>
        
        {/* Benefits */}
        <ul className="space-y-3 mb-8">
          {[
            'Pinpoints the questions that reveal contractor red flags',
            'Avoids hidden costs, unfinished jobs, and code violations', 
            'Works for any type of basement, finished or not'
          ].map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-6 h-6 text-black mt-0.5 flex-shrink-0" />
              <span className="text-black">{benefit}</span>
            </li>
          ))}
        </ul>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
              className="w-full mt-1 rounded-2xl border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-lg"
              style={{ minHeight: '56px', fontSize: '18px' }}
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
              className="w-full mt-1 rounded-2xl border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-lg"
              style={{ minHeight: '56px', fontSize: '18px' }}
              placeholder="your.email@example.com"
            />
          </div>
          
          {/* Terms and Conditions Checkbox - moved above button */}
          <div className="flex items-start space-x-3 py-4">
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
            style={{ 
              padding: '20px 16px', 
              borderRadius: '8px',
              minHeight: '48px'
            }}
          >
            Unlock My Free Guide
          </Button>
        </form>
        
        {/* Privacy notice */}
        <div className="flex items-start gap-2" style={{ marginTop: '16px' }}>
          <Lock className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
          <p className="text-black" style={{ fontSize: '13px' }}>
            We respect your inbox. You'll receive a short follow-up from K-Sump with bonus resources—unsubscribe any time.
          </p>
        </div>
      </div>
      
      {/* Bottom yellow bar */}
      <div className="w-full h-1.5 bg-yellow-500"></div>
      
      {/* Company info */}
      <div className="bg-gray-50 py-4 text-center">
        <p className="text-sm text-black">
          K-Sump Solutions • Waterproofing Authority • Columbus, OH
        </p>
      </div>
    </div>
  );
};
