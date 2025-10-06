
// Hero.jsx
import React, { useState } from 'react';
// CSS moved to App.css

const Hero = ({ onOpenDemo, backgroundImage, videoUrl }) => {
  const [showCalendlyLightbox, setShowCalendlyLightbox] = useState(false);

  const handleOpenCalendly = () => {
    setShowCalendlyLightbox(true);
  };

  const handleCloseCalendly = () => {
    setShowCalendlyLightbox(false);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-headline" style={{ lineHeight: '1', marginBottom: '2.5rem' }}>AI-innovasjon for norske bedrifter</h1>
          <p className="hero-subheadline">
            Automatiser B2B-produktmarkedsføring med kraftig AI-teknologi. Skap mer etterspørsel, generer flere leads og voks raskere – tilpasset norske små og mellomstore bedrifter.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '3rem', marginBottom: '3rem' }}>
            <button 
              onClick={handleOpenCalendly}
              className="hero-cta"
              style={{
                backgroundColor: 'transparent',
                color: '#000000',
                border: '2px solid #000000',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Se hvordan det fungerer
            </button>
            
            {/* Question Button */}
            <button 
              className="hero-question-btn"
              onClick={() => {
                const contactElement = document.getElementById('contact');
                console.log('Contact element:', contactElement);
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  console.log('Contact element not found');
                }
              }}
            >
              Hva koster det?
            </button>
          </div>
        </div>
        
        <div className="hero-right">
          <img src="https://i.ibb.co/tp3xm3MP/Chat-GPT-Image-Oct-6-2025-04-55-30-PM.png" alt="Norwegian Flag" className="hero-flag-image" />
        </div>
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
              <p>La oss ta en prat om dine behov og hvilke løsninger som passer best for din bedrift. Vi hjelper deg med å finne den riktige strategien for å vokse.</p>
            </div>
            <div className="calendly-embed">
              <iframe
                src="https://calendly.com/n60/new-meeting"
                width="100%"
                height="600"
                frameBorder="0"
                title="Book N60 Demo"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
