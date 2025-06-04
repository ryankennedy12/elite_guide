
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useContentAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user has unlocked content
  const isUnlocked = localStorage.getItem('elite12_unlocked') === 'true';
  
  // Check if we're in development mode - include Vite's DEV flag
  const isDevelopment = import.meta.env.DEV || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  // Allow access if unlocked OR in development mode
  const hasAccess = isUnlocked || isDevelopment;
  
  useEffect(() => {
    // In development mode, NEVER redirect - allow free navigation
    if (isDevelopment) {
      return;
    }
    
    // Only redirect if we don't have access and we're not already on the home page
    if (!hasAccess && location.pathname !== '/') {
      navigate('/');
    }
  }, [hasAccess, location.pathname, navigate, isDevelopment]);
  
  return { hasAccess, isUnlocked, isDevelopment };
};
