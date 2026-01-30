import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ onLoginClick }) => {
  const { language } = useLanguage();
  const t = translations[language];
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
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('about'); }}>{t.nav.about}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('framework'); }}>{t.nav.framework}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('services'); }}>{t.nav.services}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/training'); }}>{t.nav.training}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('insights'); }}>{t.nav.insights}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>{t.nav.contact}</a>
        </nav>
        
        <div className="navbar-cta">
          <LanguageSwitcher />
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
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('about'); setMenuOpen(false); }}>{t.nav.about}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('framework'); setMenuOpen(false); }}>{t.nav.framework}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('services'); setMenuOpen(false); }}>{t.nav.services}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/training'); setMenuOpen(false); }}>{t.nav.training}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('insights'); setMenuOpen(false); }}>{t.nav.insights}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); setMenuOpen(false); }}>{t.nav.contact}</a>
            <div className="mobile-menu-actions">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
