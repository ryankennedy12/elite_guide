
import React, { useRef, useEffect } from 'react';
import { Lock, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import styles from './FormContainer.module.css';

interface FormData {
  email: string;
  firstName: string;
  termsAccepted: boolean;
}

interface ValidationState {
  emailValid: boolean;
  nameValid: boolean;
  isSubmitting: boolean;
}

interface FormContainerProps {
  currentStep: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  validationState: ValidationState;
  setValidationState: React.Dispatch<React.SetStateAction<ValidationState>>;
  onSubmit: () => void;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  currentStep,
  formData,
  setFormData,
  validationState,
  setValidationState,
  onSubmit
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData(prev => ({ ...prev, email }));
    
    const isValid = validateEmail(email);
    setValidationState(prev => ({ ...prev, emailValid: isValid }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value.trim();
    setFormData(prev => ({ ...prev, firstName }));
    
    const isValid = firstName.length >= 2;
    setValidationState(prev => ({ ...prev, nameValid: isValid }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Auto-focus on step change
  useEffect(() => {
    if (currentStep === 1 && emailRef.current) {
      emailRef.current.focus();
    } else if (currentStep === 2 && nameRef.current) {
      nameRef.current.focus();
    }
  }, [currentStep]);

  const isFormValid = formData.email.trim() && formData.firstName.trim() && formData.termsAccepted && !validationState.isSubmitting;

  return (
    <div className={styles.formContainer}>
      {/* Form Header */}
      <div className={styles.formHeader}>
        <div className={styles.lockIcon}>
          🔓
        </div>
        <h3 className={styles.formTitle}>
          Get Instant Access
        </h3>
        <p className={styles.formSubtitle}>
          Download the complete 12-question contractor vetting script
        </p>
      </div>

      {/* Progress Dots */}
      <div className={styles.progressDots}>
        {Array.from({ length: 3 }, (_, index) => {
          const stepNumber = index + 1;
          let dotClass = styles.progressDot;
          
          if (stepNumber < currentStep) {
            dotClass += ` ${styles.completed}`;
          } else if (stepNumber === currentStep) {
            dotClass += ` ${styles.active}`;
          }
          
          return (
            <div 
              key={stepNumber}
              className={dotClass}
              aria-label={`Step ${stepNumber} ${stepNumber < currentStep ? 'completed' : stepNumber === currentStep ? 'active' : 'pending'}`}
            />
          );
        })}
      </div>

      {/* Progressive Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Step 1: Email Only */}
        <div className={`${styles.formStep} ${currentStep >= 1 ? styles.active : ''}`}>
          <Label htmlFor="email" className={styles.label}>
            Email Address
          </Label>
          <div className={styles.inputWrapper}>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              inputMode="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
              disabled={validationState.isSubmitting}
              className={`${styles.modernInput} ${validationState.emailValid ? styles.validInput : ''}`}
              placeholder="Enter your email address"
            />
            {validationState.emailValid && (
              <div className={styles.inputIcon}>
                <CheckCircle className={styles.successIcon} />
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Name Only */}
        {currentStep >= 2 && (
          <div className={`${styles.formStep} ${styles.active}`}>
            <Label htmlFor="firstName" className={styles.label}>
              First Name
            </Label>
            <div className={styles.inputWrapper}>
              <Input
                ref={nameRef}
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleNameChange}
                required
                disabled={validationState.isSubmitting}
                className={`${styles.modernInput} ${validationState.nameValid ? styles.validInput : ''}`}
                placeholder="Enter your first name"
              />
              {validationState.nameValid && (
                <div className={styles.inputIcon}>
                  <CheckCircle className={styles.successIcon} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Terms & Submit Only */}
        {currentStep >= 3 && (
          <div className={`${styles.formStep} ${styles.active}`}>
            <div className={styles.checkboxGroup}>
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  termsAccepted: checked as boolean 
                }))}
                disabled={validationState.isSubmitting}
              />
              <Label 
                htmlFor="terms" 
                className={styles.checkboxLabel}
              >
                I accept the{' '}
                <a href="#" className={styles.link}>
                  terms and conditions
                </a>
                {' '}and{' '}
                <a href="#" className={styles.link}>
                  privacy policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className={styles.submitBtn}
            >
              {validationState.isSubmitting ? (
                <div className={styles.loadingContent}>
                  <div className={styles.spinner}></div>
                  PROCESSING...
                </div>
              ) : (
                'GET MY FREE 12-QUESTION SCRIPT NOW!'
              )}
            </Button>
          </div>
        )}
      </form>

      {/* Security Badges */}
      <div className={styles.securityBadges}>
        <div className={styles.securityBadge}>
          <Shield className={styles.badgeIcon} />
          <span className={styles.badgeText}>SSL Secure</span>
        </div>
        <div className={styles.securityBadge}>
          <span className={styles.badgeEmoji}>🚫</span>
          <span className={styles.badgeText}>No Spam</span>
        </div>
        <div className={styles.securityBadge}>
          <span className={styles.badgeEmoji}>🛡️</span>
          <span className={styles.badgeText}>GDPR Safe</span>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className={styles.privacyNotice}>
        <p>
          Your information is 100% secure. We will never share your email.{' '}
          <a href="#" className={styles.link}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};
