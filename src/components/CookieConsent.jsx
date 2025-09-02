import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      updateGTMConsent(parsedConsent);
    }
  }, []);

  const updateGTMConsent = (consentData) => {
    // Update Google Tag Manager consent mode
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consentData.analytics ? 'granted' : 'denied',
        'ad_storage': consentData.marketing ? 'granted' : 'denied',
        'functionality_storage': consentData.preferences ? 'granted' : 'denied',
        'personalization_storage': consentData.preferences ? 'granted' : 'denied',
        'security_storage': 'granted' // Always granted for security
      });
    }

    // Also update dataLayer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_update',
        'consent_analytics': consentData.analytics,
        'consent_marketing': consentData.marketing,
        'consent_preferences': consentData.preferences
      });
    }
  };

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    updateGTMConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    updateGTMConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    updateGTMConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleConsentChange = (type) => {
    if (type === 'necessary') return; // Can't change necessary cookies
    
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        {!showSettings ? (
          // Main banner
          <div className="cookie-consent-main">
            <div className="cookie-consent-content">
              <div className="cookie-consent-header">
                <h3>🍪 Informasjonskapsler (Cookies)</h3>
              </div>
              <div className="cookie-consent-text">
                <p>
                  Vi bruker informasjonskapsler for å forbedre din opplevelse på vår nettside, 
                  analysere trafikk og tilby tilpassede funksjoner. Ved å klikke "Godta alle" 
                  samtykker du til bruk av alle informasjonskapsler.
                </p>
                <p>
                  Du kan tilpasse dine preferanser eller lese mer i vår{' '}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    personvernpolicy
                  </a>.
                </p>
              </div>
            </div>
            <div className="cookie-consent-actions">
              <button 
                className="cookie-btn cookie-btn-settings"
                onClick={() => setShowSettings(true)}
              >
                Tilpass
              </button>
              <button 
                className="cookie-btn cookie-btn-reject"
                onClick={handleRejectAll}
              >
                Avvis alle
              </button>
              <button 
                className="cookie-btn cookie-btn-accept"
                onClick={handleAcceptAll}
              >
                Godta alle
              </button>
            </div>
          </div>
        ) : (
          // Settings panel
          <div className="cookie-consent-settings">
            <div className="cookie-consent-header">
              <h3>🍪 Informasjonskapsel-innstillinger</h3>
              <p>Tilpass hvilke informasjonskapsler du vil tillate:</p>
            </div>
            
            <div className="cookie-settings-list">
              <div className="cookie-setting-item">
                <div className="cookie-setting-info">
                  <h4>Nødvendige informasjonskapsler</h4>
                  <p>Disse er nødvendige for at nettsiden skal fungere og kan ikke deaktiveres.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    readOnly
                  />
                  <span className="cookie-toggle-label">Alltid aktiv</span>
                </div>
              </div>

              <div className="cookie-setting-item">
                <div className="cookie-setting-info">
                  <h4>Analytiske informasjonskapsler</h4>
                  <p>Hjelper oss å forstå hvordan besøkende bruker nettsiden (Google Analytics).</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => handleConsentChange('analytics')}
                  />
                  <span className="cookie-toggle-label">
                    {consent.analytics ? 'Aktivert' : 'Deaktivert'}
                  </span>
                </div>
              </div>

              <div className="cookie-setting-item">
                <div className="cookie-setting-info">
                  <h4>Markedsførings-informasjonskapsler</h4>
                  <p>Brukes til å vise relevante annonser og måle effektiviteten av kampanjer.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={() => handleConsentChange('marketing')}
                  />
                  <span className="cookie-toggle-label">
                    {consent.marketing ? 'Aktivert' : 'Deaktivert'}
                  </span>
                </div>
              </div>

              <div className="cookie-setting-item">
                <div className="cookie-setting-info">
                  <h4>Preferanse-informasjonskapsler</h4>
                  <p>Lagrer dine preferanser for å tilpasse innholdet til deg.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={() => handleConsentChange('preferences')}
                  />
                  <span className="cookie-toggle-label">
                    {consent.preferences ? 'Aktivert' : 'Deaktivert'}
                  </span>
                </div>
              </div>
            </div>

            <div className="cookie-consent-actions">
              <button 
                className="cookie-btn cookie-btn-back"
                onClick={() => setShowSettings(false)}
              >
                Tilbake
              </button>
              <button 
                className="cookie-btn cookie-btn-save"
                onClick={handleSaveSettings}
              >
                Lagre innstillinger
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
