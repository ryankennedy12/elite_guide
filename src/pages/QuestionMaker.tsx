
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Download, Search, Filter, X } from 'lucide-react';
import { questionBank, questionCategories, hotTopics, categoryMappings, type QuestionItem, type QuestionCategory } from '@/data/questionBank';

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

    // Add categories from keywords
    keywords.forEach(keyword => {
      const categories = categoryMappings[keyword] || [];
      categories.forEach(cat => relevantCategories.add(cat));
    });

    // Add categories from selected topics
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

  const replaceUserConcern = (questionText: string): string => {
    return questionText.replace(/\[user_concern\]/g, userConcern.trim() || 'your issue');
  };

  const exportToPDF = () => {
    const starredQuestionsArray = questionBank.filter(q => starredQuestions.has(q.id));
    const allQuestions = [...starredQuestionsArray, ...customQuestions.map((q, i) => ({
      id: `custom-${i}`,
      category: 'Custom',
      question: q
    }))];

    // Simple export logic - in a real app you'd use a PDF library
    const content = allQuestions.map((q, index) => 
      `${index + 1}. ${replaceUserConcern(q.question)}`
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
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>What's your main concern?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="concern">Enter your specific concern</Label>
                  <Input
                    id="concern"
                    value={userConcern}
                    onChange={(e) => setUserConcern(e.target.value)}
                    placeholder="e.g., mold, water intrusion, musty smell..."
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label>Quick topics (select any that apply)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hotTopics.map(topic => (
                      <Button
                        key={topic.id}
                        onClick={() => handleTopicToggle(topic.id)}
                        variant={selectedTopics.includes(topic.id) ? "default" : "outline"}
                        size="sm"
                        className={selectedTopics.includes(topic.id) ? "bg-black text-white" : ""}
                      >
                        {topic.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setShowAllQuestions(!showAllQuestions)}
                    variant="outline"
                    size="sm"
                  >
                    {showAllQuestions ? 'Show Filtered' : 'Show All Questions'}
                  </Button>
                  
                  <Button
                    onClick={() => setShowStarredOnly(!showStarredOnly)}
                    variant="outline"
                    size="sm"
                    className={showStarredOnly ? "bg-yellow-500 text-black" : ""}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    {showStarredOnly ? 'Show All' : 'Starred Only'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search questions..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Filter by category</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {questionCategories.map(category => (
                      <Button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        size="sm"
                        className={selectedCategories.includes(category) ? "bg-black text-white" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions Display */}
            <div className="space-y-6">
              {Object.entries(questionsByCategory).map(([category, questions]) => (
                <Card key={category}>
                  <CardHeader>
                    <Button
                      onClick={() => toggleCategoryExpansion(category as QuestionCategory)}
                      variant="ghost"
                      className="justify-between w-full p-0 h-auto"
                    >
                      <CardTitle className="text-lg">{category} ({questions.length})</CardTitle>
                      <span>{expandedCategories.has(category as QuestionCategory) ? '−' : '+'}</span>
                    </Button>
                  </CardHeader>
                  {expandedCategories.has(category as QuestionCategory) && (
                    <CardContent className="space-y-3">
                      {questions.map(question => (
                        <div key={question.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                          <Button
                            onClick={() => toggleStarQuestion(question.id)}
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                          >
                            <Star className={`w-5 h-5 ${starredQuestions.has(question.id) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                          </Button>
                          <div className="flex-1">
                            <p className="text-gray-800">{replaceUserConcern(question.question)}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - My Interview Plan */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Interview Plan
                  <span className="text-sm font-normal text-gray-500">
                    {starredQuestions.size + customQuestions.length} questions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Starred Questions Preview */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Array.from(starredQuestions).slice(0, 3).map(questionId => {
                    const question = questionBank.find(q => q.id === questionId);
                    return question ? (
                      <div key={questionId} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                        {replaceUserConcern(question.question).substring(0, 80)}...
                      </div>
                    ) : null;
                  })}
                  {starredQuestions.size > 3 && (
                    <div className="text-xs text-gray-500">+ {starredQuestions.size - 3} more</div>
                  )}
                </div>

                {/* Custom Questions */}
                <div>
                  <Label className="text-sm">Add custom question</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newCustomQuestion}
                      onChange={(e) => setNewCustomQuestion(e.target.value)}
                      placeholder="Your question..."
                      className="text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomQuestion()}
                    />
                    <Button onClick={addCustomQuestion} size="sm">Add</Button>
                  </div>
                </div>

                {customQuestions.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm">Custom questions</Label>
                    {customQuestions.map((question, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs bg-blue-50 p-2 rounded">
                        <span className="flex-1">{question}</span>
                        <Button
                          onClick={() => removeCustomQuestion(index)}
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Export Button */}
                <Button
                  onClick={exportToPDF}
                  disabled={starredQuestions.size === 0 && customQuestions.length === 0}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export My Plan
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Questions will include your specific concern: "{userConcern || 'your issue'}"
                </div>
              </CardContent>
            </Card>
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
