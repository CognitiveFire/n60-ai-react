import React, { useState } from 'react';
import './Salesbot.css';
import SimpleContactForm from './SimpleContactForm';

const Salesbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyLoading, setCalendlyLoading] = useState(true);

  const handleAskQuestion = () => {
    setShowContactForm(true);
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleBookDemo = () => {
    setShowContactForm(false);
    setShowCalendly(true);
    setCalendlyLoading(true);
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleContact = () => {
    setShowContactForm(true);
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleCalendlyLoad = () => {
    setCalendlyLoading(false);
  };

  const handleCloseCalendly = () => {
    setShowCalendly(false);
    setCalendlyLoading(true);
  };

  return (
    <div className="salesbot-container">
      {/* Chat Bubble */}
      <div 
        className={`chat-bubble ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="avatar">
          <img 
            src="https://i.ibb.co/yn9WGQBT/salesbot.png" 
            alt="N60 Salesbot" 
          />
        </div>
        <div className="chat-text">
          {isExpanded ? 'Hva koster det?' : 'Hva koster det?'}
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="salesbot-popup">
          <div className="popup-header">
            <span className="popup-title">Hva koster det?</span>
            <div className="popup-avatar">
              <img 
                src="https://i.ibb.co/yn9WGQBT/salesbot.png" 
                alt="N60 Salesbot" 
              />
            </div>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="popup-actions">
            <button 
              className="action-button"
              onClick={handleAskQuestion}
            >
              Still et spørsmål
            </button>
            <button 
              className="action-button"
              onClick={handleBookDemo}
            >
              Book en demo
            </button>
            <button 
              className="action-button"
              onClick={handleContact}
            >
              Kontakt N60
            </button>
          </div>
          
          <div className="popup-footer">
            <span>n60</span>
          </div>
        </div>
      )}

      {/* Contact Form */}
      {showContactForm && (
        <div className="salesbot-contact-form">
          <div className="contact-form-header">
            <button 
              className="back-button"
              onClick={() => setShowContactForm(false)}
            >
              ← Tilbake
            </button>
            <h3>Kontakt oss</h3>
          </div>
          <SimpleContactForm />
        </div>
      )}
      
      {/* Calendly Integration */}
      {showCalendly && (
        <div className="salesbot-calendly">
          <div className="calendly-header">
            <button 
              className="back-button"
              onClick={handleCloseCalendly}
            >
              ← Tilbake
            </button>
            <h3>Book en demo</h3>
            <button 
              className="calendly-close-button"
              onClick={handleCloseCalendly}
              title="Lukk"
            >
              ×
            </button>
          </div>
          
          {/* Loading State */}
          {calendlyLoading && (
            <div className="calendly-loading">
              <div className="loading-spinner"></div>
              <p>Laster Calendly...</p>
            </div>
          )}
          
          <div className="calendly-embed" style={{ display: calendlyLoading ? 'none' : 'block' }}>
            <iframe
              src="https://calendly.com/n60/new-meeting"
              width="100%"
              height="600"
              frameBorder="0"
              title="Book N60 Demo"
              onLoad={handleCalendlyLoad}
            />
          </div>
          
          {/* Fallback Close Button - Always Visible */}
          <button 
            className="calendly-fallback-close"
            onClick={handleCloseCalendly}
            title="Lukk Calendly"
          >
            ✕ Lukk
          </button>
        </div>
      )}
    </div>
  );
};

export default Salesbot;
