
import React from 'react';
import { BlurOverlay } from './BlurOverlay';
import { prepChecklistData } from '@/data/prepChecklistData';

interface PrepChecklistProps {
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

export const PrepChecklist: React.FC<PrepChecklistProps> = ({ isUnlocked, onUnlockClick }) => {
  const ChecklistContent = () => (
    <div>
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-8 text-center">
        Homeowner Prep Checklist
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {prepChecklistData.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-black text-white p-4 text-center">
              <h3 className="font-inter-tight font-semibold text-lg uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">☐</span>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Pro Tip:</strong> Set up a dedicated folder (digital or physical) to keep all photos, reports, contracts, and correspondence in one place. This will save massive headaches if anything goes wrong or you need warranty service later.
        </p>
      </div>
    </div>
  );

  return (
    <section id="prep-checklist" className="mb-18 md:mb-24">
      <BlurOverlay 
        isUnlocked={isUnlocked} 
        onUnlockClick={onUnlockClick}
        showTeaser={true}
        teaserText="Three-phase checklist: Before, During, and After..."
      >
        <ChecklistContent />
      </BlurOverlay>
    </section>
  );
};
