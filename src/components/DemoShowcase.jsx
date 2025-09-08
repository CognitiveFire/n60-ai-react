
import React from 'react';

const DemoShowcase = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-header">
        <h2>Hvem er N60?</h2>
        <p className="about-intro">
          N60 er et AI-byrå fra Bergen som hjelper norske små og mellomstore bedrifter med å automatisere produktmarkedsføring og vokse raskere med kunstig intelligens.
        </p>
      </div>
      
      <div className="about-content">
        <div className="about-features">
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>AI-løsninger tilpasset norske bedrifter</h4>
              <p>Automatiser produktmarkedsføring, øk inntektene og voks raskere</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Overkommelig for norske bedrifter</h4>
              <p>Ingen behov for eget AI-team eller teknologikunnskap</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Norsk eierskap og GDPR-sikkerhet</h4>
              <p>Alle data lagres i Norge med full personvernsikkerhet</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Vårt mål:</h4>
              <p>Hjelpe norske bedrifter med å automatisere produktmarkedsføring og vokse raskere – med AI-løsninger som passer din bedrift og ditt budsjett.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;
