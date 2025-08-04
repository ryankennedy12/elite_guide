import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitState {
  attempts: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const defaultConfigs: { [key: string]: RateLimitConfig } = {
  auth: { maxAttempts: 5, windowMs: 15 * 60 * 1000, blockDurationMs: 15 * 60 * 1000 }, // 5 attempts per 15 min
  api: { maxAttempts: 100, windowMs: 60 * 1000 }, // 100 requests per minute
  search: { maxAttempts: 20, windowMs: 60 * 1000 }, // 20 searches per minute
};

export function useRateLimiting() {
  const [rateLimitStates, setRateLimitStates] = useState<{ [key: string]: RateLimitState }>({});

  const isRateLimited = useCallback((action: string, config?: RateLimitConfig): boolean => {
    const limitConfig = config || defaultConfigs[action] || defaultConfigs.api;
    const state = rateLimitStates[action];
    const now = Date.now();

    if (!state) return false;

    // Check if still blocked
    if (state.blockedUntil && now < state.blockedUntil) {
      return true;
    }

    // Check if window has expired
    if (now - state.firstAttempt > limitConfig.windowMs) {
      return false;
    }

    // Check if exceeded max attempts
    return state.attempts >= limitConfig.maxAttempts;
  }, [rateLimitStates]);

  const recordAttempt = useCallback((action: string, config?: RateLimitConfig) => {
    const limitConfig = config || defaultConfigs[action] || defaultConfigs.api;
    const now = Date.now();

    setRateLimitStates(prev => {
      const currentState = prev[action];
      
      // If no previous state or window expired, start new window
      if (!currentState || now - currentState.firstAttempt > limitConfig.windowMs) {
        return {
          ...prev,
          [action]: {
            attempts: 1,
            firstAttempt: now
          }
        };
      }

      const newAttempts = currentState.attempts + 1;
      const newState: RateLimitState = {
        ...currentState,
        attempts: newAttempts
      };

      // If exceeded max attempts and has block duration, set block time
      if (newAttempts >= limitConfig.maxAttempts && limitConfig.blockDurationMs) {
        newState.blockedUntil = now + limitConfig.blockDurationMs;
      }

      return {
        ...prev,
        [action]: newState
      };
    });
  }, []);

  const getRemainingTime = useCallback((action: string): number => {
    const state = rateLimitStates[action];
    if (!state?.blockedUntil) return 0;
    
    return Math.max(0, state.blockedUntil - Date.now());
  }, [rateLimitStates]);

  const resetLimit = useCallback((action: string) => {
    setRateLimitStates(prev => {
      const { [action]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  return {
    isRateLimited,
    recordAttempt,
    getRemainingTime,
    resetLimit
  };
}