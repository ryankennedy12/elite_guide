import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cheatSheetData } from '@/data/cheatSheetData';

export const CheatSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const generatePDF = () => {
    // Track PDF generation event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      gtag('event', 'file_download', {
        file_name: 'cheat_sheet.pdf',
        file_extension: 'pdf',
      });
    }
    
    // Simple PDF generation logic (in production, use jsPDF or similar)
    window.print();
  };

  return (
    <section id="cheat-sheet" className="mb-18 md:mb-24">
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-8 text-center">
        Quick-Reference Cheat Sheet
      </h2>
      
      {/* Desktop: Bottom-right drawer */}
      <div className="hidden md:block">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-8 right-8 bg-black text-white hover:bg-gray-800 rounded-full p-4 shadow-lg z-30"
          aria-label="Open cheat sheet"
        >
          🔍 Open Cheat Sheet
        </Button>
        
        {isOpen && (
          <div className="fixed bottom-24 right-8 bg-white border border-black rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto z-40">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Quick Reference</h3>
              <div className="flex gap-2">
                <Button
                  onClick={generatePDF}
                  className="bg-yellow-500 text-black hover:bg-yellow-600 px-3 py-1 text-sm"
                >
                  📄 Export PDF
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-black hover:bg-gray-300 px-3 py-1 text-sm"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <CheatSheetTable />
          </div>
        )}
      </div>
      
      {/* Mobile: Full-width section */}
      <div className="md:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-black text-white hover:bg-gray-800 py-3 mb-4"
        >
          🔍 {isOpen ? 'Hide' : 'Show'} Cheat Sheet
        </Button>
        
        {isOpen && (
          <div className="bg-white border border-black rounded-lg p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Quick Reference</h3>
              <Button
                onClick={generatePDF}
                className="bg-yellow-500 text-black hover:bg-yellow-600 px-3 py-1 text-sm"
              >
                📄 Export PDF
              </Button>
            </div>
            
            <CheatSheetTable mobile />
          </div>
        )}
      </div>
    </section>
  );
};

const CheatSheetTable: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  return (
    <div className={mobile ? 'space-y-4' : 'overflow-x-auto'}>
      {mobile ? (
        // Mobile: Stacked cards
        cheatSheetData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded p-3 space-y-2">
            <div className="font-semibold text-sm">{item.question}</div>
            <div className="text-red-600 text-xs">Red Flag: {item.redFlag}</div>
            <div className="text-green-600 text-xs">Pro Tip: {item.proTip}</div>
          </div>
        ))
      ) : (
        // Desktop: Table
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-2 font-semibold">Question</th>
              <th className="text-left p-2 font-semibold">Red Flag</th>
              <th className="text-left p-2 font-semibold">Pro Tip</th>
            </tr>
          </thead>
          <tbody>
            {cheatSheetData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-2">{item.question}</td>
                <td className="p-2 text-red-600">{item.redFlag}</td>
                <td className="p-2 text-green-600">{item.proTip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
