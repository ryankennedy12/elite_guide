
import React from 'react';
import styles from './FormContainer.module.css';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className={styles.privacyNotice}>
      <p>
        Your information is 100% secure. We will never share your email.{' '}
        <a href="#" className={styles.link}>
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
