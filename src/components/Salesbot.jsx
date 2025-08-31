import React, { useState } from 'react';
import './Salesbot.css';
import SimpleContactForm from './SimpleContactForm';

const Salesbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAskQuestion = () => {
    // Show contact form in salesbot
    setIsOpen(false);
    setIsExpanded(false);
    setShowContactForm(true);
  };

  const handleBookDemo = () => {
    // Open Calendly inside the chatbot
    setShowContactForm(false);
    setIsOpen(false);
    setIsExpanded(false);
    // Open Calendly in a new window/tab but keep focus
    const calendlyWindow = window.open('https://calendly.com/n60/new-meeting', '_blank');
    if (calendlyWindow) {
      calendlyWindow.focus();
    }
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
    </div>
  );
};

export default Salesbot;
