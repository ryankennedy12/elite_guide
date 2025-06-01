
import { WizardQuestionItem } from './types';

export const costQuestions: WizardQuestionItem[] = [
  {
    id: 'cost-1',
    category: 'Cost & Value',
    question: 'What\'s the all-in cost estimate for fixing [the issue]—including any "if we find more" scenarios?',
    proTip: 'Look for a detailed, written estimate that includes contingencies, exclusions, and change order policies. They should explain how unexpected costs are handled.',
    redFlag: '"We\'ll let you know if it costs more," vague ballpark pricing, or refusal to put anything in writing.'
  },
  {
    id: 'cost-2',
    category: 'Cost & Value',
    question: 'How do you handle change orders or added costs if [the issue] is worse than expected?',
    proTip: 'There should be a written change order process with your approval required before extra work/costs begin.',
    redFlag: '"We\'ll just do what\'s needed and add it to the bill," or starts extra work without your sign-off.'
  },
  {
    id: 'cost-3',
    category: 'Cost & Value',
    question: 'Will I receive a written warranty for [the issue], and what does it cover?',
    proTip: 'Expect a specific, written warranty with clear language about coverage, exclusions, and length.',
    redFlag: '"Verbal warranty," or refuses to provide anything in writing.'
  },
  {
    id: 'cost-4',
    category: 'Cost & Value',
    question: 'What is specifically not covered by your warranty when it comes to [the issue]?',
    proTip: 'They should be upfront about exclusions—like natural disasters, lack of maintenance, or pre-existing unrelated damage.',
    redFlag: '"Everything\'s covered," or they dodge the question.'
  },
  {
    id: 'cost-5',
    category: 'Cost & Value',
    question: 'Have you ever had a warranty claim for [the issue]? How did you handle it?',
    proTip: 'Listen for honest stories about standing behind their work, responding quickly, and making things right.',
    redFlag: '"Never had a claim," or blames the customer for all issues.'
  },
  {
    id: 'cost-6',
    category: 'Cost & Value',
    question: 'What is the average lifespan of your solution for [the issue]?',
    proTip: 'They should quote manufacturer guidelines, real-world averages, or provide local references for how long their solutions last.',
    redFlag: '"Lasts forever," or vague, inflated numbers.'
  },
  {
    id: 'cost-7',
    category: 'Cost & Value',
    question: 'How do you price jobs involving [the issue]? (By area, severity, hours?)',
    proTip: 'Look for transparency: pricing by linear foot, square footage, or time/materials—with breakdowns available.',
    redFlag: '"We just eyeball it," or prices change after the job starts.'
  },
  {
    id: 'cost-8',
    category: 'Cost & Value',
    question: 'Are there lower-cost alternatives for fixing [the issue]? What are their downsides?',
    proTip: 'A good contractor will explain pros/cons of different options and not just upsell you on the most expensive fix.',
    redFlag: '"There\'s only one way to do it," or refuses to discuss alternatives.'
  },
  {
    id: 'cost-9',
    category: 'Cost & Value',
    question: 'If I wait to fix [the issue], what risks am I taking on (cost, damage, health)?',
    proTip: 'They should warn about risks: increased repair costs, structural damage, mold/health hazards, and insurance complications.',
    redFlag: '"It\'s fine to wait," or uses fear tactics without specifics.'
  },
  {
    id: 'cost-10',
    category: 'Cost & Value',
    question: 'Are there "hidden" costs in jobs related to [the issue] that don\'t show up on estimates?',
    proTip: 'Honest answers will include potential surprises: electrical work, finish repairs, code upgrades, or permit fees.',
    redFlag: '"No hidden costs ever," or refuses to discuss real-world scenarios.'
  },
  {
    id: 'cost-11',
    category: 'Cost & Value',
    question: 'Do you recommend periodic inspections or maintenance after fixing [the issue]?',
    proTip: 'Yes—maintenance plans or annual inspections are a good sign they care about long-term results.',
    redFlag: '"No need to check it after we\'re done," or upsells unnecessary maintenance.'
  },
  {
    id: 'cost-12',
    category: 'Cost & Value',
    question: 'If [the issue] comes back after the warranty, what\'s the next step?',
    proTip: 'Listen for an offer to inspect, propose solutions, or discount follow-up work—even outside of warranty.',
    redFlag: '"Out of warranty means out of luck," or tries to charge full price for rework.'
  },
  {
    id: 'cost-13',
    category: 'Cost & Value',
    question: 'Can you break down the cost difference between a basic vs. best-in-class fix for [the issue]?',
    proTip: 'Good contractors provide clear comparisons (materials, lifespan, warranty, features) and let you choose.',
    redFlag: '"No difference," or only pushes the highest-margin product.'
  },
  {
    id: 'cost-14',
    category: 'Cost & Value',
    question: 'How do you help homeowners prioritize if [the issue] is just one of several problems?',
    proTip: 'They should explain how to triage urgent issues, stage repairs, or suggest which fixes give you the most value.',
    redFlag: '"Do it all now or you\'re in trouble," or only recommends the most expensive work.'
  },
  {
    id: 'cost-15',
    category: 'Cost & Value',
    question: 'Is your fix for [the issue] insurance-friendly, and what documentation would I need?',
    proTip: 'Pros know what insurance companies require (photos, reports, product data sheets) and help you prepare claims.',
    redFlag: '"Insurance never covers this," or refuses to document work.'
  },
  {
    id: 'cost-16',
    category: 'Cost & Value',
    question: 'Are there any rebates, grants, or tax breaks available for fixing [the issue]?',
    proTip: 'Some contractors know about city, state, or utility programs—worth asking!',
    redFlag: '"Never heard of any," or refuses to check.'
  },
  {
    id: 'cost-17',
    category: 'Cost & Value',
    question: 'What\'s the most cost-effective long-term approach to [the issue]?',
    proTip: 'They\'ll discuss options: high-quality products, proper drainage, or staged repairs to prevent repeat costs.',
    redFlag: '"Buy the cheapest fix now," or pushes short-term solutions.'
  },
  {
    id: 'cost-18',
    category: 'Cost & Value',
    question: 'How do you handle billing and payment milestones for [the issue] jobs?',
    proTip: 'Transparent billing—deposit, progress payments, and final payment only after inspection. Should be written into the contract.',
    redFlag: '"Pay in full up front," or billing feels chaotic or undocumented.'
  },
  {
    id: 'cost-19',
    category: 'Cost & Value',
    question: 'Can I see a sample invoice for a similar [the issue] project?',
    proTip: 'A good company will provide a redacted sample with breakdowns and all fees listed.',
    redFlag: '"No, invoices are private," or their paperwork is a mess.'
  },
  {
    id: 'cost-20',
    category: 'Cost & Value',
    question: 'If your solution for [the issue] fails during a storm or emergency, what is your response protocol?',
    proTip: 'Look for a plan: 24/7 hotline, prioritized emergency response, and clear instructions for warranty or service calls.',
    redFlag: '"We\'ll get to you when we can," or no emergency protocol at all.'
  },
  {
    id: 'cost-21',
    category: 'Cost & Value',
    question: 'How will your solution for [the issue] impact my home\'s resale value?',
    proTip: 'They should discuss how a documented, code-compliant fix can boost resale value, help pass inspection, and be a selling point.',
    redFlag: '"No impact," or "It doesn\'t matter for resale."'
  },
  {
    id: 'cost-22',
    category: 'Cost & Value',
    question: 'How can I budget for potential future repairs or upgrades related to [the issue]?',
    proTip: 'Honest advice—set aside a yearly amount, keep a "rainy day" fund, or get quotes for staged upgrades.',
    redFlag: '"No need to plan," or refuses to discuss costs.'
  },
  {
    id: 'cost-23',
    category: 'Cost & Value',
    question: 'What insurance riders or coverage should I consider to protect against [the issue]?',
    proTip: 'Recommends you check with your agent for water backup, sump failure, or flood endorsements.',
    redFlag: '"No insurance will ever help," or refuses to discuss.'
  },
  {
    id: 'cost-24',
    category: 'Cost & Value',
    question: 'What is the best time of year to address [the issue] for effectiveness or savings?',
    proTip: 'Explains pros and cons of different seasons—spring for easy diagnosis, summer/fall for dry access, or off-season discounts.',
    redFlag: '"Any time is fine," or no details.'
  }
];
