
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { cheatSheetData } from '@/data/cheatSheetData';

const CheatSheet = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const generatePDF = () => {
    // Track PDF generation event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'file_download', {
        file_name: 'elite_12_cheat_sheet.pdf',
        file_extension: 'pdf',
      });
    }
    
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Quick Reference Cheat Sheet
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            All 12 questions at a glance with key red flags and pro tips. Perfect for printing or mobile reference during contractor meetings.
          </p>
          
          <Button
            onClick={generatePDF}
            className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mb-8"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left p-4 font-semibold w-2/5">Question</th>
                <th className="text-left p-4 font-semibold w-1/3">Key Red Flag</th>
                <th className="text-left p-4 font-semibold w-1/4">Pro Tip</th>
              </tr>
            </thead>
            <tbody>
              {cheatSheetData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-black">{item.question}</td>
                  <td className="p-4 text-red-600 text-sm">{item.redFlag}</td>
                  <td className="p-4 text-green-600 text-sm">{item.proTip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {cheatSheetData.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-black text-sm mb-1">
                    Q{index + 1}. {item.question}
                  </h3>
                </div>
                <div>
                  <span className="text-xs font-medium text-red-700 uppercase tracking-wider">Red Flag:</span>
                  <p className="text-red-600 text-sm mt-1">{item.redFlag}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-green-700 uppercase tracking-wider">Pro Tip:</span>
                  <p className="text-green-600 text-sm mt-1">{item.proTip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-black mb-2">Print-Friendly Version</h3>
            <p className="text-gray-700 text-sm">
              Use the Download PDF button to get a printer-optimized version of this cheat sheet. 
              Take it with you to every contractor meeting for quick reference.
            </p>
          </div>
        </div>
      </main>

      {/* Sticky mobile reference button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black text-white hover:bg-gray-800 rounded-full w-14 h-14 shadow-lg"
        >
          📋
        </Button>
      </div>
    </div>
  );
};

export default CheatSheet;
