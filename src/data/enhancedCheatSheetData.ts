
export interface EnhancedCheatSheetItem {
  id: string;
  question: string;
  redFlag: string;
  proTip: string;
  whatToListenFor: string;
  insidersNote: string;
  redFlagTooltip: string;
  proTipTooltip: string;
}

export const enhancedCheatSheetData: EnhancedCheatSheetItem[] = [
  {
    id: "diagnosis",
    question: "How do you diagnose the root cause of water intrusion?",
    redFlag: "'It's always the same problem.'",
    proTip: "Ask to see a sample inspection or diagnostic report.",
    whatToListenFor: "Look for specific testing methods and diagnostic tools they use.",
    insidersNote: "Top contractors use moisture meters, thermal imaging, and systematic inspection protocols.",
    redFlagTooltip: "If you hear this, it's usually a sign they're deflecting or don't have a real process.",
    proTipTooltip: "Use this phrase to prompt more transparency, even if they're dodging."
  },
  {
    id: "hidden-damage",
    question: "What's your protocol if you find hidden damage?",
    redFlag: "'We'll just figure it out.'",
    proTip: "Insist on a sample change order and written notification process.",
    whatToListenFor: "Clear communication process and documentation standards.",
    insidersNote: "Professional contractors have written protocols for discoveries and change orders.",
    redFlagTooltip: "Vague responses indicate they don't have proper procedures in place.",
    proTipTooltip: "This ensures you won't get surprise bills or rushed decisions."
  },
  {
    id: "sump-pump",
    question: "How do you select the sump pump for my home?",
    redFlag: "'We use the same pump for everyone.'",
    proTip: "Have them explain why your home needs that specific model.",
    whatToListenFor: "Calculations based on your home's water volume and drainage needs.",
    insidersNote: "Pump selection should consider basement size, water table, and historical flooding data.",
    redFlagTooltip: "One-size-fits-all approaches often lead to inadequate or oversized systems.",
    proTipTooltip: "Force them to show their work and justify their recommendations."
  },
  {
    id: "legal-compliance",
    question: "Will your system handle water softener/laundry draining into the sump—legally?",
    redFlag: "'Shouldn't be a problem.'",
    proTip: "Ask for code compliance documentation or a written plan.",
    whatToListenFor: "Knowledge of local plumbing codes and permit requirements.",
    insidersNote: "Many areas have strict regulations about what can drain into sump systems.",
    redFlagTooltip: "Casual responses to legal compliance can result in code violations.",
    proTipTooltip: "Get documentation to protect yourself from future legal issues."
  },
  {
    id: "system-failure",
    question: "What are the top 3 reasons your system might fail?",
    redFlag: "'Our systems never fail.'",
    proTip: "Request real examples of past issues and fixes.",
    whatToListenFor: "Honest discussion of potential weak points and maintenance needs.",
    insidersNote: "Quality contractors know failure modes and plan preventive measures.",
    redFlagTooltip: "Nothing is perfect—this response shows dangerous overconfidence.",
    proTipTooltip: "Real experience includes learning from problems and improving systems."
  },
  {
    id: "delays-updates",
    question: "What's your policy for delays and updates?",
    redFlag: "'Jobs usually go as planned.'",
    proTip: "Get the communication plan in writing.",
    whatToListenFor: "Specific communication schedules and delay notification procedures.",
    insidersNote: "Professional contractors have communication protocols and backup plans.",
    redFlagTooltip: "Construction rarely goes exactly as planned—this shows inexperience.",
    proTipTooltip: "Clear communication prevents frustration and builds trust."
  },
  {
    id: "warranty-response",
    question: "What's your warranty response time?",
    redFlag: "'As soon as we can.'",
    proTip: "Ask for a guaranteed emergency response window in writing.",
    whatToListenFor: "Specific timeframes for different types of warranty issues.",
    insidersNote: "Quality contractors guarantee 24-48 hour response for emergencies.",
    redFlagTooltip: "Vague timing means you'll be waiting when you need help most.",
    proTipTooltip: "Get specific commitments to ensure prompt warranty service."
  },
  {
    id: "challenging-job",
    question: "Tell me about your most challenging job and what you learned.",
    redFlag: "'We never have issues.'",
    proTip: "Look for transparency and real problem-solving stories.",
    whatToListenFor: "Specific examples of challenges overcome and lessons learned.",
    insidersNote: "Great contractors learn from difficult projects and improve their methods.",
    redFlagTooltip: "Claims of perfection indicate either inexperience or dishonesty.",
    proTipTooltip: "Real stories reveal their problem-solving abilities and honesty."
  },
  {
    id: "testing-verification",
    question: "How do you test/verify the waterproofing worked?",
    redFlag: "'Just trust us—it's dry.'",
    proTip: "Demand written verification or test results.",
    whatToListenFor: "Specific testing methods and documentation processes.",
    insidersNote: "Professional verification includes water tests and performance documentation.",
    redFlagTooltip: "No testing means no proof the system actually works.",
    proTipTooltip: "Verification protects you and ensures the system performs as promised."
  },
  {
    id: "extreme-conditions",
    question: "How does your system adapt to extreme water table/flooding?",
    redFlag: "'One-size-fits-all.'",
    proTip: "Request examples of performance in recent storms.",
    whatToListenFor: "Adaptive design features and real-world performance data.",
    insidersNote: "Quality systems include backup pumps, alarms, and overflow protection.",
    redFlagTooltip: "Standard solutions fail when conditions exceed normal parameters.",
    proTipTooltip: "Real performance data shows how systems handle stress conditions."
  },
  {
    id: "redo-jobs",
    question: "Have you ever had to redo a job? How did you fix it?",
    redFlag: "'We never make mistakes.'",
    proTip: "Listen for honesty and a real remediation process.",
    whatToListenFor: "Honest acknowledgment of past issues and improvement processes.",
    insidersNote: "Quality contractors learn from mistakes and have clear remediation protocols.",
    redFlagTooltip: "Claims of perfection indicate either inexperience or unwillingness to fix problems.",
    proTipTooltip: "How they handle mistakes reveals their integrity and problem-solving approach."
  },
  {
    id: "air-protection",
    question: "How do you protect my home's air from dust, mold, or asbestos during work?",
    redFlag: "'We just try to be careful.'",
    proTip: "Ask to see photos or a written protocol for containment.",
    whatToListenFor: "Specific containment procedures and air quality protection measures.",
    insidersNote: "Professional contractors use plastic barriers, negative pressure, and air filtration.",
    redFlagTooltip: "Casual approach to air quality can create serious health hazards.",
    proTipTooltip: "Documentation proves they take health protection seriously."
  }
];
