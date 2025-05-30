
import React from 'react';
import { glossaryData } from '@/data/glossaryData';

export const Glossary: React.FC = () => {
  return (
    <section id="glossary" className="mb-18 md:mb-24">
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
    </section>
  );
};
