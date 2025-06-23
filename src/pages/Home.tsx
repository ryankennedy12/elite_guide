
import React from 'react';
import { HeroSection } from '@/components/OptinForm/HeroSection';
import { BenefitsList } from '@/components/OptinForm/BenefitsList';
import styles from '@/components/OptinForm/OptinForm.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Floating Particles */}
      <div className={styles.floatingParticles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      <div className={styles.heroSection}>
        <HeroSection />
      </div>
      
      <div className={styles.mainContent} style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
        <BenefitsList />
      </div>
    </div>
  );
};

export default Home;
