
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
        <div className="hero-content">
          <h1 className="hero-headline">
            From Strategy to System We Make AI Responsible, Scalable, and Measurable.
          </h1>
          <p className="hero-subheadline">
            We combine strategy, architecture, governance, and capability so AI delivers real business value safely and measurably.
          </p>
          <div className="hero-buttons">
            <button 
              onClick={handleOpenCalendly}
              className="hero-cta"
            >
              Start Your AI Readiness Review
            </button>
            <button onClick={handleOpenCalendly} className="hero-cta hero-cta-secondary">
              Book a Discovery Call
            </button>
          </div>
          <p className="hero-trust-text">Independent. Vendor-neutral. Built for Nordic organisations.</p>
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
              <p>Let's discuss your AI readiness and how we can help protect your organisation's future.</p>
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
