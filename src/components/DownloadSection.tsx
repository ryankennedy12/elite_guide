
import React from 'react';
import { Button } from '@/components/ui/button';

export const DownloadSection: React.FC = () => {
  const handleDownload = () => {
    // Track download event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'file_download', {
        file_name: 'waterproofing_guide.pdf',
        file_extension: 'pdf',
      });
    }
    
    // In production, this would generate and download a proper PDF
    // For now, we'll trigger the browser's print dialog
    window.print();
  };

  return (
    <section id="download" className="mb-18 md:mb-24 text-center">
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-8">
        Take This Guide With You
      </h2>
      
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
        Download the complete guide as a PDF to print, save, or share. Perfect for bringing to contractor meetings or keeping as a reference during your waterproofing project.
      </p>
      
      <Button
        onClick={handleDownload}
        className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 px-8 py-4 text-lg font-medium transition-colors duration-200"
      >
        📄 Download Full Guide (PDF)
      </Button>
      
      <p className="text-sm text-gray-500 mt-4">
        Includes all 12 questions, red flags, pro tips, cheat sheet, and prep checklist
      </p>
    </section>
  );
};
