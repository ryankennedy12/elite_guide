
// Type declaration for canvas-confetti library
declare global {
  interface Window {
    confetti?: (options?: {
      particleCount?: number;
      spread?: number;
      origin?: { x?: number; y?: number };
      colors?: string[];
    }) => void;
  }
}

export {};
