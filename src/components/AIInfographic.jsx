import React, { useState, useEffect } from 'react';
import './AIInfographic.css';

const AIInfographic = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const facts = [
    {
      title: "AI ADOPSJON OG VEKST",
      content: "30% av norske foretak (10+ ansatte) bruker AI-teknologier i 2025",
      highlight: "+9% økning fra 2024",
      icon: "📈"
    },
    {
      title: "GENERATIV AI",
      content: "51% av norske virksomheter benytter generativ AI",
      highlight: "B2B Fokus: 24% av B2B-bedrifter bruker AI",
      icon: "🤖"
    },
    {
      title: "HØYEST ADOPSJON",
      content: "Informasjon/Kommunikasjon og Finans",
      highlight: "ca. 60−70% adopsjon",
      icon: "🏆"
    },
    {
      title: "ØKONOMISK POTENSIAL",
      content: "Verdiskaping: 5600 milliarder NOK",
      highlight: "Potensial frem til 2040",
      icon: "💰"
    },
    {
      title: "GENERATIV AI BIDRAG",
      content: "2000 milliarder NOK av totalen",
      highlight: "Statsinvestering: 1 milliard NOK til 6 nasjonale AI-forskningssentre",
      icon: "💎"
    },
    {
      title: "NASJONAL TREND",
      content: "70% av bedrifter ser KI som avgjørende",
      highlight: "for vekst og konkurranseevne",
      icon: "🎯"
    },
    {
      title: "HOVEDUTFORDERING",
      content: "Kompetansegap: 67% mangler kompetanse",
      highlight: "for full implementering",
      icon: "🔧"
    },
    {
      title: "OPPLÆRINGSBEHOV",
      content: "9 av 10 bedrifter ønsker opplæring",
      highlight: "for å tette kompetansegapet",
      icon: "📚"
    },
    {
      title: "KULTURELL ENDRING",
      content: "70% forventer endringer",
      highlight: "i oppgaver og prosesser",
      icon: "🔄"
    },
    {
      title: "JURIDISKE BEKYMRINGER",
      content: "40% nevner etiske/juridiske bekymringer",
      highlight: "om AI-implementering",
      icon: "⚖️"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 4000); // Change fact every 4 seconds

    return () => clearInterval(interval);
  }, [facts.length]);

  const currentFact = facts[currentFactIndex];

  return (
    <div className="ai-infographic-container">
      {/* Background Image */}
      <div className="infographic-background">
        <img 
          src="/infographic.png" 
          alt="AI Adoption Statistics Infographic" 
          className="background-image"
        />
      </div>
      
      {/* Animated Facts Overlay */}
      <div className={`facts-overlay ${isVisible ? 'visible' : ''}`}>
        <div className="fact-display">
          <div 
            key={currentFactIndex}
            className={`fact-card ${isVisible ? 'slide-in' : 'slide-out'}`}
          >
            <div className="fact-icon">{currentFact.icon}</div>
            <div className="fact-content">
              <h3 className="fact-title">{currentFact.title}</h3>
              <p className="fact-text">{currentFact.content}</p>
              <p className="fact-highlight">{currentFact.highlight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        {facts.map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${index === currentFactIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="infographic-footer">
        <p>Kilde: SSB, NHO, Digital Norway, Litium Nordic B2B Report 2025</p>
      </div>
    </div>
  );
};

export default AIInfographic;
