
// Hero.jsx
import React from 'react';
// CSS moved to App.css

const Hero = ({ onOpenDemo, backgroundImage }) => {
  return (
    <section id="hero" className="hero-section">
      {backgroundImage && (
        <div className="hero-background">
          <img src={backgroundImage} alt="Hero Background" />
        </div>
      )}
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-headline">Kraftig AI for Norske SMB</h1>
          <p className="hero-subheadline">
            N60.ai leverer banebrytende AI-verktøy skreddersydd for din bedrift. Ingen forvirrende valg – bare de riktige funksjonene for raske resultater.
          </p>
          <button onClick={onOpenDemo} className="hero-cta">Se demoen</button>
        </div>
        <div className="hero-right">
          <div className="hero-placeholder">
            <div className="placeholder-content">
              <h3>AI Innovation Dashboard</h3>
              <p>Interactive AI-powered business intelligence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
