
// HowWeWork.jsx
import React from 'react';
import './HowWeWork.css';

const steps = [
  { title: 'Oppdagelse', description: 'Vi forstår dine behov og utfordringer.' },
  { title: 'Funksjonsvalg', description: 'Vi velger de riktige AI-verktøyene sammen.' },
  { title: 'Implementering', description: 'Vi bygger og ruller ut løsningen.' },
  { title: 'Lansering', description: 'Vi tester og går live med støtte.' }
];

const HowWeWork = () => {
  return (
    <section id="how-we-work" className="howwework-section">
      <h2 className="section-title">Slik Jobber Vi</h2>
      <div className="howwework-grid">
        {steps.map((step, index) => (
          <div className="howwework-step" key={index}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;