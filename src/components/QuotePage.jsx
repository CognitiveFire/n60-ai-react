import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './QuotePage.css';

const QuotePage = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Get quote data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        // Decode the base64 data
        const decodedData = atob(dataParam);
        const parsedQuote = JSON.parse(decodedData);
        console.log('Parsed quote data:', parsedQuote);
        setQuoteData(parsedQuote);
      } catch (err) {
        console.error('Error parsing quote data:', err);
        setError('Kunne ikke laste tilbudet. Vennligst sjekk lenken.');
      }
    } else {
      setError('Ingen tilbudsdata funnet.');
    }
    setLoading(false);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    // Here you could also send an email notification to the admin
    alert('Takk! Du har akseptert tilbudet. Vi tar kontakt snart.');
  };

  if (loading) {
    return (
      <div className="quote-page">
        <div className="loading">Laster tilbud...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quote-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!quoteData) {
    return (
      <div className="quote-page">
        <div className="error">Ingen tilbudsdata funnet.</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Tilbud - {quoteData?.clientCompany || 'N60.ai'}</title>
      </Helmet>
      <div className="quote-page">
        <div className="quote-container">
          <header className="quote-header">
            <div className="company-logo">
              <img src="https://i.ibb.co/vCcJ11RK/logo.png" alt="N60.ai Logo" />
              <h1>N60.ai</h1>
            </div>
            <div className="quote-info">
              <h2>Prisforslag</h2>
              <h1 className="customer-name">{quoteData.clientCompany}</h1>
              <p className="quote-id">Tilbuds-ID: {quoteData.id}</p>
              <p className="quote-date">Generert: {quoteData.generatedAt}</p>
            </div>
          </header>

          <div className="customer-section">
            <h3>Kundedetaljer</h3>
            <div className="customer-details">
              <div className="customer-row">
                <span className="label">Firma:</span>
                <span className="value">{quoteData.clientCompany}</span>
              </div>
              {quoteData.clientContact && (
                <div className="customer-row">
                  <span className="label">Kontaktperson:</span>
                  <span className="value">{quoteData.clientContact}</span>
                </div>
              )}
              <div className="customer-row">
                <span className="label">E-post:</span>
                <span className="value">{quoteData.clientEmail}</span>
              </div>
            </div>
          </div>

          <div className="services-section">
            <h3>Valgte Tjenester</h3>
            <div className="services-list">
              {quoteData.selectedServices.map((service, index) => (
                <div key={index} className="service-item">
                  <div className="service-header">
                    <h4>{service.name}</h4>
                    <span className="service-price">{service.price.toLocaleString()} NOK</span>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <div className="service-details">
                    <span>Estimert tid: {service.hours} timer</span>
                    <span>Pris per time: 500 NOK</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pricing-section">
            <h3>Detaljert Prisoverslag</h3>
            
            {/* Detailed Services Table */}
            <div className="pricing-table">
              <div className="table-header">
                <h4>Valgte Tjenester</h4>
              </div>
              {quoteData.selectedServices && quoteData.selectedServices.length > 0 ? (
                <table className="services-table">
                  <thead>
                    <tr>
                      <th>Tjeneste</th>
                      <th>Timer</th>
                      <th>Pris per time</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteData.selectedServices.map((service, index) => (
                      <tr key={index}>
                        <td>{service.name}</td>
                        <td>{service.hours}</td>
                        <td>500 NOK</td>
                        <td>{service.price.toLocaleString()} NOK</td>
                      </tr>
                    ))}
                    <tr className="table-subtotal">
                      <td colSpan="3"><strong>Subtotal (eks. MVA)</strong></td>
                      <td><strong>{quoteData.totalPrice.toLocaleString()} NOK</strong></td>
                    </tr>
                    <tr className="table-mva">
                      <td colSpan="3"><strong>MVA (25%)</strong></td>
                      <td><strong>{quoteData.mva.toLocaleString()} NOK</strong></td>
                    </tr>
                    <tr className="table-total">
                      <td colSpan="3"><strong>Totalt inkl. MVA</strong></td>
                      <td><strong>{quoteData.totalWithMva.toLocaleString()} NOK</strong></td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Ingen tjenester valgt</p>
              )}
            </div>
            
            {/* Summary */}
            <div className="pricing-summary">
              <div className="summary-row">
                <span>Total Pris (eks. MVA):</span>
                <span className="price">{quoteData.totalPrice.toLocaleString()} NOK</span>
              </div>
              <div className="summary-row mva">
                <span>MVA (25%):</span>
                <span className="price">{quoteData.mva.toLocaleString()} NOK</span>
              </div>
              <div className="summary-row total">
                <span>Totalt inkl. MVA:</span>
                <span className="price">{quoteData.totalWithMva.toLocaleString()} NOK</span>
              </div>
              <div className="summary-row">
                <span>Total Tid:</span>
                <span className="price">{quoteData.totalHours} timer</span>
              </div>
            </div>
          </div>

          {quoteData.customMessage && (
            <div className="custom-message-section">
              <h3>Personlig Melding</h3>
              <p>{quoteData.customMessage}</p>
            </div>
          )}

          <div className="acceptance-section">
            <h3>Aksepter Tilbudet</h3>
            <p>Klikk på knappen nedenfor for å akseptere dette tilbudet.</p>
            <button 
              className={`accept-button ${accepted ? 'accepted' : ''}`}
              onClick={handleAccept}
              disabled={accepted}
            >
              {accepted ? 'Tilbud Akseptert ✓' : 'Aksepter Tilbud'}
            </button>
          </div>

          <footer className="quote-footer">
            <p>Dette tilbudet er gyldig i 30 dager fra {quoteData.generatedAt}</p>
            <p>Kontakt oss på <a href="mailto:info@n60.ai">info@n60.ai</a> hvis du har spørsmål</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default QuotePage;
