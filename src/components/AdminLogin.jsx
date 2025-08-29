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
    if (loginForm.email === 'Admin' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials.');
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

    const totalPrice = selectedInnovasjonslag.reduce((sum, option) => sum + option.price, 0);
    const totalHours = selectedInnovasjonslag.reduce((sum, option) => sum + option.hours, 0);
    
    const quote = {
      id: `N60-${Date.now()}`,
      clientCompany: proposalData.clientCompany,
      clientEmail: proposalData.clientEmail,
      clientContact: proposalData.clientContact,
      customMessage: proposalData.customMessage,
      selectedServices: selectedInnovasjonslag,
      totalPrice,
      totalHours,
      generatedAt: new Date().toLocaleDateString('nb-NO'),
      shareLink: `${window.location.origin}/quote/${Date.now()}`
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

  const allServices = [
    {
      id: 'ai-marketing',
      name: 'AI-Drevet Markedsføring',
      description: 'Automatiserte kampanjer med prediktiv analyse og optimalisering',
      price: 15000,
      hours: 30
    },
    {
      id: 'smart-landing-pages',
      name: 'Smart Landing Pages',
      description: 'Høykonverterende landingssider med AI-optimalisering',
      price: 12000,
      hours: 25
    },
    {
      id: 'salesbot',
      name: 'Hybrid Salesbot',
      description: 'AI-chat med live agent overlevering for bedre kundeservice',
      price: 18000,
      hours: 35
    },
    {
      id: 'crm-integration',
      name: 'CRM Integrasjon',
      description: 'Seamless integrasjon med eksisterende CRM-systemer',
      price: 8000,
      hours: 15
    },
    {
      id: 'analytics-dashboard',
      name: 'Analytics Dashboard',
      description: 'Tilpassede dashboards med KPIer og rapportering',
      price: 10000,
      hours: 20
    },
    {
      id: 'content-automation',
      name: 'Innholdsautomatisering',
      description: 'Automatiserte innholdsforslag for blogs og nyhetsbrev',
      price: 9000,
      hours: 18
    },
    {
      id: 'lead-scoring',
      name: 'Lead Scoring & Nurturing',
      description: 'Prediktiv lead scoring og automatiserte workflows',
      price: 11000,
      hours: 22
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimalisering',
      description: 'AI-drevet SEO med kontinuerlig optimalisering',
      price: 7000,
      hours: 14
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

                <div className="form-row">
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
                    <label htmlFor="projectScope">Prosjektomfang</label>
                    <select
                      id="projectScope"
                      value={proposalData.projectScope}
                      onChange={(e) => setProposalData({...proposalData, projectScope: e.target.value})}
                    >
                      <option value="full">Full pakke</option>
                      <option value="landing-pages">Kun landing pages</option>
                      <option value="ai-campaigns">Kun AI-kampanjer</option>
                      <option value="custom">Tilpasset løsning</option>
                    </select>
                  </div>
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
                  <label>Forslagstekst</label>
                  <div className="proposal-template">
                    <h4>Proposal for Digital Growth & AI-Powered Lead Generation</h4>
                    
                    <div className="proposal-section">
                      <h5>1. Introduction</h5>
                      <p>This proposal outlines how N60.ai will accelerate digital growth and generate high-quality leads for <strong>[{proposalData.clientCompany || 'Client Company'}]</strong>. By combining AI-powered tools, smart landing pages, and targeted campaigns, we deliver measurable results while ensuring seamless integration with your existing systems.</p>
                    </div>

                    <div className="proposal-section">
                      <h5>2. Objectives</h5>
                      <ul>
                        <li>Increase qualified lead flow through AI-driven marketing.</li>
                        <li>Create smart landing pages and content pages optimised for conversion.</li>
                        <li>Deploy a hybrid salesbot with live agent handover.</li>
                        <li>Integrate the solution with your existing CRM to streamline lead management.</li>
                        <li>Provide measurable reporting and ongoing optimisation.</li>
                      </ul>
                    </div>

                    <div className="proposal-section">
                      <h5>3. Scope of Work</h5>
                      
                      <div className="scope-item">
                        <h6>Smart Landing Pages & Content Pages</h6>
                        <ul>
                          <li>Design and build conversion-focused landing pages.</li>
                          <li>Integrate hybrid salesbot (AI chat + human agent handover).</li>
                          <li>Connect directly to your CRM for seamless lead capture.</li>
                        </ul>
                      </div>

                      <div className="scope-item">
                        <h6>AI-Powered Lead Generation</h6>
                        <ul>
                          <li>Setup and optimisation of AI-driven ad campaigns.</li>
                          <li>Automated content suggestions for blogs & newsletters.</li>
                          <li>Predictive lead scoring and follow-up automation.</li>
                        </ul>
                      </div>

                      <div className="scope-item">
                        <h6>CRM Integration</h6>
                        <ul>
                          <li>Ensure full compatibility with your CRM.</li>
                          <li>Setup of automated workflows for lead nurturing.</li>
                        </ul>
                      </div>

                      <div className="scope-item">
                        <h6>Reporting & Optimisation</h6>
                        <ul>
                          <li>Custom dashboards with KPIs.</li>
                          <li>Monthly insights and recommendations for improvement.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="proposal-section">
                      <h5>4. Deliverables</h5>
                      <ul>
                        <li>2–3 Smart Landing Pages with hybrid salesbot + CRM integration.</li>
                        <li>AI campaign setup and optimisation.</li>
                        <li>Automated reporting dashboard.</li>
                        <li>Monthly optimisation and support.</li>
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
                <p className="quote-date">Generert: {generatedQuote.generatedAt}</p>
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
              </div>

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
              </div>
            </div>

            <div className="lightbox-actions">
              <button 
                className="download-pdf-btn"
                onClick={() => alert('PDF-nedlasting kommer snart!')}
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
