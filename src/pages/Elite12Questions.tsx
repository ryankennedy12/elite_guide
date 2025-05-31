
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ChevronDown, ChevronUp, AlertTriangle, ArrowRight, Lightbulb, Info } from 'lucide-react';
import { elite12Data } from '@/data/elite12Data';

const Elite12Questions = () => {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const CalloutBox = ({ 
    type, 
    icon: Icon, 
    title, 
    children, 
    isExpanded, 
    onToggle, 
    alwaysExpanded = false 
  }: { 
    type: 'info' | 'danger' | 'warning' | 'success';
    icon: any;
    title: string;
    children: React.ReactNode;
    isExpanded?: boolean;
    onToggle?: () => void;
    alwaysExpanded?: boolean;
  }) => {
    const colors = {
      info: { 
        accent: 'bg-blue-500', 
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50', 
        text: 'text-blue-800',
        border: 'border-blue-200',
        shadow: 'shadow-blue-100/50'
      },
      danger: { 
        accent: 'bg-red-500', 
        bg: 'bg-gradient-to-br from-red-50 to-red-100/50', 
        text: 'text-red-800',
        border: 'border-red-200',
        shadow: 'shadow-red-100/50'
      },
      warning: { 
        accent: 'bg-yellow-500', 
        bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100/50', 
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        shadow: 'shadow-yellow-100/50'
      },
      success: { 
        accent: 'bg-green-500', 
        bg: 'bg-gradient-to-br from-green-50 to-green-100/50', 
        text: 'text-green-800',
        border: 'border-green-200',
        shadow: 'shadow-green-100/50'
      }
    };

    const color = colors[type];
    const showContent = alwaysExpanded || isExpanded;

    return (
      <div className={`w-full ${color.bg} ${color.border} ${color.shadow} border rounded-xl mt-4 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}>
        <div className={`${color.accent} h-1.5 w-full`}></div>
        <div 
          className={`p-6 ${!alwaysExpanded ? 'cursor-pointer' : ''} transition-all duration-200 hover:bg-white/30`}
          onClick={!alwaysExpanded ? onToggle : undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${color.accent.replace('bg-', 'bg-').replace('500', '100')} ${color.text}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className={`font-semibold text-xs uppercase tracking-wider ${color.text}`}>
                {title}
              </h4>
            </div>
            {!alwaysExpanded && (
              <div className="ml-4">
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </div>
            )}
          </div>
          
          {showContent && (
            <div className="mt-4 text-gray-700 animate-fade-in">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/50 backdrop-blur-3xl">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Navigation />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 mb-8">
              <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                The Elite 12 Questions
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Use these proven questions to separate legitimate waterproofing contractors from the rest. Each question is designed to reveal critical information about their process, reliability, and expertise.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {elite12Data.map((question, index) => (
              <div key={index} className="animate-fade-in bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                <h2 className="font-inter-tight font-bold text-2xl md:text-3xl text-black mb-6 leading-tight">
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-lg text-lg font-bold mr-3">
                    Q{index + 1}
                  </span>
                  {question.question}
                </h2>

                {/* Why This Question Matters - Always expanded */}
                <CalloutBox
                  type="info"
                  icon={Info}
                  title="Why This Question Matters"
                  alwaysExpanded={true}
                >
                  <p className="leading-relaxed">{question.why}</p>
                </CalloutBox>

                {/* Red Flag Decoder - Mobile collapsible */}
                <CalloutBox
                  type="danger"
                  icon={AlertTriangle}
                  title="Red Flag Decoder"
                  isExpanded={expandedQuestions.has(index * 3 + 1)}
                  onToggle={() => toggleQuestion(index * 3 + 1)}
                >
                  <ul className="space-y-3">
                    {question.redFlags.map((flag, flagIndex) => (
                      <li key={flagIndex} className="flex items-start gap-3">
                        <span className="text-red-500 font-bold mt-1 text-lg">•</span>
                        <span className="leading-relaxed">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </CalloutBox>

                {/* Follow-Up - Mobile collapsible */}
                <CalloutBox
                  type="warning"
                  icon={ArrowRight}
                  title="Follow-Up — Ask This Next"
                  isExpanded={expandedQuestions.has(index * 3 + 2)}
                  onToggle={() => toggleQuestion(index * 3 + 2)}
                >
                  <p className="leading-relaxed">{question.followUp}</p>
                </CalloutBox>

                {/* Pro Tip - Mobile collapsible */}
                <CalloutBox
                  type="success"
                  icon={Lightbulb}
                  title="Pro Tip"
                  isExpanded={expandedQuestions.has(index * 3 + 3)}
                  onToggle={() => toggleQuestion(index * 3 + 3)}
                >
                  <p className="leading-relaxed">{question.proTip}</p>
                </CalloutBox>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50">
              <p className="text-gray-600 mb-4 leading-relaxed">
                Ready to put these questions to work? Check out the Quick Reference Cheat Sheet for easy printing.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Elite12Questions;
