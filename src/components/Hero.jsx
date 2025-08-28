
// Hero.jsx
import React from 'react';
// CSS moved to App.css

const Hero = ({ onOpenDemo, backgroundImage, videoUrl }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-headline">Kraftig AI-markedsføring for norske SMB</h1>
          <p className="hero-subheadline">
            N60.ai leverer målrettede AI-verktøy for markedsføring, skreddersydd for din bedrift. Ingen unødvendige funksjoner – bare løsninger som gir rask vekst og flere kunder.
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/n60/new-meeting', '_blank')} 
            className="hero-cta"
          >
            Se demoen
          </button>
        </div>
        <div className="hero-right">
          {videoUrl ? (
            <div className="hero-video">
              <iframe
                src={videoUrl}
                title="N60 AI Marketing Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-presentation"
                style={{
                  pointerEvents: 'none'
                }}
              ></iframe>
            </div>
          ) : backgroundImage ? (
            <div className="hero-image">
              <img src={backgroundImage} alt="AI Innovation Dashboard" />
            </div>
          ) : (
            <div className="hero-placeholder">
              <div className="placeholder-content">
                <h3>AI Innovation Dashboard</h3>
                <p>Interactive AI-powered business intelligence</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
