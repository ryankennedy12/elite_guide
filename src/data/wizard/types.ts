
export interface WizardQuestionItem {
  id: string;
  category: WizardQuestionCategory;
  question: string;
  proTip: string;
  redFlag: string;
}

export const wizardQuestionCategories = [
  'Diagnostic / Investigation',
  'System Selection',
  'Risk / Failure / Proof', 
  'Warranty / Contract',
  'Timeline / Project Management',
  'Health / Safety / Air Quality',
  'Cost & Value',
  'Compliance / Code',
  'Customer Experience',
  'Emergency / Backup'
] as const;

export type WizardQuestionCategory = typeof wizardQuestionCategories[number];

export const suggestionChips = [
  'Basement flooding',
  'Strange odors', 
  'Finished basement',
  'Flooded before'
];

export const categoryDescriptions: Record<WizardQuestionCategory, string> = {
  'Diagnostic / Investigation': 'How contractors find the root cause, not just the symptoms.',
  'System Selection': 'How they choose the right products and approach for your home.',
  'Risk / Failure / Proof': 'How they guarantee results and avoid common disasters.',
  'Warranty / Contract': 'What you\'re covered for and what happens if something goes wrong.',
  'Timeline / Project Management': 'How they manage the work, timeline, and communication.',
  'Health / Safety / Air Quality': 'Protecting your family during and after the work.',
  'Cost & Value': 'Understanding true costs and long-term value.',
  'Compliance / Code': 'Making sure everything is legal and up to standards.',
  'Customer Experience': 'How they treat you throughout the process.',
  'Emergency / Backup': 'What happens when systems fail or emergencies arise.'
};
