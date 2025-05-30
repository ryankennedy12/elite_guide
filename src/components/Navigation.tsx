
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Elite 12 Questions', href: '#elite-questions' },
    { label: 'Cheat Sheet', href: '#cheat-sheet' },
    { label: 'Prep Checklist', href: '#prep-checklist' },
    { label: 'Glossary', href: '#glossary' },
    { label: 'Download PDF', href: '#download' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-4 space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-black hover:text-gray-600 font-medium transition-colors duration-200 hover:border-b-2 hover:border-yellow-500 pb-1"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-black text-white px-4 py-2"
            aria-label="Toggle navigation menu"
          >
            ☰ Menu
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-black text-white h-full w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">Navigation</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-2xl"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-white hover:text-yellow-500 text-lg py-3 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
