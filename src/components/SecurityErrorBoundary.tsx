import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SecurityErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log security-related errors without exposing sensitive information
    console.error('Security boundary caught an error:', {
      message: error.message,
      name: error.name,
      // Don't log the full stack trace to avoid information disclosure
      stack: process.env.NODE_ENV === 'development' ? error.stack : 'Hidden in production'
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <Alert className="max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Security Error</AlertTitle>
            <AlertDescription>
              A security error occurred. Please refresh the page and try again. 
              If the problem persists, please contact support.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}