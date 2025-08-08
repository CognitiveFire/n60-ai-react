
import React from 'react';
import './DemoShowcase.css';

const DemoShowcase = () => {
  return (
    <section className="demo-show">
      <h2 className="demo-heading">Hvem er N60?</h2>

      <div className="about-content">
        <div className="about-text">
          <p className="about-paragraph">
            N60 er et norsk teknologiselskap med base i Bergen som har ett klart mål: å gjøre kraftig og verdifull kunstig intelligens tilgjengelig og overkommelig for små og mellomstore bedrifter i Norge. Vi utvikler og implementerer både skreddersydde og ferdigbygde AI-løsninger som hjelper bedrifter med å øke inntektene, jobbe mer effektivt og skalere raskere – uten å måtte investere i egne teknologiteam.
          </p>
          
          <p className="about-paragraph">
            Hos N60 tror vi på at du som kunde skal eie dine egne løsninger. Derfor leverer vi full kontroll og lokal hosting i Norge, helt i tråd med gjeldende GDPR-regelverk. Enten du ønsker å automatisere prosesser, forbedre beslutningsgrunnlag eller skape smartere kundeopplevelser, står vi klare til å hjelpe deg med en løsning som passer dine mål og ditt budsjett.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;
