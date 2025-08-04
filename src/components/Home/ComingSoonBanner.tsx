import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wrench, Zap, Home, Droplets, Flame, Hammer } from 'lucide-react';

export const ComingSoonBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border-b border-yellow-500/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left side - Current status */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-foreground/80">Currently Available</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Waterproofing Contractor Vetting
            </h3>
            <p className="text-sm text-muted-foreground">
              Get instant access to proven questions and tools for vetting waterproofing contractors
            </p>
          </div>

          {/* Center divider */}
          <div className="hidden lg:block w-px h-16 bg-border"></div>

          {/* Right side - Coming soon */}
          <div className="flex-1 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-end gap-2 mb-2">
              <div className="flex gap-1">
                <Zap className="h-4 w-4 text-yellow-500" />
                <Home className="h-4 w-4 text-green-500" />
                <Flame className="h-4 w-4 text-red-500" />
                <Hammer className="h-4 w-4 text-orange-500" />
                <Wrench className="h-4 w-4 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-foreground/80">Coming Soon</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              All Trades Contractor Vetting
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              HVAC • Roofing • Electrical • Plumbing • General Contractors & More
            </p>
            
            {/* Email signup */}
            <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto lg:ml-auto lg:mr-0">
              <Input 
                placeholder="Enter email for updates" 
                className="text-sm h-9"
              />
              <Button size="sm" className="whitespace-nowrap">
                Notify Me
              </Button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Waterproofing Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <span>HVAC & Roofing (Q1 2025)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40"></div>
            <span>All Trades (2025)</span>
          </div>
        </div>
      </div>
    </div>
  );
};