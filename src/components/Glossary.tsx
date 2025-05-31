
import React from 'react';
import { BlurOverlay } from './BlurOverlay';
import { glossaryData } from '@/data/glossaryData';

interface GlossaryProps {
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

export const Glossary: React.FC<GlossaryProps> = ({ isUnlocked, onUnlockClick }) => {
  const GlossaryContent = () => (
    <div>
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-8 text-center">
        Elite Waterproofing Glossary
      </h2>
      <p className="text-center text-gray-600 mb-8 italic">
        All the key terms you'll need for contractor meetings—organized for real homeowners, not engineers.
      </p>
      
      {/* Show first section as teaser */}
      <div className="space-y-6">
        <div className="border-t-4 border-yellow-500 bg-white pt-4">
          <h3 className="font-inter-tight font-bold text-xl mb-4">
            {glossaryData[0].section}
          </h3>
          <div className="grid md:grid-cols-1 gap-y-3">
            {glossaryData[0].terms.slice(0, 6).map((item, index) => (
              <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                <dt className="font-semibold text-black">{item.term}:</dt>
                <dd className="text-gray-700 text-sm mt-1">{item.definition}</dd>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4 italic">
            ...and {glossaryData.reduce((total, section) => total + section.terms.length, 0) - 6} more essential terms
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="glossary" className="mb-18 md:mb-24">
      <BlurOverlay 
        isUnlocked={isUnlocked} 
        onUnlockClick={onUnlockClick}
        showTeaser={true}
        teaserText="Essential waterproofing terminology and definitions..."
      >
        <GlossaryContent />
      </BlurOverlay>
    </section>
  );
};
