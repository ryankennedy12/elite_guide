
import React from 'react';
import { Check } from 'lucide-react';
import styles from './BenefitsList.module.css';

const benefits = [
  {
    title: 'Expose Hidden Contractor Red Flags',
    description: 'Instantly identify unreliable contractors before you hire them, saving you countless headaches and wasted money.'
  },
  {
    title: 'Slash Unexpected Costs & Delays', 
    description: 'Prevent surprise charges, unfinished work, and costly code violations by asking the right questions upfront.'
  },
  {
    title: 'Comprehensive for Any Basement',
    description: 'Whether your basement is finished or unfinished, these questions are universally applicable to secure expert waterproofing.'
  },
  {
    title: 'Gain Absolute Peace of Mind',
    description: 'Confidently select a reliable contractor knowing you\'ve asked every crucial question to ensure a successful, lasting job.'
  }
];

export const BenefitsList: React.FC = React.memo(() => {
  return (
    <div className={styles.benefitsContainer}>
      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.benefitCard}>
            <div className={styles.benefitContent}>
              <div className={styles.checkIcon}>
                <Check className={styles.checkIconSvg} strokeWidth={3} />
              </div>
              <div className={styles.benefitText}>
                <div className={styles.benefitTitle}>{benefit.title}:</div>
                <span className={styles.benefitDescription}>{benefit.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.whyMattersCard}>
        <h3 className={styles.whyMattersTitle}>Why This Matters For Your Home</h3>
        <p className={styles.whyMattersText}>
          Hiring a basement waterproofing contractor can feel overwhelming. Without the right questions, you risk overpaying, shoddy workmanship, and even costly repairs down the line. Our exclusive script levels the playing field, empowering you with the exact insights professionals use to ensure your home's long-term protection.
        </p>
      </div>
    </div>
  );
});

BenefitsList.displayName = 'BenefitsList';
