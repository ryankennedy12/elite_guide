import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ChevronDown, ChevronUp, AlertTriangle, ArrowRight, Lightbulb, Info } from 'lucide-react';
import { elite12Data } from '@/data/elite12Data';
import ShareFeedbackModal from '@/components/ShareFeedbackModal';
import { useShareFeedbackModal } from '@/hooks/useShareFeedbackModal';

const Elite12Questions = () => {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const { isModalOpen, triggerModal, closeModal } = useShareFeedbackModal();

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Trigger modal when user reaches the end of the guide
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If user scrolled to within 100px of bottom, consider it completion
      if (scrollPosition >= documentHeight - 100) {
        triggerModal('guide_completion');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerModal]);

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
      info: { accent: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
      danger: { accent: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' },
      warning: { accent: 'bg-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700' },
      success: { accent: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700' }
    };

    const color = colors[type];
    const showContent = alwaysExpanded || isExpanded;

    return (
      <div className="w-full bg-white border border-black rounded-xl mt-4 overflow-hidden">
        <div className={`${color.accent} h-1.5 w-full`}></div>
        <div 
          className={`p-6 ${!alwaysExpanded ? 'cursor-pointer' : ''}`}
          onClick={!alwaysExpanded ? onToggle : undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color.text}`} />
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
            <div className="mt-4 text-gray-700">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            The Elite 12 Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Use these proven questions to separate legitimate waterproofing contractors from the rest. Each question is designed to reveal critical information about their process, reliability, and expertise.
          </p>
        </div>

        <div className="space-y-12">
          {elite12Data.map((question, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <h2 className="font-inter-tight font-bold text-2xl md:text-3xl text-black mb-4">
                Q{index + 1}. {question.question}
              </h2>

              {/* Why This Question Matters - Always expanded */}
              <CalloutBox
                type="info"
                icon={Info}
                title="Why This Question Matters"
                alwaysExpanded={true}
              >
                <p>{question.why}</p>
              </CalloutBox>

              {/* Red Flag Decoder - Mobile collapsible */}
              <CalloutBox
                type="danger"
                icon={AlertTriangle}
                title="Red Flag Decoder"
                isExpanded={expandedQuestions.has(index * 3 + 1)}
                onToggle={() => toggleQuestion(index * 3 + 1)}
              >
                <ul className="space-y-2">
                  {question.redFlags.map((flag, flagIndex) => (
                    <li key={flagIndex} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-1">•</span>
                      <span>{flag}</span>
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
                <p>{question.followUp}</p>
              </CalloutBox>

              {/* Pro Tip - Mobile collapsible */}
              <CalloutBox
                type="success"
                icon={Lightbulb}
                title="Pro Tip"
                isExpanded={expandedQuestions.has(index * 3 + 3)}
                onToggle={() => toggleQuestion(index * 3 + 3)}
              >
                <p>{question.proTip}</p>
              </CalloutBox>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ready to put these questions to work? Check out the Quick Reference Cheat Sheet for easy printing.
          </p>
        </div>
      </main>

      <ShareFeedbackModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Elite12Questions;
