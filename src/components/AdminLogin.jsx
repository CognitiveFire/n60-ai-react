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
  const [customers, setCustomers] = useState([]);
  const [quotes, setQuotes] = useState([]);

  // Helper functions for pricing table
  const calculateTotalHours = () => {
    const selectedHours = selectedInnovasjonslag.reduce((total, service) => total + service.hours, 0);
    return selectedHours + 30; // Discovery & Strategy (10) + Reporting Dashboard (10) + Monthly Support (10)
  };

  const calculateTotalPrice = () => {
    const selectedPrice = selectedInnovasjonslag.reduce((total, service) => total + (service.hours * 500), 0);
    return selectedPrice + 15000; // Discovery & Strategy (5000) + Reporting Dashboard (5000) + Monthly Support (5000)
  };

  const handleHoursAdjustment = (type) => {
    // This function can be expanded to handle hours adjustment for monthly support
    console.log('Hours adjustment for:', type);
  };

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
    const mva = Math.round(totalPrice * 0.25); // 25% MVA
    const totalWithMva = totalPrice + mva;
    
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
      mva,
      totalWithMva,
      estimatedRunningCosts,
      generatedAt: new Date().toLocaleDateString('nb-NO'),
      shareLink: `${window.location.origin}/quote?data=${btoa(unescape(encodeURIComponent(JSON.stringify(quoteData))))}`
    };
    
    const quote = {
      ...quoteData,
      shareData: btoa(unescape(encodeURIComponent(JSON.stringify(quoteData)))) // Encode quote data for sharing
    };
    
    // Automatically add customer to customers list
    const newCustomer = {
      id: Date.now(),
      company: proposalData.clientCompany,
      email: proposalData.clientEmail,
      contact: proposalData.clientContact,
      status: 'Forslag sendt',
      quoteId: quote.id,
      generatedAt: new Date().toLocaleDateString('nb-NO'),
      dealSize: quote.totalWithMva
    };
    
    // Add quote to quotes list
    const newQuote = {
      id: quote.id,
      customer: proposalData.clientCompany,
      email: proposalData.clientEmail,
      contact: proposalData.clientContact,
      status: 'Forslag sendt',
      dealSize: quote.totalWithMva,
      generatedAt: new Date().toLocaleDateString('nb-NO'),
      totalPrice: quote.totalPrice,
      totalWithMva: quote.totalWithMva,
      mva: quote.mva
    };
    
    setCustomers(prev => [...prev, newCustomer]);
    setQuotes(prev => [...prev, newQuote]);
    setGeneratedQuote(quote);
    setShowQuoteLightbox(true);
    
    // Clear form after successful submission
    setProposalData({
      clientCompany: '',
      clientEmail: '',
      clientContact: '',
      customMessage: ''
    });
    setSelectedInnovasjonslag([]);
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

  const markQuoteAsAccepted = (quoteId) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, status: 'Akseptert' }
        : quote
    ));
    
    setCustomers(prev => prev.map(customer => 
      customer.quoteId === quoteId 
        ? { ...customer, status: 'Akseptert' }
        : customer
    ));
  };

  const downloadPDF = (quote) => {
    // Create a professional HTML document for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Tilbud - ${quote.clientCompany}</title>
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 0; 
              padding: 40px; 
              background: #ffffff;
              color: #1f2937;
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              margin-bottom: 40px; 
              padding-bottom: 30px;
              border-bottom: 3px solid #3b82f6;
            }
            .logo-section {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .logo-section img {
              height: 80px;
              width: auto;
              margin: 0;
            }
            .quote-title {
              color: #374151;
              font-size: 1.8rem;
              margin: 10px 0;
            }
            .customer-name {
              color: #1f2937;
              font-size: 2.5rem;
              font-weight: 700;
              margin: 15px 0;
            }
            .company-info { 
              margin-bottom: 40px; 
              background: #f8fafc;
              padding: 25px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .services { 
              margin-bottom: 40px; 
            }
            .service-item { 
              margin-bottom: 20px; 
              padding: 20px; 
              border: 1px solid #e2e8f0; 
              border-radius: 8px;
              background: #f8fafc;
              border-left: 4px solid #3b82f6;
            }
            .service-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .service-name {
              color: #1e40af;
              font-size: 1.2rem;
              font-weight: 600;
              margin: 0;
            }
            .service-price {
              color: #059669;
              font-weight: 700;
              font-size: 1.1rem;
            }
            .service-description {
              color: #6b7280;
              margin-bottom: 15px;
            }
            .service-details {
              display: flex;
              gap: 20px;
              font-size: 0.9rem;
              color: #374151;
            }
            .pricing-table {
              margin-bottom: 40px;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              overflow: hidden;
            }
            .pricing-table table {
              width: 100%;
              border-collapse: collapse;
            }
            .pricing-table th {
              background: #f1f5f9;
              color: #1e293b;
              font-weight: 600;
              padding: 15px;
              text-align: left;
              border-bottom: 2px solid #e2e8f0;
            }
            .pricing-table td {
              padding: 15px;
              border-bottom: 1px solid #e2e8f0;
              color: #374151;
            }
            .pricing-table .subtotal {
              background: #f8fafc;
              font-weight: 600;
            }
            .pricing-table .mva {
              background: #fef2f2;
              color: #dc2626;
              font-weight: 600;
            }
            .pricing-table .total {
              background: #f0fdf4;
              color: #059669;
              font-weight: 700;
              font-size: 1.1rem;
            }
            .totals { 
              margin-top: 30px; 
              padding: 25px; 
              background: #f8fafc; 
              border-radius: 8px;
              border: 1px solid #e2e8f0;
            }
            .totals h3 {
              color: #1e40af;
              margin-top: 0;
              margin-bottom: 20px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .total-row:last-child {
              border-bottom: none;
            }
            .total-row.mva {
              color: #dc2626;
              font-weight: 600;
            }
            .total-row.final {
              color: #059669;
              font-weight: 700;
              font-size: 1.1rem;
              border-top: 2px solid #3b82f6;
              margin-top: 10px;
              padding-top: 15px;
            }
            .proposal-content { 
              margin-top: 30px; 
              background: #fef3c7;
              padding: 25px;
              border-radius: 8px;
              border: 1px solid #fde68a;
            }
            .proposal-content h3 {
              color: #92400e;
              margin-top: 0;
            }
            .proposal-content p {
              color: #92400e;
              margin: 0;
            }
            h1, h2, h3 { color: #1e40af; }
            .price { font-weight: bold; color: #059669; }
            .running-costs { color: #f59e0b; }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #6b7280;
              font-size: 0.9rem;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-section">
              <img src="https://i.ibb.co/vCcJ11RK/logo.png" alt="N60.ai Logo" />
            </div>
            <h2 class="quote-title">Prisforslag</h2>
            <h1 class="customer-name">${quote.clientCompany}</h1>
          </div>
          
          <div class="company-info">
            <div class="info-grid">
              <div>
                <p><strong>Kontaktperson:</strong> ${quote.clientContact || 'Ikke spesifisert'}</p>
                <p><strong>E-post:</strong> ${quote.clientEmail}</p>
              </div>
              <div>
                <p><strong>Tilbuds-ID:</strong> ${quote.id}</p>
                <p><strong>Generert:</strong> ${quote.generatedAt}</p>
              </div>
            </div>
          </div>
          
          <div class="services">
            <h3>Valgte Tjenester</h3>
            ${quote.selectedServices.map(service => `
              <div class="service-item">
                <div class="service-header">
                  <h4 class="service-name">${service.name}</h4>
                  <span class="service-price">${service.price.toLocaleString()} NOK</span>
                </div>
                <p class="service-description">${service.description}</p>
                <div class="service-details">
                  <span><strong>Estimert tid:</strong> ${service.hours} timer</span>
                  <span><strong>Pris per time:</strong> 500 NOK</span>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="pricing-table">
            <table>
              <thead>
                <tr>
                  <th>Tjeneste</th>
                  <th>Timer</th>
                  <th>Pris per time</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${quote.selectedServices.map(service => `
                  <tr>
                    <td>${service.name}</td>
                    <td>${service.hours}</td>
                    <td>500 NOK</td>
                    <td>${service.price.toLocaleString()} NOK</td>
                    </tr>
                `).join('')}
                <tr class="subtotal">
                  <td colspan="3"><strong>Subtotal (eks. MVA)</strong></td>
                  <td><strong>${quote.totalPrice.toLocaleString()} NOK</strong></td>
                </tr>
                <tr class="mva">
                  <td colspan="3"><strong>MVA (25%)</strong></td>
                  <td><strong>${quote.mva.toLocaleString()} NOK</strong></td>
                </tr>
                <tr class="total">
                  <td colspan="3"><strong>Totalt inkl. MVA</strong></td>
                  <td><strong>${quote.totalWithMva.toLocaleString()} NOK</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="totals">
            <h3>Oppsummering</h3>
            <div class="total-row">
              <span>Total Pris (eks. MVA):</span>
              <span class="price">${quote.totalPrice.toLocaleString()} NOK</span>
            </div>
            <div class="total-row mva">
              <span>MVA (25%):</span>
              <span class="price">${quote.mva.toLocaleString()} NOK</span>
            </div>
            <div class="total-row final">
              <span>Totalt inkl. MVA:</span>
              <span class="price">${quote.totalWithMva.toLocaleString()} NOK</span>
            </div>
            <div class="total-row">
              <span>Total Tid:</span>
              <span>${quote.totalHours} timer</span>
            </div>
            <div class="total-row running-costs">
              <span>Estimert Driftskostnader (10% per måned):</span>
              <span class="running-costs">${quote.estimatedRunningCosts.toLocaleString()} NOK</span>
            </div>
          </div>
          
          ${quote.customMessage ? `
            <div class="proposal-content">
              <h3>Personlig Melding</h3>
              <p>${quote.customMessage}</p>
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Dette tilbudet er gyldig i 30 dager fra ${quote.generatedAt}</p>
            <p>Kontakt oss på <strong>info@n60.ai</strong> hvis du har spørsmål</p>
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
      id: 'chatbots-voice',
      name: 'Chatbots og stemmeassistenter',
      description: 'Integrerte chat + valgfri stemmeagent-integrasjon',
      price: 15000,
      hours: 25
    },
    {
      id: 'smart-forms-landing',
      name: 'SmartForms og intelligente landingssider',
      description: 'Adaptive skjemaer, konverteringsoptimalisering',
      price: 12000,
      hours: 20
    },
    {
      id: 'whatsapp-social',
      name: 'WhatsApp og multikanals outreach',
      description: 'Multi-kanal outreach oppsett',
      price: 15000,
      hours: 25
    },
    {
      id: 'personalized-content',
      name: 'Personlig innhold',
      description: 'AI-genererte ROI-guider, PDFs/mikrosider',
      price: 18000,
      hours: 30
    },
    {
      id: 'augmented-content',
      name: 'Augmentert innhold og lokalisering',
      description: 'Kampanjevinkel-forslag + naturlig lokalisering',
      price: 18000,
      hours: 30
    },
    {
      id: 'predictive-insights',
      name: 'Prediktivt salg og data-innsikt',
      description: 'Prognose-dashboards, kontohelse-anbefalinger',
      price: 21000,
      hours: 35
    },
    {
      id: 'event-pipeline',
      name: 'Fysiske eventer til digital pipeline',
      description: 'AI-bro mellom events og CRM-oppfølging',
      price: 24000,
      hours: 40
    },
    {
      id: 'ai-seo',
      name: 'AI for SEO',
      description: 'AI-drevet søkemotoroptimalisering og innholdsstrategi',
      price: 20000,
      hours: 30
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
              className={`nav-tab ${activeTab === 'quotes-tracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes-tracking')}
            >
              Tilbud Tracking
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
              <div className="stepper-container">
                <div className="stepper">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className={`stepper-dot ${step === 1 ? 'active' : ''}`}>
                      {step === 1 && <span className="step-number">1</span>}
                    </div>
                  ))}
                </div>
              </div>
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

                <div className="form-group">
                  <label>Prisoverslag (Redigerbar)</label>
                  <div className="pricing-table-container">
                    <table className="pricing-table">
                      <thead>
                        <tr>
                          <th>Aktivitet</th>
                          <th>Estimert timer</th>
                          <th>Pris per time</th>
                          <th>Pris (NOK)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td contentEditable="true">Oppdagelse & Strategi</td>
                          <td contentEditable="true">10</td>
                          <td contentEditable="true">500</td>
                          <td contentEditable="true">5,000</td>
                        </tr>
                        {selectedInnovasjonslag.map((service) => (
                          <tr key={service.id}>
                            <td contentEditable="true">{service.name}</td>
                            <td contentEditable="true">{service.hours}</td>
                            <td contentEditable="true">500</td>
                            <td contentEditable="true">{(service.hours * 500).toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr>
                          <td contentEditable="true">Rapporteringsdashboard oppsett</td>
                          <td contentEditable="true">10</td>
                          <td contentEditable="true">500</td>
                          <td contentEditable="true">5,000</td>
                        </tr>
                        <tr>
                          <td contentEditable="true">Månedlig optimalisering & støtte (per måned)</td>
                          <td contentEditable="true">
                            <span className="editable-hours">10</span>
                            <button className="hours-adjust-btn" onClick={() => handleHoursAdjustment('monthly')}>▼</button>
                          </td>
                          <td contentEditable="true">500</td>
                          <td contentEditable="true">5,000</td>
                        </tr>
                        <tr className="total-row">
                          <td><strong>Totalt</strong></td>
                          <td><strong>{calculateTotalHours()} timer</strong></td>
                          <td></td>
                          <td><strong>{calculateTotalPrice().toLocaleString()} NOK</strong></td>
                        </tr>
                        <tr className="mva-row">
                          <td></td>
                          <td></td>
                          <td><strong>MVA (25%)</strong></td>
                          <td><strong>{Math.round(calculateTotalPrice() * 0.25).toLocaleString()} NOK</strong></td>
                        </tr>
                        <tr className="total-with-mva-row">
                          <td></td>
                          <td></td>
                          <td><strong>Totalt inkl. MVA</strong></td>
                          <td><strong>{(calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.25)).toLocaleString()} NOK</strong></td>
                        </tr>
                      </tbody>
                    </table>
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
            {customers.length === 0 ? (
              <div className="no-customers">
                <p>Ingen kunder ennå. Kunder vil automatisk legges til når du genererer forslag.</p>
              </div>
            ) : (
              <div className="customer-list">
                {customers.map((customer) => (
                  <div key={customer.id} className="customer-item">
                    <div className="customer-info">
                      <h4>{customer.company}</h4>
                      <p>{customer.email}</p>
                      {customer.contact && <p>Kontakt: {customer.contact}</p>}
                      <p>Status: {customer.status}</p>
                      <p>Forslag-ID: {customer.quoteId}</p>
                      <p>Generert: {customer.generatedAt}</p>
                      <p><strong>Deal størrelse: {customer.dealSize?.toLocaleString()} NOK</strong></p>
                    </div>
                    <div className="customer-actions">
                      <button className="action-btn">Se forslag</button>
                      <button className="action-btn">Oppdater status</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'quotes-tracking' && (
          <div className="quotes-tracking-section">
            <h2>Tilbud Tracking</h2>
            {quotes.length === 0 ? (
              <div className="no-quotes">
                <p>Ingen tilbud generert ennå.</p>
              </div>
            ) : (
              <div className="quotes-list">
                {quotes.map((quote) => (
                  <div key={quote.id} className="quote-item">
                    <div className="quote-info">
                      <h4>{quote.customer}</h4>
                      <p>E-post: {quote.email}</p>
                      {quote.contact && <p>Kontakt: {quote.contact}</p>}
                      <p>Status: <span className={`status ${quote.status === 'Forslag sendt' ? 'sent' : 'accepted'}`}>{quote.status}</span></p>
                      <p>Generert: {quote.generatedAt}</p>
                      <p><strong>Deal størrelse: {quote.dealSize.toLocaleString()} NOK</strong></p>
                      <p>Total (eks. MVA): {quote.totalPrice.toLocaleString()} NOK</p>
                      <p>MVA: {quote.mva.toLocaleString()} NOK</p>
                      <p>Total inkl. MVA: {quote.totalWithMva.toLocaleString()} NOK</p>
                    </div>
                    <div className="quote-actions">
                      <button className="action-btn">Se tilbud</button>
                      <button className="action-btn">Oppdater status</button>
                      <button 
                        className="action-btn" 
                        onClick={() => markQuoteAsAccepted(quote.id)}
                        disabled={quote.status === 'Akseptert'}
                      >
                        {quote.status === 'Akseptert' ? 'Akseptert ✓' : 'Merk som akseptert'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                <div className="total-row mva-row">
                  <span>MVA (25%):</span>
                  <span className="mva-price">{generatedQuote.mva.toLocaleString()} NOK</span>
                </div>
                <div className="total-row total-with-mva">
                  <span>Totalt inkl. MVA:</span>
                  <span className="total-with-mva-price">{generatedQuote.totalWithMva.toLocaleString()} NOK</span>
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
                        const shareUrl = `${window.location.origin}/quote?data=${shareData}`;
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
