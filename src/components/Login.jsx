import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [customerForm, setCustomerForm] = useState({
    customerName: '',
    customerEmail: '',
    quoteId: '',
    message: ''
  });
  const [loginError, setLoginError] = useState('');
  const [shareSuccess, setShareSuccess] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple login validation - in production, this would connect to your backend
    if (loginForm.email === 'admin@n60.ai' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin@n60.ai / admin123 for demo.');
    }
  };

  const handleShareQuote = (e) => {
    e.preventDefault();
    // In production, this would send the quote to the customer via email
    setShareSuccess(`Quote shared successfully with ${customerForm.customerName} (${customerForm.customerEmail})`);
    setCustomerForm({
      customerName: '',
      customerEmail: '',
      quoteId: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => setShareSuccess(''), 5000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>N60 Admin Login</h2>
            <p>Logg inn for å dele tilbud med kunder</p>
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
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>N60 Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logg ut
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="quote-sharing-section">
          <h3>Del tilbud med kunder</h3>
          <p>Send tilpassede AI-markedsføringstilbud direkte til dine kunder</p>
          
          <form onSubmit={handleShareQuote} className="customer-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Kundenavn *</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerForm.customerName}
                  onChange={(e) => setCustomerForm({...customerForm, customerName: e.target.value})}
                  required
                  placeholder="Firma AS"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="customerEmail">Kunde e-post *</label>
                <input
                  type="email"
                  id="customerEmail"
                  value={customerForm.customerEmail}
                  onChange={(e) => setCustomerForm({...customerForm, customerEmail: e.target.value})}
                  required
                  placeholder="kunde@firma.no"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quoteId">Tilbuds-ID</label>
                <input
                  type="text"
                  id="quoteId"
                  value={customerForm.quoteId}
                  onChange={(e) => setCustomerForm({...customerForm, quoteId: e.target.value})}
                  placeholder="Q-2024-001"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Personlig melding</label>
                <textarea
                  id="message"
                  value={customerForm.message}
                  onChange={(e) => setCustomerForm({...customerForm, message: e.target.value})}
                  placeholder="Skriv en personlig melding til kunden..."
                  rows="3"
                />
              </div>
            </div>
            
            {shareSuccess && <div className="success-message">{shareSuccess}</div>}
            
            <button type="submit" className="share-button">
              Del tilbud med kunde
            </button>
          </form>
        </div>
        
        <div className="recent-quotes">
          <h3>Nylige tilbud</h3>
          <div className="quote-list">
            <div className="quote-item">
              <div className="quote-info">
                <h4>AI for produktmarkedsføring</h4>
                <p>Kunde: TechCorp AS</p>
                <p>Status: Delt</p>
              </div>
              <div className="quote-actions">
                <button className="action-button">Se tilbud</button>
                <button className="action-button">Del igjen</button>
              </div>
            </div>
            
            <div className="quote-item">
              <div className="quote-info">
                <h4>Lead-generering kampanje</h4>
                <p>Kunde: StartupXYZ</p>
                <p>Status: Venter på svar</p>
              </div>
              <div className="quote-actions">
                <button className="action-button">Se tilbud</button>
                <button className="action-button">Oppdater</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
