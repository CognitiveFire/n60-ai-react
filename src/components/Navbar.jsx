
import React, { useState } from 'react';
// CSS moved to App.css

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand">
          <img src="/images/logo.png" alt="N60 Logo" className="navbar-logo" />
        </a>
        
        <nav className="navbar-nav">
          <a href="#solutions">Løsninger</a>
          <a href="#innovation">Innovasjon</a>
          <a href="#how-we-work">Hvordan vi jobber</a>
          <a href="#why-ai">Hvorfor AI</a>
          <a href="#contact">Kontakt</a>
        </nav>
        
        <div className="navbar-actions">
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