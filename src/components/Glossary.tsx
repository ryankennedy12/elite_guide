
import React from 'react';
import { glossaryData } from '@/data/glossaryData';

interface GlossaryProps {
  isUnlocked?: boolean;
  onUnlockClick?: () => void;
}

export const Glossary: React.FC<GlossaryProps> = () => {
  return (
    <section id="glossary" className="mb-18 md:mb-24">
      <div>
        <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-8 text-center">
          Elite Waterproofing Glossary
        </h2>
        <p className="text-center text-gray-600 mb-8 italic">
          All the key terms you'll need for contractor meetings—organized for real homeowners, not engineers.
        </p>
        
        <div className="space-y-6">
          {glossaryData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-t-4 border-yellow-500 bg-white pt-4">
              <h3 className="font-inter-tight font-bold text-xl mb-4">
                {section.section}
              </h3>
              <div className="grid md:grid-cols-1 gap-y-3">
                {section.terms.map((item, index) => (
                  <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                    <dt className="font-semibold text-black">{item.term}:</dt>
                    <dd className="text-gray-700 text-sm mt-1">{item.definition}</dd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
