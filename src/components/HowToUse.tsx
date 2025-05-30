
import React from 'react';

export const HowToUse: React.FC = () => {
  return (
    <section className="mb-18 md:mb-24">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-inter-tight font-semibold text-2xl md:text-3xl mb-4">
            How to Use This Guide
          </h2>
          <p className="text-gray-700 mb-4">
            This comprehensive guide gives you the exact questions to ask any waterproofing contractor before you hire them. Print it out, save it to your phone, or keep it handy during contractor meetings.
          </p>
          <p className="text-gray-700">
            Each question includes red flags to watch for and pro tips from industry insiders to help you make the right choice.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              1
            </div>
            <span className="text-gray-700">Print or save to your phone</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              2
            </div>
            <span className="text-gray-700">Bring to contractor meetings</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              3
            </div>
            <span className="text-gray-700">Compare answers and make informed decisions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
