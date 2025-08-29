
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
                      <a href="#contact">Pris</a>
            <a href="#login">Login</a>
        </nav>
        
        <div className="navbar-actions">
          <button 
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <button 
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              ×
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <a href="#solutions" onClick={() => setMenuOpen(false)}>Løsninger</a>
            <a href="#innovation" onClick={() => setMenuOpen(false)}>Innovasjon</a>
            <a href="#how-we-work" onClick={() => setMenuOpen(false)}>Hvordan vi jobber</a>
            <a href="#why-ai" onClick={() => setMenuOpen(false)}>Hvorfor AI</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Pris</a>
            <a href="#login" onClick={() => setMenuOpen(false)}>Login</a>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;