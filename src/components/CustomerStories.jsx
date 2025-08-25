
// CustomerStories.jsx
import React from 'react';
import './CustomerStories.css';

const stories = [
  {
    title: 'Trondheim – Fisketeknologi',
    description: 'Et selskap som spesialiserer seg på bærekraftig fisketeknologi automatiserte rapportering og sporing av fangstdata.'
  },
  {
    title: 'Oslo – Medieproduksjon',
    description: 'Et kreativt byrå bruker AI til å generere storyboard-idéer og automatisere teksting av video.'
  },
  {
    title: 'Bergen – FinTech',
    description: 'En ny aktør i finanssektoren bruker AI til å analysere transaksjoner og føre tilsyn med etterlevelse.'
  },
  {
    title: 'Globalt – Broadcast',
    description: 'Et teknologiselskap forbedrer kundeopplevelse globalt med flerspråklige AI-agenter og automatisert supportsystem.'
  }
];

const CustomerStories = () => {
  return (
    <section id="stories" className="stories-section">
      <h2 className="section-title">Kundehistorier</h2>
      <div className="stories-grid">
        {stories.map((story, index) => (
          <div className="story-card" key={index}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerStories;