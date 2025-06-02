
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useContentAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user has unlocked content
  const isUnlocked = localStorage.getItem('elite12_unlocked') === 'true';
  
  // Check if we're in development mode
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Allow access if unlocked OR in development mode
  const hasAccess = isUnlocked || isDevelopment;
  
  useEffect(() => {
    // Only redirect if we don't have access and we're not already on the home page
    if (!hasAccess && location.pathname !== '/') {
      navigate('/');
    }
  }, [hasAccess, location.pathname, navigate]);
  
  return { hasAccess, isUnlocked, isDevelopment };
};
