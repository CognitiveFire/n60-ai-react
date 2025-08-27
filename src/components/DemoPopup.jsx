

import React, { useState } from 'react';
// CSS moved to App.css

const DemoPopup = ({ apps, initialIndex, onClose }) => {
  const [idx, setIdx] = useState(initialIndex);

  const prev = () => setIdx((idx - 1 + apps.length) % apps.length);
  const next = () => setIdx((idx + 1) % apps.length);

  const app = apps[idx];

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>

        <div className="popup-tabs">
          {apps.map((a, i) => (
            <button
              key={a.id}
              className={`popup-tab ${i === idx ? 'active' : ''}`}
              onClick={() => setIdx(i)}
            >
              App {a.id}
            </button>
          ))}
        </div>

        <button className="nav-arrow left" onClick={prev}>‹</button>
        <button className="nav-arrow right" onClick={next}>›</button>

        <h2 className="popup-title">{app.title}</h2>

        <div className="popup-content-wrapper">
          <div className="chat-interface">
            <div className="chat-header">
              <img src="/images/salesbot.png" alt="Sales Bot" className="bot-avatar" />
              <div className="chat-info">
                <h3>N60 Sales Assistant</h3>
                <span className="status">Online • Ready to help</span>
              </div>
            </div>
            <div className="chat-messages">
              <div className="message bot-message">
                <img src="/images/salesbot.png" alt="Bot" className="message-avatar" />
                <div className="message-content">
                  <p>Hei! Jeg er N60's AI-selger. Kan jeg hjelpe deg med å finne den perfekte AI-løsningen for din bedrift?</p>
                </div>
              </div>
              <div className="message user-message">
                <div className="message-content">
                  <p>Ja, vi trenger hjelp med lead-generering og salg.</p>
                </div>
              </div>
              <div className="message bot-message">
                <img src="/images/salesbot.png" alt="Bot" className="message-avatar" />
                <div className="message-content">
                  <p>Perfekt! La meg vise deg hvordan våre AI-verktøy kan øke salget ditt med opptil 300%.</p>
                </div>
              </div>
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Skriv din melding..." />
              <button className="send-button">Send</button>
            </div>
          </div>

          <div className="popup-text">
            {/* Replace with dynamic content as needed */}
            <p className="popup-intro">
              Her kommer en kort introduksjon som forklarer hvorfor appen løser et kritisk problem for norske SMB‑er.
            </p>

            <div className="popup-section">
              <h3>Løsning</h3>
              <p>Beskriv løsningen i 2–3 setninger med klar, handlingsdrevet tekst.</p>
            </div>

            <div className="popup-section">
              <h3>Fordeler</h3>
              <ul>
                <li>Fordel 1</li>
                <li>Fordel 2</li>
                <li>Fordel 3</li>
              </ul>
            </div>

            <div className="popup-section">
              <h3>Målbare resultater (KPIer)</h3>
              <ul>
                <li>KPI 1</li>
                <li>KPI 2</li>
                <li>KPI 3</li>
              </ul>
            </div>

            <button className="popup-cta">Se hvordan det fungerer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPopup;
