
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BlurOverlay } from './BlurOverlay';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Star, ChevronDown, ChevronUp, HelpCircle, Download, Home, ArrowUp, RotateCcw, Printer } from 'lucide-react';
import { enhancedCheatSheetData, EnhancedCheatSheetItem } from '@/data/enhancedCheatSheetData';

interface EnhancedCheatSheetProps {
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

interface UserNotes {
  [questionId: string]: string;
}

interface QuestionState {
  starred: boolean;
  hidden: boolean;
  expanded: boolean;
}

interface UserState {
  [questionId: string]: QuestionState;
}

export const EnhancedCheatSheet: React.FC<EnhancedCheatSheetProps> = ({ isUnlocked, onUnlockClick }) => {
  const [userNotes, setUserNotes] = useState<UserNotes>({});
  const [userState, setUserState] = useState<UserState>({});
  const [questionOrder, setQuestionOrder] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Initialize state from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('cheatsheet_notes');
    const savedState = localStorage.getItem('cheatsheet_state');
    const savedOrder = localStorage.getItem('cheatsheet_order');

    if (savedNotes) setUserNotes(JSON.parse(savedNotes));
    if (savedState) setUserState(JSON.parse(savedState));
    if (savedOrder) {
      setQuestionOrder(JSON.parse(savedOrder));
    } else {
      setQuestionOrder(enhancedCheatSheetData.map(item => item.id));
    }
  }, []);

  // Calculate progress based on expanded/viewed questions
  useEffect(() => {
    const viewedCount = Object.values(userState).filter(state => state.expanded).length;
    setProgress(Math.round((viewedCount / enhancedCheatSheetData.length) * 100));
  }, [userState]);

  // Save to localStorage
  const saveUserNotes = (notes: UserNotes) => {
    localStorage.setItem('cheatsheet_notes', JSON.stringify(notes));
    setUserNotes(notes);
  };

  const saveUserState = (state: UserState) => {
    localStorage.setItem('cheatsheet_state', JSON.stringify(state));
    setUserState(state);
  };

  const updateNote = (questionId: string, note: string) => {
    saveUserNotes({ ...userNotes, [questionId]: note });
  };

  const toggleStar = (questionId: string) => {
    const newState = {
      ...userState,
      [questionId]: {
        ...userState[questionId],
        starred: !userState[questionId]?.starred
      }
    };
    saveUserState(newState);
  };

  const toggleExpanded = (questionId: string) => {
    const newState = {
      ...userState,
      [questionId]: {
        ...userState[questionId],
        expanded: !userState[questionId]?.expanded
      }
    };
    saveUserState(newState);
  };

  const toggleHidden = (questionId: string) => {
    const newState = {
      ...userState,
      [questionId]: {
        ...userState[questionId],
        hidden: !userState[questionId]?.hidden
      }
    };
    saveUserState(newState);
  };

  const resetToDefault = () => {
    localStorage.removeItem('cheatsheet_notes');
    localStorage.removeItem('cheatsheet_state');
    localStorage.removeItem('cheatsheet_order');
    setUserNotes({});
    setUserState({});
    setQuestionOrder(enhancedCheatSheetData.map(item => item.id));
  };

  const generatePDF = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'file_download', {
        file_name: 'elite_12_enhanced_cheat_sheet.pdf',
        file_extension: 'pdf',
      });
    }
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisibleQuestions = () => {
    return questionOrder
      .map(id => enhancedCheatSheetData.find(item => item.id === id))
      .filter(item => item && !userState[item.id]?.hidden) as EnhancedCheatSheetItem[];
  };

  const CheatSheetContent = () => (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-inter-tight font-bold text-3xl md:text-4xl mb-4">
            Enhanced Quick Reference
          </h2>
          <p className="text-gray-600 mb-6">
            Interactive cheat sheet with personal notes and smart features
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{progress}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={generatePDF} className="bg-black text-white hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </TooltipTrigger>
              <TooltipContent>Best for in-person meetings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => window.print()} variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fill out digitally and save</TooltipContent>
            </Tooltip>

            <Button onClick={resetToDefault} variant="outline" className="text-gray-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          </div>

          {/* How to Use */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              <strong>How to Use:</strong> Tap questions to expand details, star important ones, and add personal notes. Your progress saves automatically.
            </p>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {getVisibleQuestions().map((item, index) => (
            <QuestionCard
              key={item.id}
              item={item}
              index={index + 1}
              isExpanded={userState[item.id]?.expanded || false}
              isStarred={userState[item.id]?.starred || false}
              userNote={userNotes[item.id] || ''}
              onToggleExpanded={() => toggleExpanded(item.id)}
              onToggleStar={() => toggleStar(item.id)}
              onToggleHidden={() => toggleHidden(item.id)}
              onUpdateNote={(note) => updateNote(item.id, note)}
            />
          ))}
        </div>

        {/* Floating Action Bar - Mobile */}
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
          <div className="bg-black text-white rounded-full px-4 py-2 flex justify-between items-center shadow-lg">
            <Button size="sm" variant="ghost" className="text-white" onClick={() => window.location.href = '/'}>
              <Home className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white" onClick={generatePDF}>
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white" onClick={scrollToTop}>
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );

  return (
    <section id="enhanced-cheat-sheet" className="mb-18 md:mb-24">
      <BlurOverlay 
        isUnlocked={isUnlocked} 
        onUnlockClick={onUnlockClick}
        showTeaser={true}
        teaserText="Interactive cheat sheet with notes, bookmarks, and smart features..."
      >
        <CheatSheetContent />
      </BlurOverlay>
    </section>
  );
};

