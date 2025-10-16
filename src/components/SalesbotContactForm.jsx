import React, { useState } from 'react';

const SalesbotContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after submission
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            message: ''
          });
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setError('Det oppstod en feil ved sending av meldingen. Vennligst prøv igjen.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ color: '#059669', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
          Takk for din henvendelse!
        </h3>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Vi vil ta kontakt med deg snart.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', paddingBottom: '2rem' }}>
      <h2 style={{ 
        color: '#1f2937', 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        Kontakt oss
      </h2>
      <p style={{ 
        color: '#6b7280', 
        fontSize: '0.9rem', 
        textAlign: 'center',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        Har du et spørsmål? Send oss en melding og vi svarer deg raskt.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#374151', 
            fontWeight: '600', 
            marginBottom: '0.5rem', 
            fontSize: '0.95rem' 
          }}>
            Navn *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ditt navn"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: 'white',
              color: '#1f2937',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#374151', 
            fontWeight: '600', 
            marginBottom: '0.5rem', 
            fontSize: '0.95rem' 
          }}>
            E-post *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="din.epost@bedrift.no"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: 'white',
              color: '#1f2937',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#374151', 
            fontWeight: '600', 
            marginBottom: '0.5rem', 
            fontSize: '0.95rem' 
          }}>
            Bedrift
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Bedriftsnavn"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: 'white',
              color: '#1f2937',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            color: '#374151', 
            fontWeight: '600', 
            marginBottom: '0.5rem', 
            fontSize: '0.95rem' 
          }}>
            Melding *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Fortell oss om ditt prosjekt eller spørsmål..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: 'white',
              color: '#1f2937',
              resize: 'vertical',
              minHeight: '80px',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            background: isLoading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '1rem',
            boxSizing: 'border-box'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.background = '#2563eb';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.target.style.background = '#3b82f6';
            }
          }}
        >
          {isLoading ? 'Sender...' : 'Send melding'}
        </button>
      </form>
    </div>
  );
};

export default SalesbotContactForm;
