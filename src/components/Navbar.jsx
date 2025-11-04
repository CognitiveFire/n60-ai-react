import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to navigate to section (handles both home page and other pages)
  const navigateToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/' && location.pathname !== '') {
      navigate(`/#${sectionId}`);
    } else {
      // If we're on the home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="navbar-brand">
          <img 
            src="https://i.ibb.co/DPb4dK2Y/1.png" 
            alt="n60 Logo" 
            className="navbar-logo"
          />
        </a>
        
        <nav className="navbar-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('compass'); }}>Compass</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('blueprint'); }}>Blueprint</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('growth'); }}>Growth</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('capability'); }}>Capability</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/training'); }}>Training</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
        </nav>
        
        <div className="navbar-cta">
          <button className="cta-button" onClick={() => {
            const hero = document.getElementById('hero');
            if (hero) {
              const calendlyButton = hero.querySelector('.hero-cta');
              if (calendlyButton) calendlyButton.click();
            }
          }}>Book a Discovery Call</button>
        </div>
        
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
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}>Services</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('packages'); setMenuOpen(false); }}>Packages</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('framework'); setMenuOpen(false); }}>Framework</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('deliverables'); setMenuOpen(false); }}>Deliverables</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('why-n60'); setMenuOpen(false); }}>Clients</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('insights'); setMenuOpen(false); }}>Insights</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); setMenuOpen(false); }}>Contact</a>
            <button className="cta-button" onClick={() => {
              const hero = document.getElementById('hero');
              if (hero) {
                const calendlyButton = hero.querySelector('.hero-cta');
                if (calendlyButton) calendlyButton.click();
              }
              setMenuOpen(false);
            }}>Book a Discovery Call</button>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
