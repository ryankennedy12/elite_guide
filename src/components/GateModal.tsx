
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GateModalProps {
  isOpen: boolean;
  onSubmit: (data: { name: string; email: string }) => void;
}

export const GateModal: React.FC<GateModalProps> = ({ isOpen, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      // Capture UTM source if present
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      
      onSubmit({ 
        name: name.trim(), 
        email: email.trim(),
        ...(utmSource && { utm_source: utmSource })
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white border border-black rounded-lg p-8 w-full max-w-[400px] animate-fade-in">
        <h3 className="font-inter-tight font-semibold text-2xl mb-6 text-center">
          Unlock Your Elite Contractor Questions
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full mt-1 rounded border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
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
              className="w-full mt-1 rounded border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="your.email@example.com"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 py-4 rounded font-medium transition-colors duration-200"
          >
            Access the Guide
          </Button>
        </form>
      </div>
    </div>
  );
};
