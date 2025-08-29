import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === 'admin@n60.ai' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin@n60.ai / admin123 for demo.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    // In production, this would generate and send the proposal
    alert(`Proposal generated for ${proposalData.clientCompany}! This would create a professional PDF document.`);
  };

  const proposalTemplates = {
    'digital-growth': {
      title: 'Digital Growth & AI-Powered Lead Generation',
      description: 'Complete AI marketing solution with landing pages, salesbot, and CRM integration',
      basePrice: 50000,
      monthlySupport: 5000
    },
    'landing-pages': {
      title: 'Smart Landing Pages & Conversion Optimization',
      description: 'High-converting landing pages with AI-powered optimization',
      basePrice: 25000,
      monthlySupport: 3000
    },
    'ai-campaigns': {
      title: 'AI-Powered Marketing Campaigns',
      description: 'Automated lead generation campaigns with predictive analytics',
      basePrice: 35000,
      monthlySupport: 4000
    }
  };

  const currentTemplate = proposalTemplates[selectedTemplate];

  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>N60.ai Admin Portal</h1>
              <p>Professional proposal generation and customer management</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">E-post</label>
                <input
                  type="email"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                  placeholder="admin@n60.ai"
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
                  placeholder="admin123"
                />
              </div>
              
              {loginError && <div className="error-message">{loginError}</div>}
              
              <button type="submit" className="login-button">
                Logg inn
              </button>
            </form>
            
            <div className="demo-credentials">
              <p><strong>Demo credentials:</strong></p>
              <p>E-post: admin@n60.ai</p>
              <p>Passord: admin123</p>
            </div>
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
              <h3>Velg forslagsmal</h3>
              <div className="template-grid">
                {Object.entries(proposalTemplates).map(([key, template]) => (
                  <div 
                    key={key}
                    className={`template-card ${selectedTemplate === key ? 'selected' : ''}`}
                    onClick={() => setSelectedTemplate(key)}
                  >
                    <h4>{template.title}</h4>
                    <p>{template.description}</p>
                    <div className="template-price">
                      <span className="base-price">{template.basePrice.toLocaleString()} NOK</span>
                      <span className="monthly">+ {template.monthlySupport.toLocaleString()} NOK/mnd</span>
                    </div>
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default AdminLogin;
