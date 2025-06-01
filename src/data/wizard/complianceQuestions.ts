
import { WizardQuestionItem } from './types';

export const complianceQuestions: WizardQuestionItem[] = [
  {
    id: 'compliance-1',
    category: 'Compliance / Code',
    question: 'Is your proposed solution for [the issue] fully compliant with Columbus/Ohio codes?',
    proTip: 'They should confidently state compliance, reference specific codes, and offer to provide documentation or code sections if requested.',
    redFlag: '"Don\'t worry, no one checks," or vague answers about "industry standards" with no details.'
  },
  {
    id: 'compliance-2',
    category: 'Compliance / Code',
    question: 'What permits, if any, are needed for fixing [the issue]?',
    proTip: 'A good contractor knows what permits are needed (plumbing, electrical, structural, etc.) and will handle the paperwork or guide you through it.',
    redFlag: '"Permits are a waste of time," "We never pull permits," or avoids the question.'
  },
  {
    id: 'compliance-3',
    category: 'Compliance / Code',
    question: 'Have you ever had to redo work because it wasn\'t up to code regarding [the issue]?',
    proTip: 'Honest contractors will admit past mistakes, explain how they corrected them, and describe what\'s changed to prevent repeats.',
    redFlag: '"Never failed an inspection," or gets defensive about code violations.'
  },
  {
    id: 'compliance-4',
    category: 'Compliance / Code',
    question: 'How do you stay updated on code changes that affect [the issue]?',
    proTip: 'Listen for ongoing education, trade groups, or city/county update bulletins.',
    redFlag: '"Codes don\'t change much," or relies only on past experience.'
  },
  {
    id: 'compliance-5',
    category: 'Compliance / Code',
    question: 'Will you provide written documentation of code compliance for my records?',
    proTip: 'Good companies provide inspection reports, permit numbers, or compliance letters for your files.',
    redFlag: '"You don\'t need that," or charges extra for basic documentation.'
  },
  {
    id: 'compliance-6',
    category: 'Compliance / Code',
    question: 'Who is responsible for passing inspections related to [the issue]?',
    proTip: 'The contractor should take responsibility for all work they do—including passing final inspections.',
    redFlag: '"You\'re responsible if it fails," or tries to pass the blame if an inspector has an issue.'
  },
  {
    id: 'compliance-7',
    category: 'Compliance / Code',
    question: 'Are there national or industry standards for fixing [the issue]? How do you meet them?',
    proTip: 'They should reference IICRC, ASTM, or manufacturer guidelines, and describe how their work aligns.',
    redFlag: '"Standards don\'t matter," or can\'t name a single standard.'
  },
  {
    id: 'compliance-8',
    category: 'Compliance / Code',
    question: 'What would happen if an inspector failed your work related to [the issue]?',
    proTip: '"We would fix the issues at no extra charge and make sure it passes on re-inspection."',
    redFlag: '"It\'s unlikely," or "You\'ll have to pay for any rework."'
  },
  {
    id: 'compliance-9',
    category: 'Compliance / Code',
    question: 'How can I verify that all code and permit requirements have been met for [the issue]?',
    proTip: 'Look for offers to provide inspection cards, final approval stickers, or direct contact info for the inspector.',
    redFlag: '"You\'ll just have to trust us," or "No one really checks."'
  },
  {
    id: 'compliance-10',
    category: 'Compliance / Code',
    question: 'Are there specific Columbus/Franklin County issues I should be aware of regarding [the issue]?',
    proTip: 'They should know about regional soil, weather, or code quirks and be willing to share local expertise.',
    redFlag: '"Everywhere\'s the same," or shows zero local knowledge.'
  },
  {
    id: 'compliance-11',
    category: 'Compliance / Code',
    question: 'Do you have a history of code violations or failed inspections involving [the issue]?',
    proTip: 'Honest contractors will disclose any issues, and (if so) tell you what they learned and changed.',
    redFlag: '"That\'s private," "We never make mistakes," or gets defensive.'
  },
  {
    id: 'compliance-12',
    category: 'Compliance / Code',
    question: 'Will you coordinate with other trades (plumbers, electricians, etc.) if [the issue] overlaps their work?',
    proTip: 'The best companies will coordinate directly, ensuring all work meets code and nothing falls through the cracks.',
    redFlag: '"You have to find your own," or refuses to coordinate.'
  },
  {
    id: 'compliance-13',
    category: 'Compliance / Code',
    question: 'How do you document any code-related findings during the job for [the issue]?',
    proTip: 'They should take photos, provide written notes, and keep copies of all permits and inspection sign-offs.',
    redFlag: '"No need for documentation," or "We handle that ourselves, nothing for you to see."'
  },
  {
    id: 'compliance-14',
    category: 'Compliance / Code',
    question: 'Will you handle all permitting for [the issue], or do I need to?',
    proTip: 'Most reputable contractors handle permitting for you, or at minimum, help with the paperwork.',
    redFlag: '"Permits are your job," or tries to avoid responsibility.'
  },
  {
    id: 'compliance-15',
    category: 'Compliance / Code',
    question: 'What\'s your process for final inspection and sign-off on [the issue] jobs?',
    proTip: 'Should include scheduling with the city, walking the inspector through the job, correcting any issues, and providing you with proof of approval.',
    redFlag: '"We finish and leave," or doesn\'t mention a formal sign-off.'
  },
  {
    id: 'compliance-16',
    category: 'Compliance / Code',
    question: 'Is there any legal liability I take on if [the issue] is not fixed?',
    proTip: 'They should acknowledge possible consequences (mold liability, insurance issues, code violations) and offer to help you understand your risks.',
    redFlag: '"Not my problem," or "That\'s on you, not us."'
  },
  {
    id: 'compliance-17',
    category: 'Compliance / Code',
    question: 'Have you ever had a job stopped by the city because of [the issue]?',
    proTip: 'Honest pros will admit if this has happened, what caused it, and how they resolved it.',
    redFlag: '"Never," or gets defensive/hostile.'
  },
  {
    id: 'compliance-18',
    category: 'Compliance / Code',
    question: 'Are there city/county-specific resources or departments I should check with for [the issue]?',
    proTip: 'They should suggest city websites, code departments, or floodplain resources specific to Columbus or Franklin County.',
    redFlag: '"No idea," or unwilling to help you self-educate.'
  },
  {
    id: 'compliance-19',
    category: 'Compliance / Code',
    question: 'What is your process if the inspector requires a change to your plan for [the issue]?',
    proTip: '"We\'ll make the required changes at no additional cost, notify you, and arrange for re-inspection."',
    redFlag: '"That\'s extra," or blames inspectors for any problems.'
  },
  {
    id: 'compliance-20',
    category: 'Compliance / Code',
    question: 'Can you share a story where code compliance made or broke a project involving [the issue]?',
    proTip: 'The best will share a story where following code prevented disaster (or skipping it led to trouble), and what they learned.',
    redFlag: '"Codes are just guidelines," or "I don\'t have any stories about that."'
  }
];
