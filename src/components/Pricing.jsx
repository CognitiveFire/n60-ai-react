
// Pricing.jsx
import React from 'react';
import './Pricing.css';

const pricingTiers = [
  {
    name: 'Start',
    setup: '4 900 kr etablering',
    monthly: '990 kr/mnd',
    features: ['1 AI-løsning', 'Standard support', 'Ingen binding']
  },
  {
    name: 'Pro',
    setup: '9 900 kr etablering',
    monthly: '1 990 kr/mnd',
    features: ['3 AI-løsninger', 'Prioritert support', 'Skreddersydd onboarding']
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section">
      <h2 className="section-title">Pris</h2>
      <div className="pricing-grid">
        {pricingTiers.map((tier, index) => (
          <div className="pricing-card" key={index}>
            <h3>{tier.name}</h3>
            <p className="setup-cost">{tier.setup}</p>
            <p className="monthly-cost">{tier.monthly}</p>
            <ul>
              {tier.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;