
declare global {
  function gtag(command: 'event', eventName: string, parameters?: Record<string, any>): void;
  function gtag(command: 'config', targetId: string, config?: Record<string, any>): void;
  function gtag(command: string, ...args: any[]): void;
}

export {};
