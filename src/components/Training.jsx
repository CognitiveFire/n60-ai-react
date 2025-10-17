import React from 'react';
import Navbar from './Navbar';
import CookieConsent from './CookieConsent';

const Training = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1f2937' }}>
      <Navbar onLoginClick={() => {}} />
      <CookieConsent />
      
      <div style={{ padding: '120px 20px 80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#0f1c30' }}>
          AI Competence Training for Teams
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#6b7280' }}>
          Empower your employees to use AI responsibly and effectively
        </p>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          AI isn't just for tech companies. It's a tool every team can use to work smarter. Our one-day AI Competence Training gives your employees the knowledge and confidence to use AI tools responsibly, efficiently, and in line with your company's goals and policies.
        </p>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
          Ready to upskill your team? Let's make AI part of your company's everyday workflow: safely, efficiently, and with purpose.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="mailto:hello@n60.ai?subject=AI Training Inquiry" 
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            📅 Book Training Session
          </a>
          <a 
            href="mailto:hello@n60.ai" 
            style={{
              background: 'transparent',
              color: '#3b82f6',
              border: '2px solid #3b82f6',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            💬 Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Training;