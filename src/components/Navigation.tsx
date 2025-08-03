
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: 'Elite 12 Questions', href: '/elite-12', id: 'elite-12' },
    { label: 'Quick Reference', href: '/cheat-sheet', id: 'cheat-sheet' },
    { label: 'Prep Checklist', href: '/prep-checklist', id: 'prep-checklist' },
    { label: 'Glossary', href: '/glossary', id: 'glossary' },
    { label: 'Question Maker', href: '/question-maker', id: 'question-maker' },
    { label: 'Compare Contractors', href: '/contractor-comparison', id: 'contractor-comparison' },
    { label: 'Project Tracker', href: '/project-tracker', id: 'project-tracker' },
    { label: 'My Notes', href: '/my-notes', id: 'my-notes' },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Always show navigation - no email gating
  const shouldShowNavigation = true;

  if (!shouldShowNavigation) {
    return null;
  }

  return (
    <nav className="sticky top-0 bg-black text-white z-50 border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between py-3">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white">
            Home
          </Link>
          <div className="flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-300 ${
                    isActive(item.href) 
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow-500' 
                      : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center gap-4 border-l border-gray-700 pl-8">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">
                      {user.email}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={signOut}
                    className="text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  asChild 
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between py-3">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white">
            Home
          </Link>
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-800 focus:ring-0 focus:outline-none p-3 touch-target"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 md:hidden animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <span className="text-lg font-semibold">Navigation</span>
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800 focus:ring-0 focus:outline-none p-3 touch-target touch-feedback"
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 touch-target touch-feedback ${
                    location.pathname === '/'
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  Home
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 touch-target touch-feedback ${
                      isActive(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-800 mt-6 pt-6">
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <User size={16} />
                        {user.email}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white touch-target"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-medium touch-target"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
