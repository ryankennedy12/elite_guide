
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

export const wizardQuestionBank: WizardQuestionItem[] = [
  // Diagnostic / Investigation (Questions 1-20)
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

  // System Selection (Questions 21-40)
  {
    id: 'sys-1',
    category: 'System Selection',
    question: 'What\'s your standard process for fixing [the issue]?',
    proTip: 'Listen for a step-by-step answer—prep, repair, verification, and clean-up. They should mention tailoring the process to your home\'s needs.',
    redFlag: '"We just get in and fix it." If they can\'t walk you through a process or only describe demolition, that\'s a problem.'
  },
  {
    id: 'sys-2',
    category: 'System Selection',
    question: 'What are the key steps that can\'t be skipped when addressing [the issue]?',
    proTip: 'They should highlight safety, site protection, root-cause repair, and quality checks. Non-negotiable steps should be explained clearly.',
    redFlag: '"Every step is important," but can\'t name any specifics—or, "Sometimes we skip stuff to save time."'
  },
  {
    id: 'sys-3',
    category: 'System Selection',
    question: 'Can you show me the materials and products you use to fix [the issue]?',
    proTip: 'The best contractors can provide cut sheets, samples, or product names/brands. They should explain why they choose them and provide documentation.',
    redFlag: '"We use whatever\'s cheapest," or can\'t provide product info. Reluctance to share brands or specs is a red flag.'
  },
  {
    id: 'sys-4',
    category: 'System Selection',
    question: 'What\'s the most important quality to look for in a product/solution for [the issue]?',
    proTip: 'Expect answers about durability, compatibility with your foundation, warranty, or proven local performance. Ask why it\'s right for your house.',
    redFlag: '"All products are the same," or vague buzzwords like "industry standard" with no specifics.'
  },
  {
    id: 'sys-5',
    category: 'System Selection',
    question: 'How do you document your work and progress on [the issue]?',
    proTip: 'They should offer photos, written reports, or digital records—before, during, and after. This protects both you and them.',
    redFlag: '"I don\'t usually do documentation," or only offers to document for an extra fee.'
  },
  {
    id: 'sys-6',
    category: 'System Selection',
    question: 'If you find a bigger issue while fixing [the issue], how do you keep me informed?',
    proTip: 'A pro will stop, document the finding, issue a change order, and discuss options with you before proceeding. They\'ll provide photos and a written scope update.',
    redFlag: '"We just fix it and bill you later," or doesn\'t mention getting your approval before extra work.'
  },
  {
    id: 'sys-7',
    category: 'System Selection',
    question: 'What are the latest innovations in fixing [the issue]?',
    proTip: 'Listen for mentions of new products, smart monitoring, advanced membranes, or evolving installation methods. Bonus if they relate it to your home.',
    redFlag: '"Nothing\'s changed in years," or shows zero curiosity about improvement.'
  },
  {
    id: 'sys-8',
    category: 'System Selection',
    question: 'How do you keep your team trained on new solutions for [the issue]?',
    proTip: 'They should mention certifications, continuing education, manufacturer training, or regular team updates.',
    redFlag: '"Training isn\'t needed," or "We\'ve been doing it the same way for 20 years."'
  },
  {
    id: 'sys-9',
    category: 'System Selection',
    question: 'Are there lower-cost alternatives for fixing [the issue]? What are their downsides?',
    proTip: 'A good contractor will explain pros/cons of different options and not just upsell you on the most expensive fix.',
    redFlag: '"There\'s only one way to do it," or refuses to discuss alternatives.'
  },
  {
    id: 'sys-10',
    category: 'System Selection',
    question: 'Can you break down the cost difference between a basic vs. best-in-class fix for [the issue]?',
    proTip: 'Good contractors provide clear comparisons (materials, lifespan, warranty, features) and let you choose.',
    redFlag: '"No difference," or only pushes the highest-margin product.'
  },

  // Risk / Failure / Proof (Questions 41-60) 
  {
    id: 'proof-1',
    category: 'Risk / Failure / Proof',
    question: 'How many times have you fixed [the issue] in the past year?',
    proTip: 'Pros can tell you how many similar jobs they\'ve done recently, and maybe offer a range or sample list.',
    redFlag: '"I\'m not sure," "We do everything," or avoids specifics about their track record.'
  },
  {
    id: 'proof-2',
    category: 'Risk / Failure / Proof',
    question: 'Can you share a story about your most challenging [the issue] job?',
    proTip: 'The best contractors have memorable stories—what went wrong, how they solved it, and what they learned.',
    redFlag: '"All my jobs go smooth," or refuses to discuss past difficulties.'
  },
  {
    id: 'proof-3',
    category: 'Risk / Failure / Proof',
    question: 'Do you have before-and-after photos from jobs involving [the issue]?',
    proTip: 'They should show or provide digital/photo evidence, ideally with descriptions or context.',
    redFlag: '"We don\'t take photos," or tries to show unrelated work.'
  },
  {
    id: 'proof-4',
    category: 'Risk / Failure / Proof',
    question: 'Have you ever failed to fix [the issue] on the first try? How did you handle it?',
    proTip: 'Look for admission of a real mistake, a process for troubleshooting, and a commitment to standing by their work.',
    redFlag: '"I\'ve never had a callback," or "That\'s always the homeowner\'s fault."'
  },
  {
    id: 'proof-5',
    category: 'Risk / Failure / Proof',
    question: 'What\'s the biggest red flag I should watch for when hiring for [the issue]?',
    proTip: 'Expect an honest answer, like "Anyone who offers a price before a real inspection" or "Contractors who refuse to show licenses or insurance."',
    redFlag: '"No red flags," or the contractor tries to scare you about competitors instead of being constructive.'
  },
  {
    id: 'proof-6',
    category: 'Risk / Failure / Proof',
    question: 'Have you ever seen another contractor cut corners or do something unsafe with [the issue]?',
    proTip: 'They should give specific examples—like skipping permits, improper drainage, or cheap materials—and describe why those shortcuts are risky.',
    redFlag: '"Never seen that," or refuses to comment on industry practices.'
  },
  {
    id: 'proof-7',
    category: 'Risk / Failure / Proof',
    question: 'What\'s the most common mistake contractors make when addressing [the issue]?',
    proTip: 'Look for clear examples, like misdiagnosing the source, not sealing properly, or failing to plan for heavy storms.',
    redFlag: '"Only new contractors make mistakes," or blames homeowners exclusively.'
  },
  {
    id: 'proof-8',
    category: 'Risk / Failure / Proof',
    question: 'If your fix for [the issue] didn\'t work, what\'s your process for making it right?',
    proTip: 'Clear process—come back, inspect, document, fix or refund within warranty, and update you in writing.',
    redFlag: '"That never happens," or "You\'re on your own if it fails."'
  },
  {
    id: 'proof-9',
    category: 'Risk / Failure / Proof',
    question: 'Do you have any references or testimonials from homeowners with [the issue]?',
    proTip: 'They should offer recent, relevant references—ideally with contact info (with permission).',
    redFlag: '"I don\'t give out customer info," or references are outdated or generic.'
  },
  {
    id: 'proof-10',
    category: 'Risk / Failure / Proof',
    question: 'Can I speak with a past client who had [the issue]?',
    proTip: 'Reputable pros have at least a few satisfied clients willing to talk about their experience.',
    redFlag: '"Nobody wants to be bothered," or avoids providing real references.'
  },

  // Warranty / Contract (Questions 101-120)
  {
    id: 'warranty-1',
    category: 'Warranty / Contract',
    question: 'Will I receive a written warranty specific to [the issue], and what does it cover?',
    proTip: 'Expect a specific, written warranty with clear language about coverage, exclusions, and length.',
    redFlag: '"Verbal warranty," or refuses to provide anything in writing.'
  },
  {
    id: 'warranty-2',
    category: 'Warranty / Contract',
    question: 'What is specifically not covered by your warranty when it comes to [the issue]?',
    proTip: 'They should be upfront about exclusions—like natural disasters, lack of maintenance, or pre-existing unrelated damage.',
    redFlag: '"Everything\'s covered," or they dodge the question.'
  },
  {
    id: 'warranty-3',
    category: 'Warranty / Contract',
    question: 'Have you ever had a warranty claim for [the issue]? How did you handle it?',
    proTip: 'Listen for honest stories about standing behind their work, responding quickly, and making things right.',
    redFlag: '"Never had a claim," or blames the customer for all issues.'
  },
  {
    id: 'warranty-4',
    category: 'Warranty / Contract',
    question: 'What\'s the all-in cost estimate for fixing [the issue]—including any "if we find more" scenarios?',
    proTip: 'Look for a detailed, written estimate that includes contingencies, exclusions, and change order policies. They should explain how unexpected costs are handled.',
    redFlag: '"We\'ll let you know if it costs more," vague ballpark pricing, or refusal to put anything in writing.'
  },
  {
    id: 'warranty-5',
    category: 'Warranty / Contract',
    question: 'How do you handle change orders or added costs if [the issue] is worse than expected?',
    proTip: 'There should be a written change order process with your approval required before extra work/costs begin.',
    redFlag: '"We\'ll just do what\'s needed and add it to the bill," or starts extra work without your sign-off.'
  },
  {
    id: 'warranty-6',
    category: 'Warranty / Contract',
    question: 'What is the average lifespan of your solution for [the issue]?',
    proTip: 'They should quote manufacturer guidelines, real-world averages, or provide local references for how long their solutions last.',
    redFlag: '"Lasts forever," or vague, inflated numbers.'
  },
  {
    id: 'warranty-7',
    category: 'Warranty / Contract',
    question: 'How do you handle billing and payment milestones for [the issue] jobs?',
    proTip: 'Transparent billing—deposit, progress payments, and final payment only after inspection. Should be written into the contract.',
    redFlag: '"Pay in full up front," or billing feels chaotic or undocumented.'
  },
  {
    id: 'warranty-8',
    category: 'Warranty / Contract',
    question: 'Can I see a sample invoice for a similar [the issue] project?',
    proTip: 'A good company will provide a redacted sample with breakdowns and all fees listed.',
    redFlag: '"No, invoices are private," or their paperwork is a mess.'
  },
  {
    id: 'warranty-9',
    category: 'Warranty / Contract',
    question: 'If your solution for [the issue] fails during a storm or emergency, what is your response protocol?',
    proTip: 'Look for a plan: 24/7 hotline, prioritized emergency response, and clear instructions for warranty or service calls.',
    redFlag: '"We\'ll get to you when we can," or no emergency protocol at all.'
  },
  {
    id: 'warranty-10',
    category: 'Warranty / Contract',
    question: 'What\'s your policy if a homeowner is dissatisfied with the fix for [the issue]?',
    proTip: 'They should outline a dispute resolution process—reinspection, rework, or even a money-back policy in writing.',
    redFlag: '"No one\'s ever dissatisfied," or "We don\'t have a policy for that."'
  },

  // Compliance / Code (Questions 121-140)
  {
    id: 'code-1',
    category: 'Compliance / Code',
    question: 'Is your proposed solution for [the issue] fully compliant with Columbus/Ohio codes?',
    proTip: 'They should confidently state compliance, reference specific codes, and offer to provide documentation or code sections if requested.',
    redFlag: '"Don\'t worry, no one checks," or vague answers about "industry standards" with no details.'
  },
  {
    id: 'code-2',
    category: 'Compliance / Code',
    question: 'What permits, if any, are needed for fixing [the issue]?',
    proTip: 'A good contractor knows what permits are needed (plumbing, electrical, structural, etc.) and will handle the paperwork or guide you through it.',
    redFlag: '"Permits are a waste of time," "We never pull permits," or avoids the question.'
  },
  {
    id: 'code-3',
    category: 'Compliance / Code',
    question: 'Have you ever had to redo work because it wasn\'t up to code regarding [the issue]?',
    proTip: 'Honest contractors will admit past mistakes, explain how they corrected them, and describe what\'s changed to prevent repeats.',
    redFlag: '"Never failed an inspection," or gets defensive about code violations.'
  },
  {
    id: 'code-4',
    category: 'Compliance / Code',
    question: 'How do you stay updated on code changes that affect [the issue]?',
    proTip: 'Listen for ongoing education, trade groups, or city/county update bulletins.',
    redFlag: '"Codes don\'t change much," or relies only on past experience.'
  },
  {
    id: 'code-5',
    category: 'Compliance / Code',
    question: 'Will you provide written documentation of code compliance for my records?',
    proTip: 'Good companies provide inspection reports, permit numbers, or compliance letters for your files.',
    redFlag: '"You don\'t need that," or charges extra for basic documentation.'
  },
  {
    id: 'code-6',
    category: 'Compliance / Code',
    question: 'Who is responsible for passing inspections related to [the issue]?',
    proTip: 'The contractor should take responsibility for all work they do—including passing final inspections.',
    redFlag: '"You\'re responsible if it fails," or tries to pass the blame if an inspector has an issue.'
  },
  {
    id: 'code-7',
    category: 'Compliance / Code',
    question: 'Are there national or industry standards for fixing [the issue]? How do you meet them?',
    proTip: 'They should reference IICRC, ASTM, or manufacturer guidelines, and describe how their work aligns.',
    redFlag: '"Standards don\'t matter," or can\'t name a single standard.'
  },
  {
    id: 'code-8',
    category: 'Compliance / Code',
    question: 'What would happen if an inspector failed your work related to [the issue]?',
    proTip: '"We would fix the issues at no extra charge and make sure it passes on re-inspection."',
    redFlag: '"It\'s unlikely," or "You\'ll have to pay for any rework."'
  },
  {
    id: 'code-9',
    category: 'Compliance / Code',
    question: 'How can I verify that all code and permit requirements have been met for [the issue]?',
    proTip: 'Look for offers to provide inspection cards, final approval stickers, or direct contact info for the inspector.',
    redFlag: '"You\'ll just have to trust us," or "No one really checks."'
  },
  {
    id: 'code-10',
    category: 'Compliance / Code',
    question: 'Are there specific Columbus/Franklin County issues I should be aware of regarding [the issue]?',
    proTip: 'They should know about regional soil, weather, or code quirks and be willing to share local expertise.',
    redFlag: '"Everywhere\'s the same," or shows zero local knowledge.'
  },

  // Health / Safety / Air Quality (Additional questions to represent this category)
  {
    id: 'health-1',
    category: 'Health / Safety / Air Quality',
    question: 'Are there health risks associated with [the issue] for kids, pets, or people with allergies?',
    proTip: 'They should acknowledge potential risks like mold, bacteria, or chemical off-gassing and explain how they minimize exposure.',
    redFlag: '"No health risks," or dismisses safety concerns without explanation.'
  },
  {
    id: 'health-2',
    category: 'Health / Safety / Air Quality',
    question: 'What do you do to ensure dust, mold, or contaminants from [the issue] don\'t spread during work?',
    proTip: 'Look for containment barriers, HEPA filtration, or negative air pressure systems during work.',
    redFlag: '"We just work carefully," or no mention of containment procedures.'
  },
  {
    id: 'health-3',
    category: 'Health / Safety / Air Quality',
    question: 'How do you test the air quality or cleanliness after fixing [the issue]?',
    proTip: 'They should mention air sampling, moisture readings, or clearance testing after work is complete.',
    redFlag: '"You\'ll know if it\'s clean," or no post-work verification.'
  },

  // Customer Experience (Additional questions)
  {
    id: 'customer-1',
    category: 'Customer Experience',
    question: 'Can you explain your quality control process for jobs involving [the issue]?',
    proTip: 'Listen for checklists, supervisor sign-off, inspection steps, and post-job verification.',
    redFlag: '"We just check as we go," or there\'s no defined QC process.'
  },
  {
    id: 'customer-2',
    category: 'Customer Experience',
    question: 'What\'s your communication protocol if there are delays in fixing [the issue]?',
    proTip: 'They should describe how and when they\'ll notify you—call, text, or email—and provide revised timelines.',
    redFlag: '"You\'ll know if there\'s a delay," or gets annoyed by the question.'
  },
  {
    id: 'customer-3',
    category: 'Customer Experience',
    question: 'Will you walk me through the completed repair for [the issue] before closing the job?',
    proTip: 'The best pros insist on a final walkthrough, explaining everything and answering your questions before you sign off or pay.',
    redFlag: '"You can just look at it yourself," or refuses a post-job review.'
  },

  // Emergency / Backup (Additional questions)
  {
    id: 'emergency-1',
    category: 'Emergency / Backup',
    question: 'Do you provide emergency service for [the issue]?',
    proTip: 'Look for 24/7 availability, emergency contact numbers, and prioritized response for urgent situations.',
    redFlag: '"Call during business hours only," or no emergency support available.'
  },
  {
    id: 'emergency-2',
    category: 'Emergency / Backup',
    question: 'What backup systems do you recommend for [the issue]?',
    proTip: 'They should suggest redundant pumps, battery backups, alarms, or monitoring systems for critical applications.',
    redFlag: '"One system is enough," or no discussion of backup options.'
  }
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
