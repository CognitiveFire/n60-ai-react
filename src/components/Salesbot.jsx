import React, { useState } from 'react';
import './Salesbot.css';

const Salesbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAskQuestion = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleBookDemo = () => {
    // Open Calendly in new tab
    window.open('https://calendly.com/n60/new-meeting', '_blank');
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleContact = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className="salesbot-container">
      {/* Chat Bubble */}
      <div 
        className={`chat-bubble ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="chat-bubble-content">
          <span className="chat-text">Har du et spørsmål?</span>
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
            <span className="popup-title">Har du et spørsmål?</span>
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
    </div>
  );
};

export default Salesbot;
