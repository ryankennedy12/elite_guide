
import React from 'react';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = React.memo(() => {
  return (
    <section className={styles.heroSection}>
      {/* Floating Particles */}
      <div className={styles.floatingParticles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <span className={styles.alertIcon}>🚨</span>
          EXCLUSIVE ACCESS: Limited-Time Resource – FREE for Columbus Homeowners!
        </div>
        
        <div className={styles.heroTitle}>
          <div className={styles.glowLine}></div>
          <h1>
            <span className={styles.gradientText}>Protect Your Home: Unlock the </span>
            <span className={styles.goldenGradient}>12 Questions</span>
            <br />
            <span className={styles.gradientText}>Columbus Insiders Use to Vet </span>
            <span className={styles.goldenGradient}>Waterproofing Pros</span>
          </h1>
        </div>

        <div className={styles.heroSubtitle}>
          <p>
            Discover the <em className={styles.goldenGradient}>proven</em> 12-question script Columbus waterproofing experts use to 
            <span className={styles.goldenGradient}> expose hidden flaws</span> and secure reliable contractors.
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
