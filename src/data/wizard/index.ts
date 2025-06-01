
import { diagnosticQuestions } from './diagnosticQuestions';
import { systemQuestions } from './systemQuestions';
import { riskQuestions } from './riskQuestions';
import { warrantyQuestions } from './warrantyQuestions';
import { timelineQuestions } from './timelineQuestions';
import { healthQuestions } from './healthQuestions';
import { costQuestions } from './costQuestions';
import { complianceQuestions } from './complianceQuestions';
import { customerQuestions } from './customerQuestions';
import { emergencyQuestions } from './emergencyQuestions';
import { WizardQuestionItem } from './types';

export const wizardQuestionBank: WizardQuestionItem[] = [
  ...diagnosticQuestions,
  ...systemQuestions,
  ...riskQuestions,
  ...warrantyQuestions,
  ...timelineQuestions,
  ...healthQuestions,
  ...costQuestions,
  ...complianceQuestions,
  ...customerQuestions,
  ...emergencyQuestions
];

// Re-export everything from types
export * from './types';
