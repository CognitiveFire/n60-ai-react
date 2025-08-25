
// Solutions.jsx
import React from 'react';

const solutions = [
  { 
    title: 'Salg', 
    description: 'Automatiser lead-generering og kundereiser.',
    icon: '📊'
  },
  { 
    title: 'Markedsføring', 
    description: 'Generer og publiser innhold med AI.',
    icon: '🚀'
  },
  { 
    title: 'Kundeservice', 
    description: 'Svar raskt og konsistent med AI-agenter.',
    icon: '💬'
  },
  { 
    title: 'HR', 
    description: 'Strømlinjeform rekruttering og onboarding.',
    icon: '👥'
  }
];

const Solutions = () => {
  return (
    <section id="solutions" className="solutions-section">
      <h2 className="section-title">Våre Løsninger</h2>
      <div className="solutions-grid">
        {solutions.map((solution, index) => (
          <div className="solution-card" key={index}>
            <div className="solution-icon-container">
              <span className="solution-icon">{solution.icon}</span>
            </div>
            <div className="solution-content">
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;