
// ValueProposition.jsx
import React from 'react';
import './ValueProposition.css';

const points = [
  'Vi tilbyr skreddersydde AI-løsninger som er GDPR-kompatible, skalerbare og støttet av vårt dedikerte team.',
  'Ta kontroll over dataene dine og vokse med selvtillit.',
  'Bygget i Norge. Fullt GDPR-kompatibel. Laget for bedrifter som din.'
];

const ValueProposition = () => {
  return (
    <section id="value-proposition" className="value-section">
      <h2 className="section-title">Hvorfor Velge N60.ai?</h2>
      <ul className="value-points">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </section>
  );
};

export default ValueProposition;