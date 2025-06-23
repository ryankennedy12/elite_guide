
import React from 'react';
import { QuestionCard } from './QuestionCard';
import { elite12Data } from '@/data/elite12Data';

interface Elite12QuestionsProps {
  isUnlocked?: boolean;
  onUnlockClick?: () => void;
}

export const Elite12Questions: React.FC<Elite12QuestionsProps> = () => {
  return (
    <section id="elite-questions" className="mb-18 md:mb-24">
      <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-12 text-center">
        The Elite 12 Questions
      </h2>
      
      <div className="space-y-12">
        {elite12Data.map((question, index) => (
          <div key={index}>
            <QuestionCard
              number={index + 1}
              question={question.question}
              why={question.why}
              redFlags={question.redFlags}
              followUp={question.followUp}
              proTip={question.proTip}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
