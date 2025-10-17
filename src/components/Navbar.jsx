
import React, { useState } from 'react';
// CSS moved to App.css

const Navbar = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to scroll to section smoothly
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand">
          <img 
            src="https://i.ibb.co/DPb4dK2Y/1.png" 
            alt="n60 Logo" 
            className="navbar-logo"
          />
        </a>
        
        <nav className="navbar-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Løsninger</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); }}>Innovasjon</a>
          <a href="/training">Opplæring & Kurs</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-we-work'); }}>Hvordan vi jobber</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('why-ai'); }}>Hvorfor AI</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Pris</a>
          <button onClick={onLoginClick} className="login-nav-button">Login</button>
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
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); setMenuOpen(false); }}>Løsninger</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); setMenuOpen(false); }}>Innovasjon</a>
            <a href="/training" onClick={() => setMenuOpen(false)}>Opplæring & Kurs</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-we-work'); setMenuOpen(false); }}>Hvordan vi jobber</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('why-ai'); setMenuOpen(false); }}>Hvorfor AI</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setMenuOpen(false); }}>Pris</a>
            <button onClick={() => { onLoginClick(); setMenuOpen(false); }} className="login-nav-button">Login</button>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;