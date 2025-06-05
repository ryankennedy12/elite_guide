
import React from 'react';
import { FormHeader } from './FormHeader';
import { ProgressIndicator } from './ProgressIndicator';
import { FormStep } from './FormStep';
import { SecurityBadges } from './SecurityBadges';
import { PrivacyNotice } from './PrivacyNotice';
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
  return (
    <div className={styles.formContainer}>
      <FormHeader />
      
      <ProgressIndicator currentStep={currentStep} totalSteps={3} />

      <form className={styles.form}>
        <FormStep
          stepNumber={1}
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
          validationState={validationState}
          setValidationState={setValidationState}
          onSubmit={onSubmit}
        />
        
        <FormStep
          stepNumber={2}
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
          validationState={validationState}
          setValidationState={setValidationState}
          onSubmit={onSubmit}
        />
        
        <FormStep
          stepNumber={3}
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
          validationState={validationState}
          setValidationState={setValidationState}
          onSubmit={onSubmit}
        />
      </form>

      <SecurityBadges />
      <PrivacyNotice />
    </div>
  );
};
