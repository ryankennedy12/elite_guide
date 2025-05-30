
import React, { useState } from 'react';

interface QuestionCardProps {
  number: number;
  question: string;
  why: string;
  redFlags: string[];
  followUp: string;
  proTip: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  number,
  question,
  why,
  redFlags,
  followUp,
  proTip,
}) => {
  const [expandedCallout, setExpandedCallout] = useState<string | null>(null);

  const toggleCallout = (calloutType: string) => {
    setExpandedCallout(expandedCallout === calloutType ? null : calloutType);
  };

  const CalloutComponent = ({ type, icon, title, children, borderColor }: {
    type: string;
    icon: string;
    title: string;
    children: React.ReactNode;
    borderColor: string;
  }) => {
    const isExpanded = expandedCallout === type;
    
    return (
      <div className={`bg-white border border-black rounded-xl p-6 mt-4 border-t-4`} style={{ borderTopColor: borderColor }}>
        <button
          onClick={() => toggleCallout(type)}
          className="flex items-center justify-between w-full md:cursor-default"
          aria-expanded={isExpanded}
        >
          <div className={`inline-block px-3 py-1 rounded text-white text-xs uppercase tracking-wider font-medium`} style={{ backgroundColor: borderColor }}>
            {icon} {title}
          </div>
          <span className="md:hidden text-xl">{isExpanded ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-4 ${window.innerWidth <= 767 ? (isExpanded ? 'block' : 'hidden') : 'block'}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8">
      <h3 className="font-inter-tight font-bold text-xl md:text-2xl mb-4 text-black">
        Q{number}. {question}
      </h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-lg">ℹ️</span>
          <div>
            <span className="font-semibold text-black">Why This Question Matters:</span>
            <p className="text-gray-700 mt-1">{why}</p>
          </div>
        </div>
      </div>

      <CalloutComponent
        type={`redflag-${number}`}
        icon="⚠️"
        title="Red Flag Decoder"
        borderColor="#F44336"
      >
        <ul className="space-y-2">
          {redFlags.map((flag, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-1">•</span>
              <span className="text-gray-700">{flag}</span>
            </li>
          ))}
        </ul>
      </CalloutComponent>

      <CalloutComponent
        type={`followup-${number}`}
        icon="➡️"
        title="Follow-Up — Ask This Next"
        borderColor="#FFC107"
      >
        <p className="text-gray-700">{followUp}</p>
      </CalloutComponent>

      <CalloutComponent
        type={`protip-${number}`}
        icon="💡"
        title="Pro Tip"
        borderColor="#4CAF50"
      >
        <p className="text-gray-700">{proTip}</p>
      </CalloutComponent>
    </div>
  );
};
