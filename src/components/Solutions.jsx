
// Solutions.jsx
import React from 'react';

const solutions = [
  { title: 'Salg', description: 'Automatiser lead-generering og kundereiser.' },
  { title: 'Markedsføring', description: 'Generer og publiser innhold med AI.' },
  { title: 'Kundeservice', description: 'Svar raskt og konsistent med AI-agenter.' },
  { title: 'HR', description: 'Strømlinjeform rekruttering og onboarding.' }
];

const Solutions = () => {
  return (
    <section id="solutions" className="solutions-section">
      <h2 className="section-title">Våre Løsninger</h2>
      <div className="solutions-grid">
        {solutions.map((solution, index) => (
          <div className="solution-card" key={index}>
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;