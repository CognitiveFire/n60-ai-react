
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ language, setLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand">
          <img src="/images/logo.png" alt="N60 Logo" />
          <h1>N60</h1>
        </a>
        
        <nav className="navbar-nav">
          <a href="#solutions">{language === 'no' ? 'Løsninger' : 'Solutions'}</a>
          <a href="#innovation">{language === 'no' ? 'Innovasjon' : 'Innovation'}</a>
          <a href="#how-we-work">{language === 'no' ? 'Hvordan vi jobber' : 'How We Work'}</a>
          <a href="#why-ai">{language === 'no' ? 'Hvorfor AI' : 'Why AI'}</a>
          <a href="#why-n60">{language === 'no' ? 'Hvorfor N60' : 'Why N60'}</a>
          <a href="#contact">{language === 'no' ? 'Kontakt' : 'Contact'}</a>
        </nav>
        
        <div className="navbar-actions">
          <button 
            className="language-toggle"
            onClick={() => setLanguage(language === 'no' ? 'en' : 'no')}
          >
            {language === 'no' ? 'EN' : 'NO'}
          </button>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;