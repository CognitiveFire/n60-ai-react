
// Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = ({ onOpenDemo }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        <h1 className="hero-headline">Kraftig AI for Norske SMB</h1>
        <p className="hero-subheadline">
          N60.ai leverer banebrytende AI-verktøy skreddersydd for din bedrift. Ingen forvirrende valg – bare de riktige funksjonene for raske resultater.
        </p>
        <button onClick={onOpenDemo}>Se demoen</button>
      </div>
    </section>
  );
};

export default Hero;
