import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('quotes');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('digital-growth');
  const [proposalData, setProposalData] = useState({
    clientCompany: '',
    clientEmail: '',
    clientContact: '',
    projectScope: 'full',
    customMessage: ''
  });
  const [selectedInnovasjonslag, setSelectedInnovasjonslag] = useState([]);
  const [showQuoteLightbox, setShowQuoteLightbox] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === 'admin' && loginForm.password === 'admin1234') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin / admin1234');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    if (onClose) onClose();
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    
    if (selectedInnovasjonslag.length === 0) {
      alert('Vennligst velg minst én Innovasjonslag tjeneste.');
      return;
    }

    // Capture the edited proposal text
    const proposalTemplate = document.querySelector('.proposal-template');
    const editedProposalText = proposalTemplate ? proposalTemplate.innerHTML : '';

    const totalPrice = selectedInnovasjonslag.reduce((sum, option) => sum + option.price, 0);
    const totalHours = selectedInnovasjonslag.reduce((sum, option) => sum + option.hours, 0);
    const estimatedRunningCosts = Math.round(totalPrice * 0.10); // 10% of total price
    
    const quoteData = {
      id: `N60-${Date.now()}`,
      clientCompany: proposalData.clientCompany,
      clientEmail: proposalData.clientEmail,
      clientContact: proposalData.clientContact,
      customMessage: proposalData.customMessage,
      editedProposalText,
      selectedServices: selectedInnovasjonslag,
      totalPrice,
      totalHours,
      estimatedRunningCosts,
      generatedAt: new Date().toLocaleDateString('nb-NO'),
      shareLink: `${window.location.origin}/Command-Center/quote/${Date.now()}`
    };
    
    const quote = {
      ...quoteData,
      shareData: btoa(JSON.stringify(quoteData)) // Encode quote data for sharing
    };
    
    setGeneratedQuote(quote);
    setShowQuoteLightbox(true);
  };

  const handleInnovasjonslagToggle = (option) => {
    setSelectedInnovasjonslag(prev => {
      const isSelected = prev.find(item => item.id === option.id);
      if (isSelected) {
        return prev.filter(item => item.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const downloadPDF = (quote) => {
    // Create a simple HTML document for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Tilbud - ${quote.clientCompany}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-info { margin-bottom: 30px; }
            .services { margin-bottom: 30px; }
            .service-item { margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; }
            .totals { margin-top: 30px; padding: 20px; background: #f5f5f5; }
            .proposal-content { margin-top: 30px; }
            h1, h2, h3 { color: #333; }
            .price { font-weight: bold; color: #2e7d32; }
            .running-costs { color: #f57c00; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>N60.ai - Profesjonelt Tilbud</h1>
            <h2>${quote.clientCompany}</h2>
          </div>
          
          <div class="company-info">
            <p><strong>Kontaktperson:</strong> ${quote.clientContact || 'Ikke spesifisert'}</p>
            <p><strong>Tilbuds-ID:</strong> ${quote.id}</p>
            <p><strong>Generert:</strong> ${quote.generatedAt}</p>
          </div>
          
          <div class="services">
            <h3>Valgte Tjenester:</h3>
            ${quote.selectedServices.map(service => `
              <div class="service-item">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <p><strong>Pris:</strong> <span class="price">${service.price.toLocaleString()} NOK</span></p>
                <p><strong>Estimert tid:</strong> ${service.hours} timer</p>
              </div>
            `).join('')}
          </div>
          
          <div class="totals">
            <h3>Oppsummering:</h3>
            <p><strong>Total Pris:</strong> <span class="price">${quote.totalPrice.toLocaleString()} NOK</span></p>
            <p><strong>Total Tid:</strong> ${quote.totalHours} timer</p>
            <p><strong>Estimert Driftskostnader (10% per måned):</strong> <span class="running-costs">${quote.estimatedRunningCosts.toLocaleString()} NOK</span></p>
          </div>
          
          ${quote.customMessage ? `
            <div class="custom-message">
              <h3>Personlig Melding:</h3>
              <p>${quote.customMessage}</p>
            </div>
          ` : ''}
          
          <div class="proposal-content">
            <h3>Forslagstekst:</h3>
            ${quote.editedProposalText || 'Ingen forslagstekst tilgjengelig'}
          </div>
        </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tilbud-${quote.clientCompany}-${quote.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const allServices = [
    {
      id: 'chat-voice-bots',
      name: 'Chat/Voice/Hjelpeboter',
      description: 'Integrerte chat + valgfri stemmeagent-integrasjon',
      price: 15000,
      hours: 25
    },
    {
      id: 'smart-forms-landing',
      name: 'Smart Forms & Landing Pages',
      description: 'Adaptive skjemaer, konverteringsoptimalisering',
      price: 12000,
      hours: 20
    },
    {
      id: 'whatsapp-social',
      name: 'WhatsApp / Sosiale Kampanjer',
      description: 'Multi-kanal outreach oppsett',
      price: 15000,
      hours: 25
    },
    {
      id: 'personalised-guides',
      name: 'Personlige Produktguider',
      description: 'AI-genererte ROI-guider, PDFs/mikrosider',
      price: 18000,
      hours: 30
    },
    {
      id: 'augmented-content',
      name: 'Augmentert Innhold + Oversettelse',
      description: 'Kampanjevinkel-forslag + naturlig lokalisering',
      price: 18000,
      hours: 30
    },
    {
      id: 'predictive-insights',
      name: 'Prediktive Innblikk / Churn Risiko',
      description: 'Prognose-dashboards, kontohelse-anbefalinger',
      price: 21000,
      hours: 35
    },
    {
      id: 'event-pipeline',
      name: 'Event-til-Pipeline Automatisering',
      description: 'AI-bro mellom events og CRM-oppfølging',
      price: 24000,
      hours: 40
    }
  ];



  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>N60 Command Center</h1>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Brukernavn</label>
                <input
                  type="text"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Passord</label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              
              {loginError && <div className="error-message">{loginError}</div>}
              
              <button type="submit" className="login-button">
                Logg inn
              </button>
            </form>
            

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>N60.ai Admin Dashboard</h1>
          <nav className="admin-nav">
            <button 
              className={`nav-tab ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              Tilbud & Forslag
            </button>
            <button 
              className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveTab('customers')}
            >
              Kunder
            </button>
            <button 
              className={`nav-tab ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              Maler
            </button>
          </nav>
          <button onClick={handleLogout} className="logout-button">
            Logg ut
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {activeTab === 'quotes' && (
          <div className="quotes-section">
            <div className="section-header">
              <h2>Generer profesjonelle forslag</h2>
              <p>Velg en mal og tilpass den til din kunde</p>
            </div>

            <div className="template-selection">
              <h3>Velg tjenester</h3>
              <p>Velg fra våre AI-drevne markedsføringstjenester</p>
            </div>

            <div className="proposal-form">
              <h3>Kundedetaljer</h3>
              <form onSubmit={handleProposalSubmit} className="customer-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="clientCompany">Firmanavn *</label>
                    <input
                      type="text"
                      id="clientCompany"
                      value={proposalData.clientCompany}
                      onChange={(e) => setProposalData({...proposalData, clientCompany: e.target.value})}
                      required
                      placeholder="Firma AS"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="clientEmail">E-post *</label>
                    <input
                      type="email"
                      id="clientEmail"
                      value={proposalData.clientEmail}
                      onChange={(e) => setProposalData({...proposalData, clientEmail: e.target.value})}
                      required
                      placeholder="kunde@firma.no"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="clientContact">Kontaktperson</label>
                  <input
                    type="text"
                    id="clientContact"
                    value={proposalData.clientContact}
                    onChange={(e) => setProposalData({...proposalData, clientContact: e.target.value})}
                    placeholder="Navn på kontaktperson"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customMessage">Personlig melding</label>
                  <textarea
                    id="customMessage"
                    value={proposalData.customMessage}
                    onChange={(e) => setProposalData({...proposalData, customMessage: e.target.value})}
                    placeholder="Skriv en personlig melding til kunden..."
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Velg tjenester</label>
                  <div className="innovasjonslag-grid">
                    {allServices.map((option) => {
                      const isSelected = selectedInnovasjonslag.find(item => item.id === option.id);
                      return (
                        <div 
                          key={option.id}
                          className={`innovasjonslag-option ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleInnovasjonslagToggle(option)}
                        >
                          <div className="option-header">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleInnovasjonslagToggle(option)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <h4>{option.name}</h4>
                            <span className="option-price">{option.price.toLocaleString()} NOK</span>
                          </div>
                          <p>{option.description}</p>
                          <div className="option-details">
                            <span>Estimert tid: {option.hours} timer</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label>Forslagstekst (Redigerbar)</label>
                  <div className="proposal-template" contentEditable="true" suppressContentEditableWarning={true}>
                    <h4>Forslag for Digital Vekst & AI-Drevet Lead Generering</h4>
                    
                    <div className="proposal-section">
                      <h5>1. Introduksjon</h5>
                      <p>Dette forslaget beskriver hvordan N60.ai vil akselerere digital vekst og generere høykvalitets leads for <strong>[{proposalData.clientCompany || 'Kunde'}]</strong>. Ved å kombinere AI-drevne verktøy, smarte landingssider og målrettede kampanjer, leverer vi målbare resultater samtidig som vi sikrer sømløs integrasjon med dine eksisterende systemer.</p>
                    </div>

                    <div className="proposal-section">
                      <h5>2. Mål</h5>
                      <ul>
                        <li>Øke kvalifisert lead-strøm gjennom AI-drevet markedsføring.</li>
                        <li>Skape smarte landingssider og innholdssider optimalisert for konvertering.</li>
                        <li>Implementere hybrid salesbot med live agent overlevering.</li>
                        <li>Integrere løsningen med din eksisterende CRM for å strømlinjeform lead-håndtering.</li>
                        <li>Gi målbare rapporter og kontinuerlig optimalisering.</li>
                      </ul>
                    </div>

                    <div className="proposal-section">
                      <h5>3. Arbeidsomfang</h5>
                      
                      <div className="scope-item">
                        <h6>Smarte Landingssider & Innholdssider</h6>
                        <ul>
                          <li>Design og bygging av konverteringsfokuserte landingssider.</li>
                          <li>Integrering av hybrid salesbot (AI-chat + menneskelig agent overlevering).</li>
                          <li>Direkte tilkobling til din CRM for sømløs lead-fangst.</li>
                        </ul>
                      </div>

                      <div className="proposal-section">
                        <h6>AI-Drevet Lead Generering</h6>
                        <ul>
                          <li>Oppsett og optimalisering av AI-drevne annonsekampanjer.</li>
                          <li>Automatiserte innholdsforslag for blogger og nyhetsbrev.</li>
                          <li>Prediktiv lead scoring og oppfølgingsautomatisering.</li>
                        </ul>
                      </div>

                      <div className="proposal-section">
                        <h6>CRM Integrasjon</h6>
                        <ul>
                          <li>Sikre full kompatibilitet med din CRM.</li>
                          <li>Oppsett av automatiserte arbeidsflyter for lead-oppfølging.</li>
                        </ul>
                      </div>

                      <div className="proposal-section">
                        <h6>Rapportering & Optimalisering</h6>
                        <ul>
                          <li>Tilpassede dashboards med KPIer.</li>
                          <li>Månedlige innsikter og anbefalinger for forbedring.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="proposal-section">
                      <h5>4. Leveranser</h5>
                      <ul>
                        <li>2–3 Smarte Landingssider med hybrid salesbot + CRM integrasjon.</li>
                        <li>AI kampanje oppsett og optimalisering.</li>
                        <li>Automatisert rapporteringsdashboard.</li>
                        <li>Månedlig optimalisering og støtte.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="generate-button">
                    Generer forslag
                  </button>
                  <button type="button" className="preview-button">
                    Forhåndsvis
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="customers-section">
            <h2>Kundeliste</h2>
            <div className="customer-list">
              <div className="customer-item">
                <div className="customer-info">
                  <h4>TechCorp AS</h4>
                  <p>kunde@techcorp.no</p>
                  <p>Status: Forslag sendt</p>
                </div>
                <div className="customer-actions">
                  <button className="action-btn">Se forslag</button>
                  <button className="action-btn">Oppdater</button>
                </div>
              </div>
              
              <div className="customer-item">
                <div className="customer-info">
                  <h4>StartupXYZ</h4>
                  <p>kontakt@startupxyz.no</p>
                  <p>Status: Under forhandling</p>
                </div>
                <div className="customer-actions">
                  <button className="action-btn">Se forslag</button>
                  <button className="action-btn">Oppdater</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="templates-section">
            <h2>Forslagsmaler</h2>
            <div className="template-editor">
              <p>Her kan du redigere og tilpasse forslagsmalene dine.</p>
              <p>Funksjonalitet kommer snart...</p>
            </div>
          </div>
        )}
      </main>

      {/* Quote Lightbox */}
      {showQuoteLightbox && generatedQuote && (
        <div className="quote-lightbox-overlay" onClick={() => setShowQuoteLightbox(false)}>
          <div className="quote-lightbox" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <h2>Tilbud Generert</h2>
              <button 
                className="close-lightbox"
                onClick={() => setShowQuoteLightbox(false)}
              >
                ×
              </button>
            </div>
            
            <div className="quote-content">
              <div className="quote-summary">
                <h3>Tilbud for {generatedQuote.clientCompany}</h3>
                {generatedQuote.clientContact && (
                  <p className="quote-contact">Kontaktperson: {generatedQuote.clientContact}</p>
                )}
                <p className="quote-id">Tilbuds-ID: {generatedQuote.id}</p>
              </div>

              <div className="selected-services">
                <h4>Valgte Tjenester:</h4>
                {generatedQuote.selectedServices.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="service-info">
                      <h5>{service.name}</h5>
                      <p>{service.description}</p>
                    </div>
                    <div className="service-pricing">
                      <span className="service-price">{service.price.toLocaleString()} NOK</span>
                      <span className="service-hours">{service.hours} timer</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quote-total">
                <div className="total-row">
                  <span>Total Pris:</span>
                  <span className="total-price">{generatedQuote.totalPrice.toLocaleString()} NOK</span>
                </div>
                <div className="total-row">
                  <span>Total Tid:</span>
                  <span className="total-hours">{generatedQuote.totalHours} timer</span>
                </div>
                <div className="total-row running-costs">
                  <span>Estimert Driftskostnader (10% per måned):</span>
                  <span className="running-costs-price">{generatedQuote.estimatedRunningCosts.toLocaleString()} NOK</span>
                </div>
              </div>

              {generatedQuote.editedProposalText && (
                <div className="proposal-display">
                  <h4>Forslagstekst:</h4>
                  <div 
                    className="proposal-content"
                    dangerouslySetInnerHTML={{ __html: generatedQuote.editedProposalText }}
                  />
                </div>
              )}

              {generatedQuote.customMessage && (
                <div className="custom-message">
                  <h4>Personlig Melding:</h4>
                  <p>{generatedQuote.customMessage}</p>
                </div>
              )}

                              <div className="share-section">
                  <h4>Del med kunden:</h4>
                  <div className="share-link">
                    <input
                      type="text"
                      value={generatedQuote.shareLink}
                      readOnly
                      className="share-input"
                    />
                    <button 
                      className="copy-link-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedQuote.shareLink);
                        alert('Lenke kopiert til utklippstavlen!');
                      }}
                    >
                      Kopier
                    </button>
                  </div>
                  <p className="share-note">Denne lenken kan deles med kunden for å vise tilbudet</p>
                  <div className="share-actions">
                    <button 
                      className="share-quote-btn"
                      onClick={() => {
                        const shareData = generatedQuote.shareData;
                        const shareUrl = `${window.location.origin}/Command-Center/quote?data=${shareData}`;
                        navigator.clipboard.writeText(shareUrl);
                        alert('Delbar lenke kopiert! Denne lenken viser tilbudet direkte.');
                      }}
                    >
                      Generer delbar lenke
                    </button>
                  </div>
                </div>
            </div>

            <div className="lightbox-actions">
              <button 
                className="download-pdf-btn"
                onClick={() => downloadPDF(generatedQuote)}
              >
                Last ned PDF
              </button>
              <button 
                className="send-email-btn"
                onClick={() => alert('E-post sending kommer snart!')}
              >
                Send på e-post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
