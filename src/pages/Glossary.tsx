
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { glossaryData } from '@/data/glossaryData';

const Glossary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const filteredTerms = useMemo(() => {
    if (!searchTerm) return glossaryData;
    
    return glossaryData.filter(
      item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Basement Waterproofing Glossary
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Jargon Buster — Your quick reference for understanding contractor terminology and technical concepts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
        </div>

        {/* Results count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Glossary Grid */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {filteredTerms.map((item, index) => (
            <div key={index} className="py-3 border-b border-gray-100 last:border-b-0">
              <dt className="font-semibold text-black mb-1">{item.term}:</dt>
              <dd className="text-gray-700 text-sm leading-relaxed">{item.definition}</dd>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">No terms found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-black underline hover:text-gray-600 mt-2"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2">💡 How to Use This Glossary</h3>
          <p className="text-gray-700 text-sm">
            When a contractor uses unfamiliar terminology, reference this glossary to understand exactly what they mean. 
            Don't hesitate to ask for clarification if something still isn't clear—good contractors appreciate informed homeowners.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Glossary;
