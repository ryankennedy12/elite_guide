
import { WizardQuestionItem } from './types';

export const systemQuestions: WizardQuestionItem[] = [
  {
    id: 'system-1',
    category: 'System Selection',
    question: 'What\'s your standard process for fixing [the issue]?',
    proTip: 'Listen for a step-by-step answer—prep, repair, verification, and clean-up. They should mention tailoring the process to your home\'s needs.',
    redFlag: '"We just get in and fix it." If they can\'t walk you through a process or only describe demolition, that\'s a problem.'
  },
  {
    id: 'system-2',
    category: 'System Selection',
    question: 'What are the key steps that can\'t be skipped when addressing [the issue]?',
    proTip: 'They should highlight safety, site protection, root-cause repair, and quality checks. Non-negotiable steps should be explained clearly.',
    redFlag: '"Every step is important," but can\'t name any specifics—or, "Sometimes we skip stuff to save time."'
  },
  {
    id: 'system-3',
    category: 'System Selection',
    question: 'Can you show me the materials and products you use to fix [the issue]?',
    proTip: 'The best contractors can provide cut sheets, samples, or product names/brands. They should explain why they choose them and provide documentation.',
    redFlag: '"We use whatever\'s cheapest," or can\'t provide product info. Reluctance to share brands or specs is a red flag.'
  },
  {
    id: 'system-4',
    category: 'System Selection',
    question: 'What\'s the most important quality to look for in a product/solution for [the issue]?',
    proTip: 'Expect answers about durability, compatibility with your foundation, warranty, or proven local performance. Ask why it\'s right for your house.',
    redFlag: '"All products are the same," or vague buzzwords like "industry standard" with no specifics.'
  },
  {
    id: 'system-5',
    category: 'System Selection',
    question: 'How do you document your work and progress on [the issue]?',
    proTip: 'They should offer photos, written reports, or digital records—before, during, and after. This protects both you and them.',
    redFlag: '"I don\'t usually do documentation," or only offers to document for an extra fee.'
  },
  {
    id: 'system-6',
    category: 'System Selection',
    question: 'If you find a bigger issue while fixing [the issue], how do you keep me informed?',
    proTip: 'A pro will stop, document the finding, issue a change order, and discuss options with you before proceeding. They\'ll provide photos and a written scope update.',
    redFlag: '"We just fix it and bill you later," or doesn\'t mention getting your approval before extra work.'
  },
  {
    id: 'system-7',
    category: 'System Selection',
    question: 'Will I receive a written warranty specific to [the issue]?',
    proTip: 'Yes—reputable contractors provide written, specific warranties outlining what\'s covered, for how long, and any exclusions.',
    redFlag: '"Our word is our bond," "Verbal warranty," or refusal to give anything in writing.'
  },
  {
    id: 'system-8',
    category: 'System Selection',
    question: 'How do you keep your team trained on new solutions for [the issue]?',
    proTip: 'They should mention certifications, continuing education, manufacturer training, or regular team updates.',
    redFlag: '"Training isn\'t needed," or "We\'ve been doing it the same way for 20 years."'
  },
  {
    id: 'system-9',
    category: 'System Selection',
    question: 'What are the latest innovations in fixing [the issue]?',
    proTip: 'Listen for mentions of new products, smart monitoring, advanced membranes, or evolving installation methods. Bonus if they relate it to your home.',
    redFlag: '"Nothing\'s changed in years," or shows zero curiosity about improvement.'
  },
  {
    id: 'system-10',
    category: 'System Selection',
    question: 'How does your solution for [the issue] hold up over 10+ years?',
    proTip: 'They should reference long-term product testing, maintenance intervals, and real-world results from past jobs.',
    redFlag: '"Lasts forever," or avoids specifics about lifespan.'
  },
  {
    id: 'system-11',
    category: 'System Selection',
    question: 'If I plan to finish my basement later, what do you recommend regarding [the issue]?',
    proTip: 'Good contractors will suggest extra precautions—like drainage mats, vapor barriers, or up-sized pumps—and warn about hidden moisture risks.',
    redFlag: '"Finish whenever," or ignores compatibility with future renovations.'
  },
  {
    id: 'system-12',
    category: 'System Selection',
    question: 'Can you teach me what to look for in the future regarding [the issue]?',
    proTip: 'A contractor who educates you (offers checklists, signs to monitor, or an FAQ) is a keeper.',
    redFlag: '"That\'s not my job," or refuses to empower homeowners.'
  },
  {
    id: 'system-13',
    category: 'System Selection',
    question: 'What technology or smart home options exist for monitoring [the issue]?',
    proTip: 'Look for water alarms, WiFi sump monitors, leak detection systems, or humidity sensors.',
    redFlag: '"Gadgets aren\'t necessary," or unfamiliar with new tech.'
  },
  {
    id: 'system-14',
    category: 'System Selection',
    question: 'Are there upgrades or add-ons to your solution for [the issue] I should consider?',
    proTip: 'They should mention battery backups, larger basins, alarm systems, or improved discharge lines.',
    redFlag: '"No need for extras," or hard sells high-cost upgrades without explanation.'
  },
  {
    id: 'system-15',
    category: 'System Selection',
    question: 'If I move, can you provide documentation for the next homeowner about [the issue]?',
    proTip: 'Yes—contractors should supply a repair summary, warranty transfer info, and photos for your records.',
    redFlag: '"Not our problem," or "Just tell them it was fixed."'
  },
  {
    id: 'system-16',
    category: 'System Selection',
    question: 'How can I track the long-term performance of your fix for [the issue]?',
    proTip: 'Good answers: maintenance logs, recommended inspection schedule, or offering a digital portal/tracker.',
    redFlag: '"Just wait and see," or nothing provided after job is done.'
  },
  {
    id: 'system-17',
    category: 'System Selection',
    question: 'Do you offer check-ins or "health checks" for [the issue] after the initial fix?',
    proTip: 'The best companies offer annual or semi-annual checkups, or at least an easy way to schedule them.',
    redFlag: '"We\'re done after the install," or only offers this for a high fee.'
  },
  {
    id: 'system-18',
    category: 'System Selection',
    question: 'What\'s your approach to helping homeowners understand the risks around [the issue]?',
    proTip: 'Pros educate you with clear language, handouts, or online resources—and don\'t pressure you.',
    redFlag: '"It\'s too complicated for homeowners," or uses scare tactics.'
  },
  {
    id: 'system-19',
    category: 'System Selection',
    question: 'Can you provide a checklist for preventing [the issue] in the future?',
    proTip: 'Contractors who offer prevention guides (digital or paper) care about long-term value.',
    redFlag: '"No need, just call us," or tries to keep you dependent.'
  },
  {
    id: 'system-20',
    category: 'System Selection',
    question: 'If a future contractor says your fix for [the issue] was wrong, what should I do?',
    proTip: '"Call us—we\'ll review our work, compare records, and help you get an unbiased assessment."',
    redFlag: '"Don\'t trust anyone else," or immediately blames the new contractor.'
  },
  {
    id: 'system-21',
    category: 'System Selection',
    question: 'What advice would you give your own family about [the issue]?',
    proTip: 'Honest contractors will treat you like family—recommending best-in-class solutions, not just cheapest or quickest.',
    redFlag: '"I\'d never have this problem," or gives you a different answer than for their own home.'
  },
  {
    id: 'system-22',
    category: 'System Selection',
    question: 'How do you handle situations where [the issue] returns years after the original fix?',
    proTip: '"We\'ll inspect, compare notes from the first job, and offer fair, discounted service for recurring issues."',
    redFlag: '"It\'s your problem now," or only offers a new contract at full price.'
  },
  {
    id: 'system-23',
    category: 'System Selection',
    question: 'Do you provide education or resources for homeowners about [the issue]?',
    proTip: '"Yes, we have guides, videos, or can recommend trusted online resources."',
    redFlag: '"Just Google it," or refuses to provide help beyond the job.'
  },
  {
    id: 'system-24',
    category: 'System Selection',
    question: 'Can you recommend reputable sources for me to learn more about [the issue]?',
    proTip: '"Yes—here are local, government, or industry sources, and consumer protection links."',
    redFlag: '"No idea," or only offers their own website.'
  },
  {
    id: 'system-25',
    category: 'System Selection',
    question: 'Are there preventative steps I should take before or after your solution for [the issue]?',
    proTip: 'Listen for detailed, site-specific suggestions—grading, drainage, humidity control, regular inspections, etc.',
    redFlag: '"Just wait for something to happen," or dismisses prevention.'
  }
];
