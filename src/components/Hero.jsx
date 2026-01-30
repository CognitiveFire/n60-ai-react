// Hero.jsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Hero = ({ onOpenDemo, backgroundImage, videoUrl }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showCalendlyLightbox, setShowCalendlyLightbox] = useState(false);

  const handleOpenCalendly = () => {
    setShowCalendlyLightbox(true);
  };

  const handleCloseCalendly = () => {
    setShowCalendlyLightbox(false);
  };

  // Handle "Explore the Compass" button - scroll to framework section
  const handleExploreCompass = () => {
    const frameworkSection = document.getElementById('framework');
    if (frameworkSection) {
      frameworkSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-compass-animation"></div>
      <div className="hero-container">
        <h1 className="hero-headline hero-headline-desktop">
          {t.hero.headline}
        </h1>
        <h1 className="hero-headline hero-headline-mobile">
          {t.hero.headlineMobile}
        </h1>
      </div>
      
      {/* Calendly Lightbox */}
      {showCalendlyLightbox && (
        <div className="hero-calendly-lightbox">
          <div className="lightbox-overlay" onClick={handleCloseCalendly}></div>
          <div className="lightbox-content">
            <div className="lightbox-header">
              <button 
                className="lightbox-close"
                onClick={handleCloseCalendly}
              >
                ×
              </button>
            </div>
            <div className="calendly-message">
              <p>{t.hero.calendlyMessage}</p>
            </div>
            <div className="calendly-embed">
              <iframe
                src="https://calendly.com/n60/new-meeting"
                width="100%"
                height="600"
                frameBorder="0"
                title="Book N60 Consultation"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
