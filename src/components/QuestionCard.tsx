
import React from 'react';

interface QuestionCardProps {
  number: number;
  question: string;
  why: string;
  redFlags: string[];
  followUp: string;
  proTip: string;
  hideQuestion?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  number,
  question,
  why,
  redFlags,
  followUp,
  proTip,
  hideQuestion = false
}) => {
  return (
    <div className="space-y-6">
      {!hideQuestion && (
        <h3 className="font-inter-tight font-bold text-xl md:text-2xl text-black">
          Q{number}. {question}
        </h3>
      )}
      
      {/* Why This Question Matters */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">ℹ</span>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-2">Why This Question Matters:</h4>
            <p className="text-gray-700">{why}</p>
          </div>
        </div>
      </div>
      
      {/* Red Flag Decoder */}
      <div className="bg-white border border-black rounded-lg overflow-hidden">
        <div className="bg-red-500 px-4 py-3 border-t-4 border-red-600">
          <h4 className="text-white font-semibold uppercase text-sm tracking-wider flex items-center gap-2">
            ⚠️ RED FLAG DECODER
          </h4>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span className="text-gray-700">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Follow-Up */}
      <div className="bg-white border border-black rounded-lg overflow-hidden">
        <div className="bg-yellow-500 px-4 py-3 border-t-4 border-yellow-600">
          <h4 className="text-black font-semibold uppercase text-sm tracking-wider flex items-center gap-2">
            ➡️ FOLLOW-UP — ASK THIS NEXT
          </h4>
        </div>
        <div className="p-6">
          <p className="text-gray-700">{followUp}</p>
        </div>
      </div>
      
      {/* Pro Tip */}
      <div className="bg-white border border-black rounded-lg overflow-hidden">
        <div className="bg-green-500 px-4 py-3 border-t-4 border-green-600">
          <h4 className="text-white font-semibold uppercase text-sm tracking-wider flex items-center gap-2">
            💡 PRO TIP
          </h4>
        </div>
        <div className="p-6">
          <p className="text-gray-700">{proTip}</p>
        </div>
      </div>
    </div>
  );
};
