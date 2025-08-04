import { useState, useEffect } from 'react';

interface CSRFToken {
  token: string;
  timestamp: number;
}

const CSRF_TOKEN_KEY = 'csrf_token';
const TOKEN_EXPIRY = 30 * 60 * 1000; // 30 minutes

export function useCSRFProtection() {
  const [csrfToken, setCSrfToken] = useState<string | null>(null);

  useEffect(() => {
    generateCSRFToken();
  }, []);

  const generateCSRFToken = () => {
    // Generate a cryptographically secure random token
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    
    const csrfData: CSRFToken = {
      token,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem(CSRF_TOKEN_KEY, JSON.stringify(csrfData));
    setCSrfToken(token);
  };

  const validateCSRFToken = (submittedToken: string): boolean => {
    try {
      const storedData = sessionStorage.getItem(CSRF_TOKEN_KEY);
      if (!storedData) return false;

      const csrfData: CSRFToken = JSON.parse(storedData);
      
      // Check if token has expired
      if (Date.now() - csrfData.timestamp > TOKEN_EXPIRY) {
        sessionStorage.removeItem(CSRF_TOKEN_KEY);
        return false;
      }

      return csrfData.token === submittedToken;
    } catch {
      return false;
    }
  };

  const getCSRFHeaders = () => {
    return csrfToken ? { 'X-CSRF-Token': csrfToken } : {};
  };

  return {
    csrfToken,
    generateCSRFToken,
    validateCSRFToken,
    getCSRFHeaders
  };
}