
import React from 'react';
import Navigation from '@/components/Navigation';
import WizardContainer from '@/components/QuestionMaker/WizardContainer';

const QuestionMaker = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <WizardContainer />
    </div>
  );
};

export default QuestionMaker;
