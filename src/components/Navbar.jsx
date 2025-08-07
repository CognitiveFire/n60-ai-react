
import React, { useState } from 'react';
import './Navbar.css'; 
import logo from '/images/logo-light.png?v=2'; 

const navItems = [
  { id: 'solutions', label: 'Våre Løsninger' },
  { id: 'how-we-work', label: 'Slik jobber vi' },
  { id: 'pricing', label: 'Prisplaner' },
  { id: 'projects', label: 'Prosjekter' },
  { id: 'contact', label: 'Kontakt' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <a href="#hero">
            <img src={logo} alt="Logo" className="logo" />
          </a>
        </div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(({ id, label }) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;