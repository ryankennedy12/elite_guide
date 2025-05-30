
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
        Basement Waterproofing Glossary
      </h2>
      <p className="text-center text-gray-600 mb-8">Jargon Buster</p>
      
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
        {glossaryData.map((item, index) => (
          <div key={index} className="py-2">
            <dt className="font-semibold text-black">{item.term}:</dt>
            <dd className="text-gray-700 text-sm mt-1">{item.definition}</dd>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="glossary" className="mb-18 md:mb-24">
      <BlurOverlay 
        isUnlocked={isUnlocked} 
        onUnlockClick={onUnlockClick}
        showTeaser={true}
        teaserText="Essential terms and definitions for waterproofing..."
      >
        <GlossaryContent />
      </BlurOverlay>
    </section>
  );
};
