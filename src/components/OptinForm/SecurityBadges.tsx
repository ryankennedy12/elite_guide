
import React from 'react';
import { Shield } from 'lucide-react';
import styles from './FormContainer.module.css';

export const SecurityBadges: React.FC = () => {
  return (
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
  );
};
