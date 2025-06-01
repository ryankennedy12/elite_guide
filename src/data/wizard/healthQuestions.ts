
import { WizardQuestionItem } from './types';

export const healthQuestions: WizardQuestionItem[] = [
  {
    id: 'health-1',
    category: 'Health / Safety / Air Quality',
    question: 'Are there health risks associated with [the issue] for kids, pets, or people with allergies?',
    proTip: 'They should acknowledge health risks and explain how they protect your family during and after the work.',
    redFlag: '"No health risks," or dismisses your concerns about family safety.'
  },
  {
    id: 'health-2',
    category: 'Health / Safety / Air Quality',
    question: 'What do you do to ensure dust, mold, or contaminants from [the issue] don\'t spread during work?',
    proTip: 'Look for containment barriers, HEPA filtration, negative air pressure, and protective equipment.',
    redFlag: '"We just clean up after," or no mention of containment during work.'
  },
  {
    id: 'health-3',
    category: 'Health / Safety / Air Quality',
    question: 'If I or a family member have respiratory issues, do you change your process for [the issue]?',
    proTip: 'Good contractors will modify their approach—extra containment, scheduling, or even referrals to specialists.',
    redFlag: '"Doesn\'t matter," or refuses to accommodate health concerns.'
  },
  {
    id: 'health-4',
    category: 'Health / Safety / Air Quality',
    question: 'How do you test the air quality or cleanliness after fixing [the issue]?',
    proTip: 'They should offer air quality testing, clearance inspections, or at minimum visual verification of cleanliness.',
    redFlag: '"No need to test," or "You\'ll know if it\'s clean."'
  },
  {
    id: 'health-5',
    category: 'Health / Safety / Air Quality',
    question: 'Do you use containment barriers or HEPA filtration when fixing [the issue]?',
    proTip: 'Professional contractors use plastic barriers, negative air machines, and HEPA filters to protect your home.',
    redFlag: '"That\'s overkill," or "We just open windows."'
  },
  {
    id: 'health-6',
    category: 'Health / Safety / Air Quality',
    question: 'What are the biggest health myths about [the issue]?',
    proTip: 'They should educate you on common misconceptions and provide science-based facts about real vs. perceived risks.',
    redFlag: '"Everything you hear is true," or spreads fear without facts.'
  },
  {
    id: 'health-7',
    category: 'Health / Safety / Air Quality',
    question: 'How soon can we safely use the space after [the issue] is fixed?',
    proTip: 'They should provide specific timelines based on materials used, ventilation, and any testing required.',
    redFlag: '"Right away," without considering cure times or air quality.'
  },
  {
    id: 'health-8',
    category: 'Health / Safety / Air Quality',
    question: 'What should I do if I notice [the issue] returns after months/years?',
    proTip: 'They should provide clear guidance on early warning signs and when to call for help.',
    redFlag: '"It won\'t come back," or provides no guidance for monitoring.'
  },
  {
    id: 'health-9',
    category: 'Health / Safety / Air Quality',
    question: 'Will your team notify me if they find hazardous materials while working on [the issue]?',
    proTip: 'Yes—they should immediately stop work, notify you, and call in certified specialists for asbestos, lead, or other hazards.',
    redFlag: '"We handle everything ourselves," or "We don\'t look for that."'
  },
  {
    id: 'health-10',
    category: 'Health / Safety / Air Quality',
    question: 'Have you ever uncovered mold or asbestos while addressing [the issue]? How did you handle it?',
    proTip: 'They should describe following proper protocols—stopping work, testing, and bringing in certified specialists.',
    redFlag: '"We just remove it," or "Never found any."'
  },
  {
    id: 'health-11',
    category: 'Health / Safety / Air Quality',
    question: 'Is there a risk of cross-contamination with other areas of my home during work on [the issue]?',
    proTip: 'They should acknowledge this risk and explain their containment and protection measures.',
    redFlag: '"No risk," or doesn\'t understand cross-contamination.'
  },
  {
    id: 'health-12',
    category: 'Health / Safety / Air Quality',
    question: 'How do you make sure nothing ends up in my HVAC system during the fix for [the issue]?',
    proTip: 'They should seal return vents, use containment barriers, and may recommend temporary HVAC shutdown.',
    redFlag: '"HVAC doesn\'t matter," or no protection measures mentioned.'
  },
  {
    id: 'health-13',
    category: 'Health / Safety / Air Quality',
    question: 'What\'s your emergency protocol if something goes wrong during a [the issue] repair?',
    proTip: 'They should have clear emergency procedures—evacuation plans, emergency contacts, and immediate response protocols.',
    redFlag: '"Nothing goes wrong," or no emergency plan.'
  },
  {
    id: 'health-14',
    category: 'Health / Safety / Air Quality',
    question: 'What insurance do you carry to protect me and my family during the project?',
    proTip: 'General liability, workers comp, and pollution liability are key. They should provide certificates.',
    redFlag: '"Basic insurance," or reluctance to show coverage details.'
  },
  {
    id: 'health-15',
    category: 'Health / Safety / Air Quality',
    question: 'What\'s your policy for cleaning up work areas, especially dust or debris from [the issue]?',
    proTip: 'HEPA vacuuming, damp wiping, and proper disposal—not just sweeping or shop-vac cleanup.',
    redFlag: '"We clean as we go," or basic cleanup only.'
  },
  {
    id: 'health-16',
    category: 'Health / Safety / Air Quality',
    question: 'Will I need to vacate my home during repairs for [the issue]?',
    proTip: 'They should honestly assess whether the work requires temporary relocation and help you plan accordingly.',
    redFlag: '"Never necessary," when containment might not be sufficient.'
  },
  {
    id: 'health-17',
    category: 'Health / Safety / Air Quality',
    question: 'If [the issue] is causing odors, will your solution remove them completely?',
    proTip: 'They should address both the source and any existing odors—not just mask them.',
    redFlag: '"Odors always go away," or only treats the visible problem.'
  },
  {
    id: 'health-18',
    category: 'Health / Safety / Air Quality',
    question: 'Are your products or chemicals used in fixing [the issue] safe for pets and children?',
    proTip: 'They should use low-VOC or non-toxic products and provide safety data sheets if requested.',
    redFlag: '"Everything we use is safe," without specifics or documentation.'
  },
  {
    id: 'health-19',
    category: 'Health / Safety / Air Quality',
    question: 'Can you test for residual contamination after fixing [the issue]?',
    proTip: 'Professional contractors can arrange for air quality testing or clearance inspections post-work.',
    redFlag: '"No need to test," or "Visual inspection is enough."'
  },
  {
    id: 'health-20',
    category: 'Health / Safety / Air Quality',
    question: 'Do you recommend a third-party inspection or clearance after your work on [the issue]?',
    proTip: 'Quality contractors welcome third-party verification, especially for health-sensitive projects.',
    redFlag: '"Our work speaks for itself," or discourages outside verification.'
  }
];
