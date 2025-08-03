import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I start using ContractorVET?',
        answer: 'Simply create a free account and begin with the Elite 12 Questions. These proven questions will help you immediately start identifying quality contractors and avoiding scams.'
      },
      {
        question: 'Do I need any special knowledge to use this app?',
        answer: 'Not at all! ContractorVET is designed for everyday homeowners. We provide all the background information, red flags, and pro tips you need to become an informed interviewer.'
      },
      {
        question: 'How much does ContractorVET cost?',
        answer: 'ContractorVET is completely free to use. We don\'t have partnerships with contractors or take commissions, ensuring you get unbiased advice.'
      },
      {
        question: 'What makes these questions different from others online?',
        answer: 'Our questions were developed by industry professionals and tested by real homeowners. Each question is designed to reveal specific information about contractor reliability, expertise, and integrity.'
      }
    ]
  },
  {
    category: 'Using the Tools',
    questions: [
      {
        question: 'What are the Elite 12 Questions?',
        answer: 'The Elite 12 are industry-tested questions that expose contractor weaknesses and reveal true expertise. Each comes with red flags to watch for and follow-up questions to dig deeper.'
      },
      {
        question: 'How does the Question Maker work?',
        answer: 'Tell us your specific concerns (like basement flooding or foundation cracks), and our tool generates targeted questions from 9 different categories to help you interview contractors effectively.'
      },
      {
        question: 'Can I compare multiple contractors?',
        answer: 'Yes! Our contractor comparison tool lets you track multiple contractors side-by-side, rate their responses, and make informed decisions based on their answers to your questions.'
      },
      {
        question: 'What\'s included in the project tracker?',
        answer: 'Track timelines, milestones, payments, and progress. Get alerts for important deadlines and keep all your project documentation organized in one place.'
      }
    ]
  },
  {
    category: 'Contractor Screening',
    questions: [
      {
        question: 'How many contractors should I interview?',
        answer: 'We recommend interviewing at least 3-5 contractors. This gives you enough comparison data to identify patterns and make an informed decision.'
      },
      {
        question: 'What are the biggest red flags to watch for?',
        answer: 'Door-to-door solicitation, demands for full payment upfront, no local references, unlicensed/uninsured, pressure tactics, and vague answers to technical questions.'
      },
      {
        question: 'Should I tell contractors I\'m using these questions?',
        answer: 'Absolutely! Professional contractors appreciate informed homeowners. If a contractor is uncomfortable with your questions, that\'s often a red flag itself.'
      },
      {
        question: 'What if a contractor can\'t answer these questions?',
        answer: 'That\'s valuable information! Quality contractors should be able to explain their process, show examples of their work, and provide references. Inability to answer suggests inexperience or dishonesty.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: 'Can I use this on my phone?',
        answer: 'Yes! ContractorVET is fully mobile-optimized. You can use it on your phone during contractor meetings or while researching at home.'
      },
      {
        question: 'Can I print the questions?',
        answer: 'Absolutely. All our question sets can be exported and printed for easy reference during contractor meetings.'
      },
      {
        question: 'Is my information secure?',
        answer: 'Yes, we use industry-standard security measures to protect your data. We never share your information with contractors or third parties.'
      },
      {
        question: 'What if I need help with a specific situation?',
        answer: 'While we can\'t provide personal consulting, our comprehensive guides, red flag database, and question tools are designed to handle most common scenarios.'
      }
    ]
  }
];

export const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      (selectedCategory === 'all' || category.category === selectedCategory) &&
      (searchTerm === '' || 
       q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
       q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0);

  const categories = ['all', ...faqData.map(cat => cat.category)];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Your Questions Answered
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about vetting contractors, using our tools, and protecting yourself from scams.
          </p>
        </div>

        {/* Search and filters */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ items */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-6">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const id = `${categoryIndex}-${questionIndex}`;
                  const isExpanded = expandedItems.has(id);
                  
                  return (
                    <Card key={id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleExpanded(id)}
                          className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                        >
                          <h4 className="font-semibold text-foreground pr-4">
                            {faq.question}
                          </h4>
                          {isExpanded ? 
                            <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : 
                            <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                          }
                        </button>
                        
                        {isExpanded && (
                          <div className="px-6 pb-6 border-t border-border">
                            <p className="text-muted-foreground leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No questions found matching your search. Try different keywords or browse all categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};