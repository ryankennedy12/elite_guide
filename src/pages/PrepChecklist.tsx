
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { prepChecklistData } from '@/data/prepChecklistData';
import { InteractiveCheckbox } from '@/components/InteractiveCheckbox';
import { ChecklistProgress } from '@/components/ChecklistProgress';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Printer, Download, Mail, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PrepChecklist = () => {
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem('prep_checklist_progress');
    if (savedProgress) {
      try {
        setCheckedItems(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Calculate total items and completion
  const totalItems = prepChecklistData.reduce((sum, section) => sum + section.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;

  // Handle checkbox changes
  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [itemId]: checked };
    setCheckedItems(newCheckedItems);
    
    // Save to localStorage
    localStorage.setItem('prep_checklist_progress', JSON.stringify(newCheckedItems));

    // Check for section completion
    checkSectionCompletion(newCheckedItems);
  };

  // Check if a section is completed and show celebration
  const checkSectionCompletion = (currentChecked: Record<string, boolean>) => {
    prepChecklistData.forEach((section, sectionIndex) => {
      const sectionItems = section.items.map((_, itemIndex) => `${sectionIndex}-${itemIndex}`);
      const sectionCompleted = sectionItems.every(itemId => currentChecked[itemId]);
      
      if (sectionCompleted && !completedSections.has(section.title)) {
        setCompletedSections(prev => new Set([...prev, section.title]));
        
        // Show celebration toast
        toast({
          title: `${section.title} Phase Complete! 🎉`,
          description: `Great job! You're ready for the ${section.title.toLowerCase()} phase.`,
          duration: 4000,
        });
      }
    });
  };

  // Quick actions
  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Your checklist is ready to print!",
    });
  };

  const handleDownload = () => {
    // Create a simple text version for download
    let content = "Elite 12 Homeowner Prep Checklist\n\n";
    
    prepChecklistData.forEach(section => {
      content += `${section.title}\n`;
      content += `${section.tip}\n\n`;
      
      section.items.forEach((item, index) => {
        const itemId = `${prepChecklistData.indexOf(section)}-${index}`;
        const checked = checkedItems[itemId] ? '✓' : '☐';
        content += `${checked} ${item.text}\n`;
      });
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'homeowner-prep-checklist.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Checklist Downloaded!",
      description: "Your progress has been saved to a text file.",
    });
  };

  const handleEmailToSelf = () => {
    const subject = "My Homeowner Prep Checklist Progress";
    const body = `Here's my current checklist progress: ${completedItems}/${totalItems} items complete (${Math.round((completedItems/totalItems)*100)}%)`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Interactive Prep Checklist
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay organized and in control. Your progress is automatically saved on this device.
          </p>
        </div>

        {/* Progress and Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <ChecklistProgress 
            completed={completedItems} 
            total={totalItems}
            className="md:col-span-2"
          />
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-black mb-3 text-center">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                onClick={handlePrint}
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Checklist
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Progress
              </Button>
              <Button 
                onClick={handleEmailToSelf}
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email to Self
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Checklist */}
        <Accordion type="single" collapsible className="space-y-4">
          {prepChecklistData.map((section, sectionIndex) => {
            const sectionItems = section.items.map((_, itemIndex) => `${sectionIndex}-${itemIndex}`);
            const sectionCompleted = sectionItems.every(itemId => checkedItems[itemId]);
            const sectionProgress = sectionItems.filter(itemId => checkedItems[itemId]).length;
            
            return (
              <AccordionItem 
                key={sectionIndex} 
                value={`section-${sectionIndex}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 bg-black text-white hover:bg-gray-800 [&[data-state=open]]:bg-gray-800">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-3">
                      <h2 className="font-inter-tight font-semibold text-lg uppercase tracking-wider">
                        {section.title}
                      </h2>
                      {sectionCompleted && (
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <span className="text-sm opacity-75">
                      {sectionProgress}/{section.items.length}
                    </span>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 py-4">
                  <p className="text-gray-600 text-center mb-4 italic">
                    {section.tip}
                  </p>
                  
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => {
                      const itemId = `${sectionIndex}-${itemIndex}`;
                      return (
                        <InteractiveCheckbox
                          key={itemId}
                          id={itemId}
                          text={item.text}
                          checked={!!checkedItems[itemId]}
                          onChange={(checked) => handleCheckboxChange(itemId, checked)}
                          priority={item.priority}
                          tooltip={item.tooltip}
                        />
                      );
                    })}
                  </div>
                  
                  {sectionCompleted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <span className="text-green-700 font-medium">
                        ✅ {section.title} phase complete! Great work!
                      </span>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        
        {/* Final Pro Tip */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
            💡 Ultimate Organization Tip
          </h3>
          <p className="text-gray-700 text-sm">
            Set up a dedicated folder (digital or physical) to keep all photos, reports, contracts, and correspondence in one place. This will save massive headaches if anything goes wrong or you need warranty service later.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrepChecklist;
