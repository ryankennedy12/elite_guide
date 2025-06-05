
import React, { useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
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

interface FormStepProps {
  stepNumber: number;
  currentStep: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  validationState: ValidationState;
  setValidationState: React.Dispatch<React.SetStateAction<ValidationState>>;
  onSubmit: () => void;
}

export const FormStep: React.FC<FormStepProps> = ({
  stepNumber,
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

  if (stepNumber === 1 && currentStep >= 1) {
    return (
      <div className={`${styles.formStep} ${styles.active}`}>
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
    );
  }

  if (stepNumber === 2 && currentStep >= 2) {
    return (
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
    );
  }

  if (stepNumber === 3 && currentStep >= 3) {
    return (
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
          onClick={handleSubmit}
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
    );
  }

  return null;
};