interface QuestionCardProps {
  item: EnhancedCheatSheetItem;
  index: number;
  isExpanded: boolean;
  isStarred: boolean;
  userNote: string;
  onToggleExpanded: () => void;
  onToggleStar: () => void;
  onToggleHidden: () => void;
  onUpdateNote: (note: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  index,
  isExpanded,
  isStarred,
  userNote,
  onToggleExpanded,
  onToggleStar,
  onToggleHidden,
  onUpdateNote,
}) => {
  return (
    <Card className="border-t-4 border-t-yellow-500 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <Collapsible open={isExpanded} onOpenChange={onToggleExpanded} className="flex-1">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-left p-0 h-auto">
                <div className="flex items-center gap-3 w-full">
                  <span className="font-bold text-black">Q{index}.</span>
                  <h3 className="font-semibold text-black flex-1">{item.question}</h3>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleStar}
              className={isStarred ? 'text-yellow-500' : 'text-gray-400'}
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleHidden}
              className="text-gray-400"
            >
              ✕
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Basic Info - Always Visible */}
        <div className="space-y-4">
          {/* Red Flag */}
          <div className="border border-red-300 rounded-lg p-3 bg-red-50">
            <div className="flex items-start gap-2">
              <h4 className="font-semibold text-red-700 text-sm">🚩 RED FLAG:</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-red-500 cursor-help mt-0.5" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">{item.redFlagTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-red-700 text-sm mt-1">{item.redFlag}</p>
          </div>

          {/* Pro Tip */}
          <div className="border border-green-300 rounded-lg p-3 bg-green-50">
            <div className="flex items-start gap-2">
              <h4 className="font-semibold text-green-700 text-sm">💡 PRO TIP:</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-green-500 cursor-help mt-0.5" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">{item.proTipTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-green-700 text-sm mt-1">{item.proTip}</p>
          </div>
        </div>

        {/* Expanded Content */}
        <Collapsible open={isExpanded}>
          <CollapsibleContent className="pt-4 space-y-4 animate-slide-down">
            {/* What to Listen For */}
            <div className="border border-blue-300 rounded-lg p-3 bg-blue-50">
              <h4 className="font-semibold text-blue-700 text-sm mb-1">👂 WHAT TO LISTEN FOR:</h4>
              <p className="text-blue-700 text-sm">{item.whatToListenFor}</p>
            </div>

            {/* Insider's Note */}
            <div className="border border-purple-300 rounded-lg p-3 bg-purple-50">
              <h4 className="font-semibold text-purple-700 text-sm mb-1">🔍 INSIDER'S NOTE:</h4>
              <p className="text-purple-700 text-sm">{item.insidersNote}</p>
            </div>

            {/* Personal Notes */}
            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">📝 YOUR NOTES:</h4>
              <textarea
                value={userNote}
                onChange={(e) => onUpdateNote(e.target.value)}
                placeholder="Add your thoughts, contractor responses, or reminders..."
                className="w-full p-2 border border-gray-200 rounded text-sm resize-none"
                rows={3}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
