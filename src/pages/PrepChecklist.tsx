
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { prepChecklistData } from '@/data/prepChecklistData';

const PrepChecklist = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Homeowner Prep Checklist
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Be prepared for every stage of the contractor selection process. Use these checklists to stay organized and ensure nothing falls through the cracks.
          </p>
        </div>

        {/* Desktop: Three columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
          {prepChecklistData.map((section, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-black text-white p-4 text-center">
                <h2 className="font-inter-tight font-semibold text-lg uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 group cursor-pointer">
                      <span className="text-lg mt-0.5 select-none group-hover:text-yellow-500 transition-colors">☐</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden space-y-6 mb-12">
          {prepChecklistData.map((section, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-black text-white p-4 text-center">
                <h2 className="font-inter-tight font-semibold text-lg uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 group cursor-pointer">
                      <span className="text-lg mt-0.5 select-none group-hover:text-yellow-500 transition-colors">☐</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2">💡 Pro Organization Tip</h3>
          <p className="text-gray-700 text-sm">
            Set up a dedicated folder (digital or physical) to keep all photos, reports, contracts, and correspondence in one place. This will save massive headaches if anything goes wrong or you need warranty service later.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrepChecklist;
