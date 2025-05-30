
import React from 'react';
import { Button } from '@/components/ui/button';
import { BlurOverlay } from './BlurOverlay';

interface DownloadSectionProps {
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ isUnlocked, onUnlockClick }) => {
  const handleDownload = () => {
    // Track download event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      gtag('event', 'LeadMagnetDownloaded', {
        file_name: 'waterproofing_guide.pdf',
        file_extension: 'pdf',
      });
    }
    
    // In production, this would generate and download a proper PDF
    // For now, we'll trigger the browser's print dialog
    window.print();
  };

  const DownloadContent = () => (
    <div>
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-8 text-center">
        Take This Guide With You
      </h2>
      
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-center">
        Download the complete guide as a PDF to print, save, or share. Perfect for bringing to contractor meetings or keeping as a reference during your waterproofing project.
      </p>
      
      <div className="text-center">
        <Button
          onClick={handleDownload}
          className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 px-8 py-4 text-lg font-medium transition-colors duration-200 rounded-2xl"
        >
          📄 Download Full Guide (PDF)
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Includes all 12 questions, red flags, pro tips, cheat sheet, and prep checklist
      </p>
    </div>
  );

  return (
    <section id="download" className="mb-18 md:mb-24">
      <BlurOverlay 
        isUnlocked={isUnlocked} 
        onUnlockClick={onUnlockClick}
        showTeaser={true}
        teaserText="Download the complete PDF guide..."
      >
        <DownloadContent />
      </BlurOverlay>
    </section>
  );
};
