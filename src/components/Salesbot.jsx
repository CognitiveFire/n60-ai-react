import React, { useState } from 'react';
import './Salesbot.css';
import SalesbotContactForm from './SalesbotContactForm';

const Salesbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyLoading, setCalendlyLoading] = useState(true);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'faq', 'pricing', 'team-check', 'question-answer'
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isCheckingTeam, setIsCheckingTeam] = useState(false);
  const [isProcessingQuestion, setIsProcessingQuestion] = useState(false);

  // Common prompts in Norwegian
  const commonPrompts = [
    {
      id: 'pricing',
      text: 'Hva koster det?',
      icon: '💰'
    },
    {
      id: 'faq',
      text: 'Ofte stilte spørsmål',
      icon: '❓'
    },
    {
      id: 'how-it-works',
      text: 'Hvordan fungerer det?',
      icon: '⚙️'
    },
    {
      id: 'demo',
      text: 'Se en demo',
      icon: '🎥'
    },
    {
      id: 'team',
      text: 'Snakk med teamet',
      icon: '👥'
    }
  ];

  // FAQ data in Norwegian
  const faqData = [
    {
      question: 'Hva er N60?',
      answer: 'N60 er en AI-drevet plattform som automatiserer B2B-produktmarkedsføring for norske bedrifter. Vi hjelper deg med å skape mer etterspørsel, generere flere leads og vokse raskere.'
    },
    {
      question: 'Hvor lang tid tar det å komme i gang?',
      answer: 'De fleste kunder ser resultater innen 2-4 uker. Vi setter opp alt for deg og gir deg full opplæring.'
    },
    {
      question: 'Trenger jeg teknisk kunnskap?',
      answer: 'Nei! Vår plattform er designet for å være enkel å bruke. Vi håndterer all teknisk oppsett og gir deg full støtte.'
    },
    {
      question: 'Hvilke bedrifter kan bruke N60?',
      answer: 'N60 er perfekt for norske små og mellomstore bedrifter som selger B2B-produkter eller tjenester.'
    },
    {
      question: 'Hva inkluderes i prisen?',
      answer: 'Prisen inkluderer plattformtilgang, oppsett, opplæring, teknisk støtte og løpende optimaliseringer.'
    }
  ];

  // Knowledge base for question answering
  const knowledgeBase = [
    {
      keywords: ['hva er', 'hva betyr', 'definisjon', 'forklaring'],
      answer: 'N60 er en AI-drevet plattform som automatiserer B2B-produktmarkedsføring for norske bedrifter. Vi hjelper deg med å skape mer etterspørsel, generere flere leads og vokse raskere.'
    },
    {
      keywords: ['pris', 'koster', 'kostnad', 'betaling', 'månedlig'],
      answer: 'Våre pakker starter fra 15,000 NOK/måned for grunnleggende tjenester, 25,000 NOK/måned for profesjonell pakke, og tilpasset prising for enterprise løsninger. Alle pakker inkluderer full plattformtilgang, oppsett, opplæring og teknisk støtte.'
    },
    {
      keywords: ['hvor lang tid', 'når', 'tidsramme', 'hastighet', 'raskt'],
      answer: 'De fleste kunder ser resultater innen 2-4 uker. Vi setter opp alt for deg og gir deg full opplæring, så du kan komme i gang raskt.'
    },
    {
      keywords: ['teknisk', 'kunnskap', 'vanskelig', 'komplisert', 'lære'],
      answer: 'Nei, du trenger ingen teknisk kunnskap! Vår plattform er designet for å være enkel å bruke. Vi håndterer all teknisk oppsett og gir deg full støtte og opplæring.'
    },
    {
      keywords: ['bedrift', 'bedrifter', 'selskap', 'hvilke', 'type'],
      answer: 'N60 er perfekt for norske små og mellomstore bedrifter som selger B2B-produkter eller tjenester. Vi tilpasser løsningen til din bransje og målgruppe.'
    },
    {
      keywords: ['hvordan', 'fungerer', 'prosess', 'arbeid', 'metode'],
      answer: 'Vi analyserer først din bedrift, setter deretter opp alt for deg, og vår AI håndterer markedsføringen din 24/7. Du ser økt etterspørsel og flere kvalifiserte leads innen 2-4 uker.'
    },
    {
      keywords: ['ai', 'automatisering', 'maskinlæring', 'teknologi'],
      answer: 'Vi bruker avansert AI-teknologi for å automatisk identifisere potensielle kunder, skape personlige markedsføringsmeldinger, og optimalisere din salgsprosess. Alt skjer automatisk 24/7.'
    },
    {
      keywords: ['leads', 'kunder', 'salg', 'konvertering', 'resultater'],
      answer: 'Vår AI genererer kvalifiserte leads automatisk ved å identifisere potensielle kunder, skape engasjerende innhold, og følge opp med personlige meldinger. Mange kunder ser 2-5x flere leads innen første måned.'
    },
    {
      keywords: ['støtte', 'hjelp', 'opplæring', 'veiledning'],
      answer: 'Vi gir full støtte og opplæring inkludert i alle pakker. Vårt team hjelper deg med oppsett, gir opplæring, og er tilgjengelig for spørsmål og optimaliseringer.'
    },
    {
      keywords: ['kontakt', 'snakke', 'møte', 'demo', 'avtale'],
      answer: 'Vi kan sette opp en demo eller møte for å vise deg hvordan N60 kan hjelpe din bedrift. La meg sjekke om en av våre eksperter er tilgjengelig akkurat nå.'
    }
  ];

  const handlePromptClick = (promptId) => {
    switch (promptId) {
      case 'pricing':
        setCurrentView('pricing');
        break;
      case 'faq':
        setCurrentView('faq');
        break;
      case 'how-it-works':
        setCurrentView('how-it-works');
        break;
      case 'demo':
        handleBookDemo();
        break;
      case 'team':
        setCurrentView('team-check');
        break;
      default:
        break;
    }
  };

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Find the best matching knowledge base entry
    let bestMatch = null;
    let maxMatches = 0;
    
    knowledgeBase.forEach(entry => {
      const matches = entry.keywords.filter(keyword => 
        lowerQuestion.includes(keyword)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = entry;
      }
    });
    
    // Return answer if we have a good match (at least 1 keyword)
    if (maxMatches > 0) {
      return bestMatch.answer;
    }
    
    return null; // No good match found
  };

  const handleAskQuestion = () => {
    if (userInput.trim()) {
      // Process the question
      setIsProcessingQuestion(true);
      setCurrentView('question-answer');
      
      // Simulate processing time
      setTimeout(() => {
        const answer = findAnswer(userInput);
        
        if (answer) {
          // Found a good answer
          setMessages([{
            type: 'user',
            text: userInput
          }, {
            type: 'bot',
            text: answer
          }]);
        } else {
          // No good answer found, route to team
          setMessages([{
            type: 'user',
            text: userInput
          }, {
            type: 'bot',
            text: 'Hmm, jeg er ikke helt sikker på det svaret. La meg sjekke om en av våre eksperter er tilgjengelig akkurat nå...'
          }]);
          
          // After showing the message, start team check
          setTimeout(() => {
            handleTeamCheck();
          }, 2000);
        }
        
        setIsProcessingQuestion(false);
        setUserInput('');
      }, 1500); // 1.5 second processing time
    } else {
      // No input, go to contact form
    setShowContactForm(true);
    setIsOpen(false);
    setIsExpanded(false);
    }
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

  const handleBackToMain = () => {
    setCurrentView('main');
    setMessages([]);
  };

  const handleTeamCheck = () => {
    setIsCheckingTeam(true);
    
    // Simulate team availability check with 15-second delay
    setTimeout(() => {
      const isTeamAvailable = Math.random() > 0.7; // 30% chance team is available (for testing)
      setIsCheckingTeam(false);
      
      if (isTeamAvailable) {
        setShowCalendly(true);
        setCalendlyLoading(true);
        setIsOpen(false);
        setIsExpanded(false);
      } else {
        // Show options when team is not available - keep popup open
        setCurrentView('team-unavailable');
      }
    }, 15000); // 15 seconds delay
  };

  const handleShowContactForm = () => {
    setShowContactForm(true);
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
        <div className="avatar">
          <img 
            src="https://i.ibb.co/yn9WGQBT/salesbot.png" 
            alt="N60 Salesbot" 
          />
        </div>
        <div className="chat-text">
          {isExpanded ? 'Chat med en ekspert' : 'Chat med en ekspert'}
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="salesbot-popup">
          <div className="popup-header">
            <span className="popup-title">Hei! Hvordan kan jeg hjelpe deg?</span>
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
          
          <div className="popup-content">
            {currentView === 'main' && (
              <div className="drift-interface">
                <div className="welcome-message">
                  <p>Velkommen til N60! Jeg er her for å hjelpe deg med å finne ut hvordan AI kan transformere din bedrifts markedsføring.</p>
                </div>
                
                <div className="common-prompts">
                  <h4>Populære spørsmål:</h4>
                  {commonPrompts.map((prompt) => (
                    <button
                      key={prompt.id}
                      className="prompt-button"
                      onClick={() => handlePromptClick(prompt.id)}
                    >
                      <span className="prompt-icon">{prompt.icon}</span>
                      <span className="prompt-text">{prompt.text}</span>
                    </button>
                  ))}
                </div>
                
                <div className="custom-question">
                  <h4>Eller still ditt eget spørsmål:</h4>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Skriv ditt spørsmål her..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="question-input"
                    />
            <button 
                      className="send-button"
              onClick={handleAskQuestion}
            >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'pricing' && (
              <div className="pricing-view">
                <button className="back-button" onClick={handleBackToMain}>
                  ← Tilbake
                </button>
                <h3>💰 Priser og pakker</h3>
                <div className="pricing-info">
                  <p><strong>Grunnleggende pakke:</strong> Fra 15,000 NOK/måned</p>
                  <p><strong>Profesjonell pakke:</strong> Fra 25,000 NOK/måned</p>
                  <p><strong>Enterprise pakke:</strong> Tilpasset prising</p>
                  <br />
                  <p>Alle pakker inkluderer:</p>
                  <ul>
                    <li>Full plattformtilgang</li>
                    <li>Oppsett og opplæring</li>
                    <li>Teknisk støtte</li>
                    <li>Løpende optimaliseringer</li>
                  </ul>
                  <button className="action-button" onClick={handleBookDemo}>
                    Få tilpasset tilbud
                  </button>
                </div>
              </div>
            )}

            {currentView === 'faq' && (
              <div className="faq-view">
                <button className="back-button" onClick={handleBackToMain}>
                  ← Tilbake
                </button>
                <h3>❓ Ofte stilte spørsmål</h3>
                <div className="faq-list">
                  {faqData.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <button className="action-button" onClick={handleAskQuestion}>
              Still et spørsmål
            </button>
              </div>
            )}

            {currentView === 'how-it-works' && (
              <div className="how-it-works-view">
                <button className="back-button" onClick={handleBackToMain}>
                  ← Tilbake
                </button>
                <h3>⚙️ Hvordan fungerer N60?</h3>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Analyse</h4>
                      <p>Vi analyserer din bedrift og identifiserer muligheter for AI-drevet markedsføring.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Oppsett</h4>
                      <p>Vi setter opp alt for deg - ingen teknisk kunnskap nødvendig.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Automatisering</h4>
                      <p>Vår AI håndterer markedsføringen din 24/7 og genererer leads automatisk.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Resultater</h4>
                      <p>Du ser økt etterspørsel og flere kvalifiserte leads innen 2-4 uker.</p>
                    </div>
                  </div>
                </div>
                <button className="action-button" onClick={handleBookDemo}>
                  Se hvordan det fungerer
                </button>
              </div>
            )}

            {currentView === 'question-answer' && (
              <div className="question-answer-view">
                <button className="back-button" onClick={handleBackToMain}>
                  ← Tilbake
                </button>
                <h3>💬 Spørsmål og svar</h3>
                
                {isProcessingQuestion ? (
                  <div className="processing-message">
                    <p>Tenker på ditt spørsmål...</p>
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <div className="chat-messages">
                    {messages.map((message, index) => (
                      <div key={index} className={`message ${message.type}`}>
                        <div className="message-content">
                          {message.type === 'user' && (
                            <div className="message-header">
                              <span className="message-label">Du:</span>
                            </div>
                          )}
                          {message.type === 'bot' && (
                            <div className="message-header">
                              <span className="message-label">N60:</span>
                            </div>
                          )}
                          <p>{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!isProcessingQuestion && messages.length > 0 && (
                  <div className="follow-up-actions">
                    <button className="action-button" onClick={handleBackToMain}>
                      Still et nytt spørsmål
                    </button>
                    <button className="action-button secondary" onClick={() => setCurrentView('team-check')}>
                      Snakk med teamet
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentView === 'team-check' && (
              <div className="team-check-view">
                <button className="back-button" onClick={handleBackToMain}>
                  ← Tilbake
                </button>
                <h3>👥 Snakk med teamet</h3>
                <div className="team-message">
                  {isCheckingTeam ? (
                    <>
                      <div className="searching-animation">
                        <div className="search-icon">🔍</div>
                        <div className="search-pulse"></div>
                      </div>
                      <p>Søker etter tilgjengelige teammedlemmer...</p>
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p className="search-timer">Dette kan ta opptil 15 sekunder</p>
                      <div className="search-progress">
                        <div className="progress-bar">
                          <div className="progress-fill"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Klikk for å sjekke om en av våre eksperter er tilgjengelig akkurat nå.</p>
                      <p className="search-info">Vi sjekker alle våre teammedlemmer for tilgjengelighet.</p>
                    </>
                  )}
                </div>
                {!isCheckingTeam && (
                  <button className="action-button" onClick={handleTeamCheck}>
                    Sjekk tilgjengelighet
                  </button>
                )}
              </div>
            )}

            {currentView === 'team-unavailable' && (
              <div className="team-unavailable-view">
                <button className="back-button" onClick={handleBackToMain}>
                  ← Tilbake
                </button>
                <h3>👥 Team ikke tilgjengelig</h3>
                <div className="unavailable-message">
                  <div className="unavailable-icon">😔</div>
                  <p>Beklager, vårt team er ikke tilgjengelig akkurat nå.</p>
                  <p className="unavailable-subtitle">Men vi kommer tilbake til deg innen 24 timer!</p>
                </div>
                <div className="unavailable-options">
                  <h4>Hva vil du gjøre?</h4>
                  <button className="action-button" onClick={handleShowContactForm}>
                    📝 Send oss en melding
                  </button>
                  <button className="action-button secondary" onClick={handleBookDemo}>
                    📅 Book en demo
            </button>
                  <button className="action-button secondary" onClick={handleBackToMain}>
                    🔍 Still et spørsmål
            </button>
                </div>
              </div>
            )}
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
          </div>
          <SalesbotContactForm />
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
