import React, { useState } from 'react';
import './Salesbot.css';
import SimpleContactForm from './SimpleContactForm';

const Salesbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleAskQuestion = () => {
    // Show contact form in salesbot
    setIsOpen(false);
    setIsExpanded(false);
    setShowContactForm(true);
  };

  const handleBookDemo = () => {
    // Show Calendly inside the chatbot
    setShowContactForm(false);
    setShowCalendly(true);
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleContact = () => {
    // Show contact form in salesbot
    setIsOpen(false);
    setIsExpanded(false);
    setShowContactForm(true);
  };

  return (
    <div className="salesbot-container">
      {/* Chat Bubble */}
      <div 
        className={`chat-bubble ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="chat-bubble-content">
          <span className="chat-text">Hva koster det?</span>
          <div className="avatar">
            <img 
              src="https://i.ibb.co/yn9WGQBT/salesbot.png" 
              alt="N60 Salesbot" 
            />
          </div>
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
              onClick={() => setShowCalendly(false)}
            >
              ← Tilbake
            </button>
            <h3>Book en demo</h3>
            <button 
              className="close-button"
              onClick={() => setShowCalendly(false)}
            >
              ×
            </button>
          </div>
          <div className="calendly-embed">
            <iframe
              src="https://calendly.com/n60/new-meeting"
              width="100%"
              height="600"
              frameBorder="0"
              title="Book N60 Demo"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Salesbot;
