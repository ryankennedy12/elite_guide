import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useContentAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Always allow access - no email gating
  const hasAccess = true;
  const isUnlocked = true;
  
  // Check if we're in development mode - keep this for potential future use
  const isDevelopment = import.meta.env.DEV || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  // No redirects needed - all content is now freely accessible
  useEffect(() => {
    // Content is always accessible now
  }, []);
  
  return { hasAccess, isUnlocked, isDevelopment };
};
