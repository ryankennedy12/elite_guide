
import { WizardQuestionItem } from './types';

export const systemQuestions: WizardQuestionItem[] = [
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
  {
    id: 'future-14',
    category: 'System Selection',
    question: 'Will your fix for [the issue] require any special care or attention if I remodel in the future?',
    proTip: 'They\'ll discuss how to protect drains, pumps, and vapor barriers during renovations.',
    redFlag: '"Doesn\'t matter," or ignores potential conflicts with future projects.'
  },
  {
    id: 'future-18',
    category: 'System Selection',
    question: 'How does your company stay on the cutting edge of solutions for [the issue]?',
    proTip: 'Attending trade shows, manufacturer training, adopting new tech, and constant process updates.',
    redFlag: '"We just do what works," or "No need to change."'
  },
  {
    id: 'future-19',
    category: 'System Selection',
    question: 'If new technology comes out to address [the issue], do you offer upgrades or trade-ins?',
    proTip: 'Flexible contractors will update systems, offer add-ons, or give discounts for new tech.',
    redFlag: '"No upgrades," or locks you into old systems.'
  },
  {
    id: 'future-24',
    category: 'System Selection',
    question: 'If my home is older/newer, how does that change your approach to [the issue]?',
    proTip: 'Different construction eras require different solutions—contractors should know code changes, materials, and hidden risks by age.',
    redFlag: '"We do everything the same," or no mention of home age.'
  },
  {
    id: 'future-26',
    category: 'System Selection',
    question: 'Do you ever recommend monitoring-only approaches for [the issue] before full repairs?',
    proTip: 'Some situations benefit from monitoring first—contractors should be willing to "wait and see" if it\'s reasonable.',
    redFlag: '"Fix it now or else," or only pushes big jobs.'
  },
  {
    id: 'future-27',
    category: 'System Selection',
    question: 'How do you ensure the fix for [the issue] won\'t create new issues elsewhere in my home?',
    proTip: 'Explains holistic review, drainage planning, and ongoing monitoring to prevent shifting problems.',
    redFlag: '"We just handle what\'s in the contract," or never considers side effects.'
  },
  {
    id: 'future-28',
    category: 'System Selection',
    question: 'Will fixing [the issue] affect any other home systems (HVAC, electrical, plumbing)?',
    proTip: 'Good contractors flag any impacts (e.g., moving pipes, relocating electrical, protecting HVAC returns).',
    redFlag: '"No impact," or "We don\'t check for that."'
  },
  {
    id: 'community-11',
    category: 'System Selection',
    question: 'Do local utility or water companies ever get involved with repairs for [the issue]?',
    proTip: 'Sometimes—especially for main line issues, sump discharge, or water table management.',
    redFlag: '"Never," or "That\'s not their job."'
  }
];
