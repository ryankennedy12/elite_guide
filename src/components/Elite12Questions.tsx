
import React from 'react';
import { QuestionCard } from './QuestionCard';
import { BlurOverlay } from './BlurOverlay';
import { elite12Data } from '@/data/elite12Data';

interface Elite12QuestionsProps {
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

export const Elite12Questions: React.FC<Elite12QuestionsProps> = ({ 
  isUnlocked, 
  onUnlockClick 
}) => {
  return (
    <section id="elite-questions" className="mb-18 md:mb-24">
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-12 text-center">
        The Elite 12 Questions
      </h2>
      
      <div className="space-y-12">
        {elite12Data.map((question, index) => (
          <div key={index}>
            {/* Question is always visible */}
            <h3 className="font-inter-tight font-bold text-xl md:text-2xl mb-6 text-black">
              Q{index + 1}. {question.question}
            </h3>
            
            {/* Answer content is blurred/unlocked */}
            <BlurOverlay 
              isUnlocked={isUnlocked} 
              onUnlockClick={onUnlockClick}
              showTeaser={true}
              teaserText={`Why This Question Matters: ${question.why.substring(0, 50)}...`}
            >
              <QuestionCard
                number={index + 1}
                question={question.question}
                why={question.why}
                redFlags={question.redFlags}
                followUp={question.followUp}
                proTip={question.proTip}
                hideQuestion={true}
              />
            </BlurOverlay>
          </div>
        ))}
      </div>
      
      {!isUnlocked && (
        <div className="hidden md:block mt-8 text-center">
          <button
            onClick={onUnlockClick}
            className="bg-black text-white px-8 py-3 rounded-2xl font-medium hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
          >
            Unlock All Red Flags & Pro Tips
          </button>
        </div>
      )}
    </section>
  );
};
