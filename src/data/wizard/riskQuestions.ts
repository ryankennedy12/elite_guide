
import { WizardQuestionItem } from './types';

export const riskQuestions: WizardQuestionItem[] = [
  {
    id: 'risk-1',
    category: 'Risk / Failure / Proof',
    question: 'How many times have you fixed [the issue] in the past year?',
    proTip: 'Pros can tell you how many similar jobs they\'ve done recently, and maybe offer a range or sample list.',
    redFlag: '"I\'m not sure," "We do everything," or avoids specifics about their track record.'
  },
  {
    id: 'risk-2', 
    category: 'Risk / Failure / Proof',
    question: 'Can you share a story about your most challenging [the issue] job?',
    proTip: 'The best contractors have memorable stories—what went wrong, how they solved it, and what they learned.',
    redFlag: '"All my jobs go smooth," or refuses to discuss past difficulties.'
  },
  {
    id: 'risk-3',
    category: 'Risk / Failure / Proof', 
    question: 'Do you have before-and-after photos from jobs involving [the issue]?',
    proTip: 'They should show or provide digital/photo evidence, ideally with descriptions or context.',
    redFlag: '"We don\'t take photos," or tries to show unrelated work.'
  },
  {
    id: 'risk-4',
    category: 'Risk / Failure / Proof',
    question: 'What was the toughest case of [the issue] you\'ve encountered, and what did you learn?',
    proTip: 'Good contractors are honest about their hardest jobs, including what they\'d do differently now.',
    redFlag: '"We\'ve never had a tough case," or blames the homeowner for any problems.'
  },
  {
    id: 'risk-5',
    category: 'Risk / Failure / Proof',
    question: 'Have you ever failed to fix [the issue] on the first try? How did you handle it?',
    proTip: 'Look for admission of a real mistake, a process for troubleshooting, and a commitment to standing by their work.',
    redFlag: '"I\'ve never had a callback," or "That\'s always the homeowner\'s fault."'
  },
  {
    id: 'risk-6',
    category: 'Risk / Failure / Proof',
    question: 'Do you have any references or testimonials from homeowners with [the issue]?',
    proTip: 'They should offer recent, relevant references—ideally with contact info (with permission).',
    redFlag: '"I don\'t give out customer info," or references are outdated or generic.'
  },
  {
    id: 'risk-7',
    category: 'Risk / Failure / Proof',
    question: 'Can I speak with a past client who had [the issue]?',
    proTip: 'Reputable pros have at least a few satisfied clients willing to talk about their experience.',
    redFlag: '"Nobody wants to be bothered," or avoids providing real references.'
  },
  {
    id: 'risk-8',
    category: 'Risk / Failure / Proof',
    question: 'What\'s the most common cause of [the issue] you\'ve found?',
    proTip: 'Expect a thoughtful answer (e.g., "In Columbus, it\'s often poor grading or failed gutters, but it varies by neighborhood and era.").',
    redFlag: '"It\'s always the same thing everywhere," or vague answers that don\'t match your situation.'
  },
  {
    id: 'risk-9',
    category: 'Risk / Failure / Proof',
    question: 'What\'s the most surprising hidden cause of [the issue] you\'ve discovered?',
    proTip: 'Listen for insightful or unusual stories that show their expertise—like hidden plumbing leaks or neighbor drainage issues.',
    redFlag: '"Never seen a surprise," or "It\'s always obvious."'
  },
  {
    id: 'risk-10',
    category: 'Risk / Failure / Proof',
    question: 'Do you keep track of warranty calls related to [the issue]? What\'s your rate?',
    proTip: 'Good companies monitor warranty work, can quote their callback rate, and are honest about what goes wrong.',
    redFlag: '"No idea," "We don\'t track that," or "We never have callbacks."'
  },
  {
    id: 'risk-11',
    category: 'Risk / Failure / Proof',
    question: 'What\'s your proudest "save" when it comes to fixing [the issue]?',
    proTip: 'They should light up sharing a success—maybe a disaster averted or a family helped. Bonus if they relate it to your type of problem.',
    redFlag: '"They\'re all the same," or makes it about money, not outcomes.'
  },
  {
    id: 'risk-12',
    category: 'Risk / Failure / Proof',
    question: 'Have you ever turned down a job because [the issue] was too risky or complicated?',
    proTip: 'Honest contractors know their limits and will refer or decline jobs that aren\'t a good fit.',
    redFlag: '"We take every job," or "Nothing is ever too complicated for us."'
  },
  {
    id: 'risk-13',
    category: 'Risk / Failure / Proof',
    question: 'What\'s the fastest you\'ve fixed [the issue]? What made it possible?',
    proTip: 'Should describe a case where their prep, crew, or unique skills sped up the process—without cutting corners.',
    redFlag: '"We always fix things fast," or avoids specifics about their process.'
  },
  {
    id: 'risk-14',
    category: 'Risk / Failure / Proof',
    question: 'What was your longest-running [the issue] case, and what was the ultimate fix?',
    proTip: 'Listen for honesty about jobs that took time, why, and how they eventually solved it.',
    redFlag: '"We never have long jobs," or blames delays on the homeowner without details.'
  },
  {
    id: 'risk-15',
    category: 'Risk / Failure / Proof',
    question: 'What do most homeowners get wrong about [the issue] when they first call you?',
    proTip: 'Insightful contractors can educate you on myths or common misperceptions—like mistaking condensation for leaks.',
    redFlag: '"Homeowners are always wrong," or "I just do what they ask."'
  },
  {
    id: 'risk-16',
    category: 'Risk / Failure / Proof',
    question: 'Has a homeowner ever made [the issue] worse before calling you? How?',
    proTip: 'They should gently share cautionary tales—like DIY mistakes or waiting too long—and what they recommend instead.',
    redFlag: '"I never see that," or only uses this to blame homeowners.'
  },
  {
    id: 'risk-17',
    category: 'Risk / Failure / Proof',
    question: 'Do you have insurance for jobs involving [the issue]?',
    proTip: 'They should have proof of general liability and workers comp, and be willing to show certificates.',
    redFlag: '"You don\'t need to worry about that," or "It\'s not required."'
  },
  {
    id: 'risk-18',
    category: 'Risk / Failure / Proof',
    question: 'Have you worked with insurance adjusters for [the issue]?',
    proTip: 'Experience with insurance claims can help you if a future issue arises; listen for familiarity with documentation and claims process.',
    redFlag: '"Never needed to," or badmouths all insurance companies.'
  },
  {
    id: 'risk-19',
    category: 'Risk / Failure / Proof',
    question: 'What certifications do you/your team hold relevant to [the issue]?',
    proTip: 'Expect specific answers—like IICRC, EPA Lead Safe, OSHA, manufacturer training, etc.',
    redFlag: '"Certifications don\'t matter," or vague claims of "lots of experience."'
  },
  {
    id: 'risk-20',
    category: 'Risk / Failure / Proof',
    question: 'Do you attend trainings or seminars about [the issue] and related issues?',
    proTip: 'Pros who regularly attend trainings are up to date on code, products, and best practices.',
    redFlag: '"No need, I know everything I need already," or "I don\'t have time for that."'
  }
];
