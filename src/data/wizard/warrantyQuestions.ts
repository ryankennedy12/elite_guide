
import { WizardQuestionItem } from './types';

export const warrantyQuestions: WizardQuestionItem[] = [
  {
    id: 'warranty-1',
    category: 'Warranty / Contract',
    question: 'What\'s the all-in cost estimate for fixing [the issue]—including any "if we find more" scenarios?',
    proTip: 'Look for a detailed, written estimate that includes contingencies, exclusions, and change order policies. They should explain how unexpected costs are handled.',
    redFlag: '"We\'ll let you know if it costs more," vague ballpark pricing, or refusal to put anything in writing.'
  },
  {
    id: 'warranty-2',
    category: 'Warranty / Contract',
    question: 'How do you handle change orders or added costs if [the issue] is worse than expected?',
    proTip: 'There should be a written change order process with your approval required before extra work/costs begin.',
    redFlag: '"We\'ll just do what\'s needed and add it to the bill," or starts extra work without your sign-off.'
  },
  {
    id: 'warranty-3',
    category: 'Warranty / Contract',
    question: 'Will I receive a written warranty for [the issue], and what does it cover?',
    proTip: 'Expect a specific, written warranty with clear language about coverage, exclusions, and length.',
    redFlag: '"Verbal warranty," or refuses to provide anything in writing.'
  },
  {
    id: 'warranty-4',
    category: 'Warranty / Contract',
    question: 'What is specifically not covered by your warranty when it comes to [the issue]?',
    proTip: 'They should be upfront about exclusions—like natural disasters, lack of maintenance, or pre-existing unrelated damage.',
    redFlag: '"Everything\'s covered," or they dodge the question.'
  },
  {
    id: 'warranty-5',
    category: 'Warranty / Contract',
    question: 'Have you ever had a warranty claim for [the issue]? How did you handle it?',
    proTip: 'Listen for honest stories about standing behind their work, responding quickly, and making things right.',
    redFlag: '"Never had a claim," or blames the customer for all issues.'
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
    question: 'How do you price jobs involving [the issue]? (By area, severity, hours?)',
    proTip: 'Look for transparency: pricing by linear foot, square footage, or time/materials—with breakdowns available.',
    redFlag: '"We just eyeball it," or prices change after the job starts.'
  },
  {
    id: 'warranty-8',
    category: 'Warranty / Contract',
    question: 'If I wait to fix [the issue], what risks am I taking on (cost, damage, health)?',
    proTip: 'They should warn about risks: increased repair costs, structural damage, mold/health hazards, and insurance complications.',
    redFlag: '"It\'s fine to wait," or uses fear tactics without specifics.'
  },
  {
    id: 'warranty-9',
    category: 'Warranty / Contract',
    question: 'Are there "hidden" costs in jobs related to [the issue] that don\'t show up on estimates?',
    proTip: 'Honest answers will include potential surprises: electrical work, finish repairs, code upgrades, or permit fees.',
    redFlag: '"No hidden costs ever," or refuses to discuss real-world scenarios.'
  },
  {
    id: 'warranty-10',
    category: 'Warranty / Contract',
    question: 'Do you recommend periodic inspections or maintenance after fixing [the issue]?',
    proTip: 'Yes—maintenance plans or annual inspections are a good sign they care about long-term results.',
    redFlag: '"No need to check it after we\'re done," or upsells unnecessary maintenance.'
  },
  {
    id: 'warranty-11',
    category: 'Warranty / Contract',
    question: 'If [the issue] comes back after the warranty, what\'s the next step?',
    proTip: 'Listen for an offer to inspect, propose solutions, or discount follow-up work—even outside of warranty.',
    redFlag: '"Out of warranty means out of luck," or tries to charge full price for rework.'
  },
  {
    id: 'warranty-12',
    category: 'Warranty / Contract',
    question: 'How do you help homeowners prioritize if [the issue] is just one of several problems?',
    proTip: 'They should explain how to triage urgent issues, stage repairs, or suggest which fixes give you the most value.',
    redFlag: '"Do it all now or you\'re in trouble," or only recommends the most expensive work.'
  },
  {
    id: 'warranty-13',
    category: 'Warranty / Contract',
    question: 'Is your fix for [the issue] insurance-friendly, and what documentation would I need?',
    proTip: 'Pros know what insurance companies require (photos, reports, product data sheets) and help you prepare claims.',
    redFlag: '"Insurance never covers this," or refuses to document work.'
  },
  {
    id: 'warranty-14',
    category: 'Warranty / Contract',
    question: 'Are there any rebates, grants, or tax breaks available for fixing [the issue]?',
    proTip: 'Some contractors know about city, state, or utility programs—worth asking!',
    redFlag: '"Never heard of any," or refuses to check.'
  },
  {
    id: 'warranty-15',
    category: 'Warranty / Contract',
    question: 'What\'s the most cost-effective long-term approach to [the issue]?',
    proTip: 'They\'ll discuss options: high-quality products, proper drainage, or staged repairs to prevent repeat costs.',
    redFlag: '"Buy the cheapest fix now," or pushes short-term solutions.'
  },
  {
    id: 'warranty-16',
    category: 'Warranty / Contract',
    question: 'How do you handle billing and payment milestones for [the issue] jobs?',
    proTip: 'Transparent billing—deposit, progress payments, and final payment only after inspection. Should be written into the contract.',
    redFlag: '"Pay in full up front," or billing feels chaotic or undocumented.'
  },
  {
    id: 'warranty-17',
    category: 'Warranty / Contract',
    question: 'Can I see a sample invoice for a similar [the issue] project?',
    proTip: 'A good company will provide a redacted sample with breakdowns and all fees listed.',
    redFlag: '"No, invoices are private," or their paperwork is a mess.'
  },
  {
    id: 'warranty-18',
    category: 'Warranty / Contract',
    question: 'If your solution for [the issue] fails during a storm or emergency, what is your response protocol?',
    proTip: 'Look for a plan: 24/7 hotline, prioritized emergency response, and clear instructions for warranty or service calls.',
    redFlag: '"We\'ll get to you when we can," or no emergency protocol at all.'
  }
];
