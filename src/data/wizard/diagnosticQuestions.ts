
import { WizardQuestionItem } from './types';

export const diagnosticQuestions: WizardQuestionItem[] = [
  {
    id: 'diag-1',
    category: 'Diagnostic / Investigation',
    question: 'Can you show me exactly how you\'d diagnose or solve [the issue] in my basement?',
    proTip: 'A professional should walk you through a multi-step process: visual inspection, moisture mapping, and sometimes specialized tests (like thermal imaging or humidity readings). Ask for sample inspection reports.',
    redFlag: 'If they immediately recommend a solution without inspection, or say, "It\'s always the same process," they\'re likely just selling a one-size-fits-all fix.'
  },
  {
    id: 'diag-2',
    category: 'Diagnostic / Investigation',
    question: 'What specific tools, tests, or inspections do you use to find [the issue]?',
    proTip: 'Expect to hear terms like "moisture meter," "infrared camera," "hydrostatic pressure test," or "boroscope." Good contractors invest in diagnostic tools.',
    redFlag: 'If all they mention is a flashlight and "my experience," or refuse to name tools, be wary.'
  },
  {
    id: 'diag-3',
    category: 'Diagnostic / Investigation',
    question: 'How do you determine the underlying cause of [the issue], not just the symptoms?',
    proTip: 'They should explain how they differentiate between surface water, groundwater, plumbing leaks, and condensation. Look for mention of process-of-elimination and data-driven analysis.',
    redFlag: '"It\'s probably just groundwater" with no explanation, or jumping to conclusions based on little evidence.'
  },
  {
    id: 'diag-4',
    category: 'Diagnostic / Investigation',
    question: 'What\'s your step-by-step inspection process for [the issue]?',
    proTip: 'Look for a sequence: exterior grading check, gutter/downspout inspection, interior perimeter mapping, moisture readings, and documentation. Ask for written inspection protocols.',
    redFlag: 'Vague answers like "I just look around and I know," or skipping key areas (e.g., outside drainage).'
  },
  {
    id: 'diag-5',
    category: 'Diagnostic / Investigation',
    question: 'How do you verify your diagnosis of [the issue] is accurate?',
    proTip: 'The answer should mention before-and-after measurements, photo documentation, or even a controlled water test. Verification should be objective, not "gut feeling."',
    redFlag: 'If they say "You\'ll just see it\'s dry" or "Trust me, I know what I\'m doing," press for more specifics.'
  },
  {
    id: 'diag-6',
    category: 'Diagnostic / Investigation',
    question: 'If you can\'t find an obvious source for [the issue], what\'s your next step?',
    proTip: 'They should mention further investigation: testing in different weather, opening up finished areas, or consulting with a specialist. Persistence and willingness to dig deeper is key.',
    redFlag: '"I\'d just guess," or blaming you/the house without evidence.'
  },
  {
    id: 'diag-7',
    category: 'Diagnostic / Investigation',
    question: 'Can you show me a sample inspection report for a home with [the issue]?',
    proTip: 'They should have redacted reports, photos, or digital checklists ready. Real pros track their work.',
    redFlag: '"We don\'t do reports," "Nobody ever asks for that," or "I\'ll make one up for you later."'
  },
  {
    id: 'diag-8',
    category: 'Diagnostic / Investigation',
    question: 'What data or measurements do you collect to prove [the issue] is actually a problem?',
    proTip: 'Moisture readings, humidity percentages, crack width, hydrostatic pressure readings, and date-stamped photos. Ask for specifics.',
    redFlag: 'No mention of objective data or just "I saw it was wet."'
  },
  {
    id: 'diag-9',
    category: 'Diagnostic / Investigation',
    question: 'What factors do you consider before recommending a fix for [the issue]?',
    proTip: 'Listen for answers about foundation type, age of home, previous repairs, water table level, recent weather, homeowner\'s plans, and budget.',
    redFlag: 'Only recommends their "main product" or ignores your specific context.'
  },
  {
    id: 'diag-10',
    category: 'Diagnostic / Investigation',
    question: 'If there are multiple possible causes for [the issue], how do you narrow them down?',
    proTip: 'A pro should discuss process-of-elimination testing, staged repairs, and monitoring. Sometimes, this means starting with less invasive fixes first.',
    redFlag: '"It\'s always just one thing," or pushing the most expensive fix immediately.'
  },
  {
    id: 'diag-11',
    category: 'Diagnostic / Investigation',
    question: 'What\'s the biggest diagnostic mistake you see other contractors make with [the issue]?',
    proTip: 'Look for honesty—maybe they mention skipping root cause analysis or assuming all problems are groundwater. Self-awareness is a good sign.',
    redFlag: '"No mistakes, it\'s simple," or blaming all mistakes on homeowners.'
  },
  {
    id: 'diag-12',
    category: 'Diagnostic / Investigation',
    question: 'Do you ever bring in third-party inspectors for [the issue]? Why or why not?',
    proTip: 'The best contractors are open to third-party review, especially for complex jobs. They may even suggest it for legal, real estate, or insurance cases.',
    redFlag: '"Never, that\'s a waste of money," or gets defensive about outside eyes.'
  },
  {
    id: 'diag-13',
    category: 'Diagnostic / Investigation',
    question: 'If [the issue] only shows up in certain weather, how do you simulate those conditions to test?',
    proTip: 'They might mention hose testing, dehumidifier removal, or scheduling inspections after rain. Controlled testing is a plus.',
    redFlag: '"You just have to wait and see," or dismisses weather\'s impact.'
  },
  {
    id: 'diag-14',
    category: 'Diagnostic / Investigation',
    question: 'Can you explain how [the issue] in my house might differ from a neighbor\'s?',
    proTip: 'They should acknowledge every home is unique—soil, foundation, drainage, prior repairs. Customization matters.',
    redFlag: '"It\'s all the same around here," or "All basements are built the same."'
  },
  {
    id: 'diag-15',
    category: 'Diagnostic / Investigation',
    question: 'How do you test if [the issue] is seasonal or ongoing?',
    proTip: 'Answers might include monitoring over time, logging events, or setting up sensors.',
    redFlag: '"We just check once and decide," or reluctance to use ongoing tracking.'
  },
  {
    id: 'diag-16',
    category: 'Diagnostic / Investigation',
    question: 'What do you check first when you see [the issue]?',
    proTip: 'A thoughtful answer should start with the most likely, least invasive checks: grading, gutters, downspouts, cracks.',
    redFlag: '"We always start with demo" or ignores obvious basics.'
  },
  {
    id: 'diag-17',
    category: 'Diagnostic / Investigation',
    question: 'Are there hidden or less obvious signs of [the issue] I should look for?',
    proTip: 'They should mention subtle cues like efflorescence, warped paneling, musty odors, rusted nails, mold in corners, or paint bubbles.',
    redFlag: '"If it\'s not obvious, it\'s not there," or they can\'t name any hidden signs.'
  },
  {
    id: 'diag-18',
    category: 'Diagnostic / Investigation',
    question: 'How do you ensure you\'re not missing the real root cause when addressing [the issue]?',
    proTip: 'Double-checks, cross-referencing symptoms, reviewing photos, or even second-opinions are good. Look for process, not guesswork.',
    redFlag: '"I just know," or "We fix what we see and move on."'
  },
  {
    id: 'diag-19',
    category: 'Diagnostic / Investigation',
    question: 'Do you take photos or videos during the diagnostic process for [the issue]?',
    proTip: 'The best contractors document everything—before, during, and after. This protects both parties and proves what\'s happening.',
    redFlag: '"No need for photos," or "That\'s extra."'
  },
  {
    id: 'diag-20',
    category: 'Diagnostic / Investigation',
    question: 'If [the issue] comes back after repairs, what\'s your protocol?',
    proTip: 'You want a clear policy—follow-up inspection, warranty coverage, documentation, and transparency about next steps.',
    redFlag: '"That never happens," or "We\'d have to charge again."'
  },
  {
    id: 'future-23',
    category: 'Diagnostic / Investigation',
    question: 'Are there seasonal warning signs I should watch for regarding [the issue]?',
    proTip: 'Watch after heavy rain, rapid snowmelt, or freeze/thaw cycles—look for leaks, cracks, or sump cycling.',
    redFlag: '"Doesn\'t matter what season," or "No warning signs."'
  },
  {
    id: 'community-2',
    category: 'Diagnostic / Investigation',
    question: 'How do external factors (street drainage, sewers, neighboring properties) affect the risk of [the issue] at my house?',
    proTip: 'They should assess neighborhood drainage, elevation, and even city stormwater management in their diagnosis.',
    redFlag: '"Other properties don\'t matter," or only focuses on your basement.'
  }
];
