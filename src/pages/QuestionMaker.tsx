
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const QuestionMaker = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({
    concern: '',
    worry: '',
    nightmare: '',
    understand: '',
    customQuestion: ''
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const prompts = [
    {
      id: 'concern',
      label: "What's your #1 concern about your basement or project?",
      placeholder: "e.g., Water keeps coming back after repairs..."
    },
    {
      id: 'worry',
      label: "What have you seen or heard that worries you most?",
      placeholder: "e.g., Stories about contractors disappearing mid-job..."
    },
    {
      id: 'nightmare',
      label: "What would be your 'nightmare scenario' as a homeowner?",
      placeholder: "e.g., Flooding ruins my finished basement..."
    },
    {
      id: 'understand',
      label: "What's the biggest thing you DON'T understand about waterproofing?",
      placeholder: "e.g., Why some systems fail while others last decades..."
    },
    {
      id: 'customQuestion',
      label: "Now, turn one concern into a question: 'How will you make sure ____ never happens to my home?'",
      placeholder: "e.g., How will you make sure water never comes back through my foundation walls?"
    }
  ];

  const handleInputChange = (id: string, value: string) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const generateQuestions = () => {
    const questions: string[] = [];
    
    if (responses.concern) {
      questions.push(`Given my concern about ${responses.concern.toLowerCase()}, what specific steps will you take to address this?`);
    }
    
    if (responses.worry) {
      questions.push(`I've heard about ${responses.worry.toLowerCase()}. How do you prevent this from happening?`);
    }
    
    if (responses.nightmare) {
      questions.push(`My worst fear is ${responses.nightmare.toLowerCase()}. What guarantees do you offer against this scenario?`);
    }
    
    if (responses.understand) {
      questions.push(`I don't fully understand ${responses.understand.toLowerCase()}. Can you explain this in simple terms?`);
    }
    
    if (responses.customQuestion) {
      questions.push(responses.customQuestion);
    }

    setGeneratedQuestions(questions);
    setShowResults(true);

    // Track analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'custom_questions_generated', {
        questions_count: questions.length,
      });
    }
  };

  const exportToNotes = () => {
    // Save to My Notes page
    const existingNotes = JSON.parse(localStorage.getItem('customNotes') || '{}');
    const newNotes = {
      ...existingNotes,
      generatedQuestions: generatedQuestions
    };
    localStorage.setItem('customNotes', JSON.stringify(newNotes));
    
    // Navigate to My Notes
    navigate('/my-notes');
  };

  const isFormComplete = Object.values(responses).some(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Question Maker
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The best contractors respect a homeowner who asks sharp, specific questions. Use this tool to brainstorm your own—then take them with you to every meeting.
          </p>
        </div>

        {!showResults ? (
          <div className="space-y-8">
            {prompts.map((prompt, index) => (
              <div key={prompt.id} className="space-y-3">
                <Label htmlFor={prompt.id} className="text-black font-medium text-base">
                  {index + 1}. {prompt.label}
                </Label>
                {prompt.id === 'customQuestion' ? (
                  <Textarea
                    id={prompt.id}
                    value={responses[prompt.id as keyof typeof responses]}
                    onChange={(e) => handleInputChange(prompt.id, e.target.value)}
                    placeholder={prompt.placeholder}
                    className="w-full min-h-[80px] border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-yellow-500"
                    rows={3}
                  />
                ) : (
                  <Input
                    id={prompt.id}
                    type="text"
                    value={responses[prompt.id as keyof typeof responses]}
                    onChange={(e) => handleInputChange(prompt.id, e.target.value)}
                    placeholder={prompt.placeholder}
                    className="w-full border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              </div>
            ))}

            <div className="text-center pt-8">
              <Button
                onClick={generateQuestions}
                disabled={!isFormComplete}
                className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate My Custom Questions
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-inter-tight font-bold text-2xl text-black mb-2">
                Your Custom Questions
              </h2>
              <p className="text-gray-600">
                Here are personalized questions based on your specific concerns:
              </p>
            </div>

            <div className="space-y-4">
              {generatedQuestions.map((question, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 leading-relaxed">{question}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => setShowResults(false)}
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-50"
              >
                Create More Questions
              </Button>
              <Button
                onClick={exportToNotes}
                className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Export to My Notes
              </Button>
            </div>
          </div>
        )}

        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2">💡 Using Your Custom Questions</h3>
          <p className="text-gray-700 text-sm">
            Print these questions or save them to your phone. Ask them during contractor meetings along with the Elite 12 questions. 
            The best contractors will appreciate your thoughtful preparation and provide detailed, honest answers.
          </p>
        </div>
      </main>
    </div>
  );
};

export default QuestionMaker;
