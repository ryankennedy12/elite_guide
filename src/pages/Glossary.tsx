
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, Download, Printer, ArrowUp } from 'lucide-react';
import { glossaryData, glossarySections } from '@/data/glossaryData';
import { useContentAccess } from '@/hooks/useContentAccess';

const Glossary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<string[]>([]);

  useContentAccess();

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  // Filter terms based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return glossaryData;
    
    return glossaryData.map(section => ({
      ...section,
      terms: section.terms.filter(
        term =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(section => section.terms.length > 0);
  }, [searchTerm]);

  const totalFilteredTerms = useMemo(() => {
    return filteredData.reduce((total, section) => total + section.terms.length, 0);
  }, [filteredData]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Elite Waterproofing Glossary
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-2">
            All the key terms you'll need for contractor meetings—organized for real homeowners, not engineers.
          </p>
          <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-black text-white hover:bg-gray-800 px-6 py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button 
            onClick={handlePrint}
            variant="outline"
            className="border-black text-black hover:bg-gray-50 px-6 py-3"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Glossary
          </Button>
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
              {totalFilteredTerms} term{totalFilteredTerms !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Table of Contents (when not searching) */}
        {!searchTerm && (
          <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-black mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {glossarySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-left text-sm text-black hover:text-yellow-600 hover:underline py-1"
                >
                  {section.title} ({section.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Glossary Sections */}
        {!searchTerm ? (
          // Show as sections when not searching
          <div className="space-y-8">
            {glossaryData.map((section) => (
              <section key={section.section} id={section.section.toLowerCase().replace(/\s+/g, '-')}>
                <div className="border-t-4 border-yellow-500 bg-white">
                  <h2 className="font-inter-tight font-bold text-2xl md:text-3xl text-black mb-6 pt-4">
                    {section.section}
                  </h2>
                  
                  <div className="space-y-4">
                    {section.terms.map((term, index) => (
                      <div key={index} className="bg-white border-l-4 border-yellow-500 pl-6 py-4">
                        <dt className="font-semibold text-black text-lg mb-2">{term.term}</dt>
                        <dd className="text-gray-700 leading-relaxed">{term.definition}</dd>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <button
                      onClick={scrollToTop}
                      className="text-black underline hover:text-gray-600 text-sm"
                    >
                      ↑ Back to top
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          // Show as accordion when searching
          <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
            {filteredData.map((section) => (
              <AccordionItem key={section.section} value={section.section}>
                <AccordionTrigger className="text-left font-semibold text-lg">
                  {section.section} ({section.terms.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {section.terms.map((term, index) => (
                      <div key={index} className="bg-white border-l-4 border-yellow-500 pl-6 py-3">
                        <dt className="font-semibold text-black mb-1">{term.term}</dt>
                        <dd className="text-gray-700 text-sm leading-relaxed">{term.definition}</dd>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* No results message */}
        {filteredData.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No terms found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-black underline hover:text-gray-600"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Usage Tips */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2">💡 How to Use This Glossary</h3>
          <p className="text-gray-700 text-sm mb-4">
            When a contractor uses unfamiliar terminology, reference this glossary to understand exactly what they mean. 
            Don't hesitate to ask for clarification if something still isn't clear—good contractors appreciate informed homeowners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Print Tip:</strong> Use the Print button to create a physical reference for contractor meetings.
            </div>
            <div>
              <strong>Mobile Tip:</strong> Bookmark this page and reference it during phone calls with contractors.
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-gray-200">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-black text-white hover:bg-gray-800 px-6 py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button 
            onClick={scrollToTop}
            variant="outline"
            className="border-black text-black hover:bg-gray-50 px-6 py-3"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Glossary;
