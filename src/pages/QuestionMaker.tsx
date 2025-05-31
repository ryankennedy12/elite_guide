
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ConcernInput from '@/components/QuestionMaker/ConcernInput';
import SearchFilters from '@/components/QuestionMaker/SearchFilters';
import QuestionDisplay from '@/components/QuestionMaker/QuestionDisplay';
import InterviewPlanSidebar from '@/components/QuestionMaker/InterviewPlanSidebar';
import { questionBank, hotTopics, categoryMappings, type QuestionItem, type QuestionCategory } from '@/data/questionBank';

const QuestionMaker = () => {
  const navigate = useNavigate();
  const [userConcern, setUserConcern] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<QuestionCategory[]>([]);
  const [starredQuestions, setStarredQuestions] = useState<Set<string>>(new Set());
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [newCustomQuestion, setNewCustomQuestion] = useState('');
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<QuestionCategory>>(new Set());

  useEffect(() => {
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const getRelevantQuestions = (): QuestionItem[] => {
    if (showAllQuestions || selectedCategories.length > 0) {
      let filtered = questionBank;
      
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(q => selectedCategories.includes(q.category as QuestionCategory));
      }
      
      if (searchTerm) {
        filtered = filtered.filter(q => 
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (showStarredOnly) {
        filtered = filtered.filter(q => starredQuestions.has(q.id));
      }
      
      return filtered;
    }

    if (!userConcern.trim() && selectedTopics.length === 0) return [];

    const keywords = userConcern.toLowerCase().split(' ').filter(word => word.length > 2);
    const relevantCategories = new Set<QuestionCategory>();

    keywords.forEach(keyword => {
      const categories = categoryMappings[keyword] || [];
      categories.forEach(cat => relevantCategories.add(cat));
    });

    selectedTopics.forEach(topicId => {
      const topic = hotTopics.find(t => t.id === topicId);
      if (topic) {
        topic.keywords.forEach(keyword => {
          const categories = categoryMappings[keyword] || [];
          categories.forEach(cat => relevantCategories.add(cat));
        });
      }
    });

    if (relevantCategories.size === 0) return questionBank.slice(0, 20);

    return questionBank.filter(q => relevantCategories.has(q.category as QuestionCategory));
  };

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleCategoryToggle = (category: QuestionCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const toggleStarQuestion = (questionId: string) => {
    setStarredQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const addCustomQuestion = () => {
    if (newCustomQuestion.trim()) {
      setCustomQuestions(prev => [...prev, newCustomQuestion.trim()]);
      setNewCustomQuestion('');
    }
  };

  const removeCustomQuestion = (index: number) => {
    setCustomQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const toggleCategoryExpansion = (category: QuestionCategory) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const exportToPDF = () => {
    const starredQuestionsArray = questionBank.filter(q => starredQuestions.has(q.id));
    const allQuestions = [...starredQuestionsArray, ...customQuestions.map((q, i) => ({
      id: `custom-${i}`,
      category: 'Custom',
      question: q
    }))];

    const content = allQuestions.map((q, index) => 
      `${index + 1}. ${q.question.replace(/\[user_concern\]/g, userConcern.trim() || 'your issue')}`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contractor-questions-${userConcern || 'basement'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const relevantQuestions = getRelevantQuestions();
  const questionsByCategory = relevantQuestions.reduce((acc, question) => {
    const category = question.category as QuestionCategory;
    if (!acc[category]) acc[category] = [];
    acc[category].push(question);
    return acc;
  }, {} as Record<QuestionCategory, QuestionItem[]>);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Ultimate Contractor Interview Kit
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Get the exact questions that separate real pros from smooth talkers. Filter by your concerns, star your favorites, and export a custom interview plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <ConcernInput
              userConcern={userConcern}
              setUserConcern={setUserConcern}
              selectedTopics={selectedTopics}
              onTopicToggle={handleTopicToggle}
              showAllQuestions={showAllQuestions}
              setShowAllQuestions={setShowAllQuestions}
              showStarredOnly={showStarredOnly}
              setShowStarredOnly={setShowStarredOnly}
              starredCount={starredQuestions.size}
            />

            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
            />

            <QuestionDisplay
              questionsByCategory={questionsByCategory}
              expandedCategories={expandedCategories}
              starredQuestions={starredQuestions}
              userConcern={userConcern}
              onToggleCategoryExpansion={toggleCategoryExpansion}
              onToggleStarQuestion={toggleStarQuestion}
            />
          </div>

          <div className="lg:col-span-1">
            <InterviewPlanSidebar
              starredQuestions={starredQuestions}
              customQuestions={customQuestions}
              newCustomQuestion={newCustomQuestion}
              setNewCustomQuestion={setNewCustomQuestion}
              userConcern={userConcern}
              onAddCustomQuestion={addCustomQuestion}
              onRemoveCustomQuestion={removeCustomQuestion}
              onExportToPDF={exportToPDF}
            />
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2">💡 Pro Interview Strategy</h3>
          <p className="text-gray-700 text-sm">
            Start with your starred questions, then add 2-3 custom ones based on your specific situation. 
            The best contractors will appreciate your preparation and provide detailed, confident answers. 
            If they seem annoyed or give vague responses, that's your red flag to keep looking.
          </p>
        </div>
      </main>
    </div>
  );
};

export default QuestionMaker;
