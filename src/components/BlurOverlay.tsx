
import React from 'react';
import { Lock } from 'lucide-react';

interface BlurOverlayProps {
  isUnlocked: boolean;
  onUnlockClick: () => void;
  children: React.ReactNode;
  showTeaser?: boolean;
  teaserText?: string;
}

export const BlurOverlay: React.FC<BlurOverlayProps> = ({ 
  isUnlocked, 
  onUnlockClick, 
  children, 
  showTeaser = false, 
  teaserText 
}) => {
  if (isUnlocked) {
    return <div className="animate-fade-in">{children}</div>;
  }

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-lg">
        <div 
          className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={onUnlockClick}
        >
          <Lock className="w-7 h-7 text-black mb-3 animate-pulse" />
          <p className="text-black text-center font-medium opacity-70">
            Unlock this answer—enter your name & email above.
          </p>
          {showTeaser && teaserText && (
            <p className="text-sm text-black/60 mt-2 text-center italic">
              {teaserText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
