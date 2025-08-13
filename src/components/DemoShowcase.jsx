
import React from 'react';

const DemoShowcase = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-header">
        <h2>Hvem er N60?</h2>
        <p className="about-intro">
          N60 er et AI-byrå basert i Bergen som gjør kraftig kunstig intelligens tilgjengelig for norske SMB-er.
        </p>
      </div>
      
      <div className="about-content">
        <div className="about-features">
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Skreddersydde og ferdigbygde AI-løsninger</h4>
              <p>Øk inntektene, jobb smartere og skalér raskt</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Overkommelig pris og høy verdi</h4>
              <p>Ingen behov for eget teknologiteam</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Full eierskap og lokal hosting i Norge</h4>
              <p>GDPR-kompatibelt og fremtidsrettet</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">✦</div>
            <div className="feature-content">
              <h4>Målet vårt:</h4>
              <p>Å gi deg kontroll, effektivitet og vekst – med løsninger som passer dine behov og ditt budsjett.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;
