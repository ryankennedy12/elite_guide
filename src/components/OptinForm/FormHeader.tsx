
import React from 'react';
import styles from './FormContainer.module.css';

export const FormHeader: React.FC = () => {
  return (
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
  );
};
