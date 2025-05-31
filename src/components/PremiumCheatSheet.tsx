
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer, Home, ArrowUp } from 'lucide-react';
import { enhancedCheatSheetData } from '@/data/enhancedCheatSheetData';

const PremiumCheatSheet = () => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Quick Reference Cheat Sheet
          </h1>
          <p className="text-black text-lg max-w-3xl mx-auto">
            The 12 questions every smart Columbus homeowner must ask—plus warning signs and insider tips. Print for your meeting, or use on your phone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={generatePDF}
            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium"
          >
            <Download className="w-5 h-5 mr-3" />
            Download PDF
          </Button>
          <Button
            onClick={generatePDF}
            variant="outline"
            className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-medium"
          >
            <Printer className="w-5 h-5 mr-3" />
            Print
          </Button>
        </div>

        {/* Questions Grid */}
        <div className="space-y-8">
          {enhancedCheatSheetData.map((item) => (
            <div key={item.id} className="bg-white border-t-4 border-yellow-500 rounded-none shadow-sm">
              {/* Question */}
              <div className="p-8">
                <h3 className="font-inter-tight font-bold text-xl md:text-2xl text-black mb-6 leading-tight">
                  {item.id}. {item.question}
                </h3>

                {/* Red Flag and Pro Tip Container */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Red Flag */}
                  <div>
                    <div className="bg-red-100 border-l-4 border-red-500 p-4">
                      <h4 className="font-semibold text-red-800 text-sm uppercase tracking-wider mb-2">
                        🚩 Red Flag
                      </h4>
                      <p className="text-red-700 font-medium">
                        {item.redFlag}
                      </p>
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div>
                    <div className="bg-green-100 border-l-4 border-green-500 p-4">
                      <h4 className="font-semibold text-green-800 text-sm uppercase tracking-wider mb-2">
                        💡 Pro Tip
                      </h4>
                      <p className="text-green-700 font-medium">
                        {item.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-16 pb-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-8">
            <h3 className="font-semibold text-black text-xl mb-4">Ready to Interview Contractors?</h3>
            <p className="text-gray-700 mb-6">
              Use this cheat sheet during every contractor meeting. Keep it handy on your phone or print it out for easy reference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={generatePDF}
                className="bg-black text-white hover:bg-gray-800 px-6 py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center md:hidden z-50">
        <Button
          onClick={() => window.location.href = '/'}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800"
        >
          <Home className="w-5 h-5" />
        </Button>
        <Button
          onClick={generatePDF}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800"
        >
          <Download className="w-5 h-5" />
        </Button>
        <Button
          onClick={generatePDF}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800"
        >
          <Printer className="w-5 h-5" />
        </Button>
        <Button
          onClick={scrollToTop}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default PremiumCheatSheet;
