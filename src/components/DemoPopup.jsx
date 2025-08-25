

import React, { useState } from 'react';
import './DemoPopup.css';

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
          <div className="phone-frame popup-video">
            <video controls playsInline src={app.video} poster={app.poster} />
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
