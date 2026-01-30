import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function SimpleContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [language, setLanguage] = useState('no'); // 'no' for Norwegian, 'en' for English
  const navigate = useNavigate();

  const texts = {
    no: {
      title: 'Ta kontakt',
      subtitle: 'Fortell oss om dine AI-behov, så hjelper vi deg i gang.',
      name: 'Navn *',
      email: 'E-post *',
      company: 'Bedrift *',
      interest: 'Jeg er interessert i... *',
      interestPlaceholder: 'Velg ditt interesseområde',
      message: 'Fortell oss mer om dine behov',
      messagePlaceholder: 'Hvilke utfordringer står du overfor? Hva vil du oppnå med AI?',
      submit: 'Send melding',
      sending: 'Sender...',
      success: 'Melding sendt!',
      successSubtitle: 'Takk for din interesse. Vi kommer tilbake til deg innen 24 timer.',
      redirecting: 'Omdirigerer til hjemmeside om 3 sekunder...',
      close: 'Lukk',
      interests: {
        aiTraining: 'AI-opplæring og kurs',
        aiConsulting: 'AI-strategi og konsulenttjenester',
        aiImplementation: 'AI-implementering',
        dataSecurity: 'Datasikkerhet og GDPR',
        chatbots: 'Chatbots og stemmeassistenter',
        automation: 'Prosessautomatisering',
        other: 'Annet'
      }
    },
    en: {
      title: 'Get in Touch',
      subtitle: 'Tell us about your AI needs and we\'ll help you get started.',
      name: 'Name *',
      email: 'Email *',
      company: 'Company *',
      interest: 'I\'m interested in... *',
      interestPlaceholder: 'Select your area of interest',
      message: 'Tell us more about your needs',
      messagePlaceholder: 'What challenges are you facing? What would you like to achieve with AI?',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Message Sent Successfully!',
      successSubtitle: 'Thank you for your interest. We\'ll get back to you within 24 hours.',
      redirecting: 'Redirecting to homepage in 3 seconds...',
      close: 'Close',
      interests: {
        aiTraining: 'AI Training & Workshops',
        aiConsulting: 'AI Strategy & Consulting',
        aiImplementation: 'AI Implementation',
        dataSecurity: 'Data Security & GDPR',
        chatbots: 'Chatbots & Voice Assistants',
        automation: 'Process Automation',
        other: 'Other'
      }
    }
  };

  const t = texts[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        // Redirect to homepage after 3 seconds
        setTimeout(() => {
          navigate('/');
    }, 3000);
      } else {
        const result = await response.json();
        alert('Error: ' + (result.error || 'Please try again.'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}>
        <div style={{
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>✅</div>
          <h3 style={{
            color: '#155724',
            marginBottom: '15px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            {t.success}
          </h3>
          <p style={{
            color: '#155724',
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            {t.successSubtitle}
          </p>
          <p style={{
            color: '#6c757d',
            fontSize: '14px'
          }}>
            {t.redirecting}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />
      
      <div style={{
        padding: '60px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          {/* Close button */}
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d',
              padding: '8px',
              borderRadius: '4px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>

          {/* Language switcher */}
          <div style={{
            textAlign: 'left',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setLanguage(language === 'no' ? 'en' : 'no')}
              style={{
                background: language === 'no' ? '#2c3548' : '#e9ecef',
                color: language === 'no' ? 'white' : '#2c3548',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {language === 'no' ? 'English' : 'Norsk'}
            </button>
          </div>

          <h2 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#000',
            fontSize: '32px',
            fontWeight: '600'
          }}>
            {t.title}
          </h2>
          
          <p style={{
            textAlign: 'center',
            marginBottom: '40px',
            color: '#6c757d',
            fontSize: '18px',
            lineHeight: '1.6'
          }}>
            {t.subtitle}
          </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              {t.name}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2c3548'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              {t.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2c3548'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              {t.company}
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2c3548'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              {t.interest}
            </label>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                background: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2c3548'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            >
              <option value="">{t.interestPlaceholder}</option>
              <option value="ai-training">{t.interests.aiTraining}</option>
              <option value="ai-consulting">{t.interests.aiConsulting}</option>
              <option value="ai-implementation">{t.interests.aiImplementation}</option>
              <option value="data-security">{t.interests.dataSecurity}</option>
              <option value="chatbots">{t.interests.chatbots}</option>
              <option value="automation">{t.interests.automation}</option>
              <option value="other">{t.interests.other}</option>
            </select>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              {t.message}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder={t.messagePlaceholder}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2c3548'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              background: isSubmitting ? '#6c757d' : '#2c3548',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {isSubmitting ? t.sending : t.submit}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default SimpleContactForm;