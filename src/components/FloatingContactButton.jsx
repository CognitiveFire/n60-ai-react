import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './FloatingContactButton.css';

const FloatingContactButton = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="floating-contact-button"
        onClick={() => setIsOpen(true)}
        aria-label={t.contact.title}
      >
        <span className="floating-button-icon">💬</span>
        <span className="floating-button-text">{t.contact.title}</span>
      </button>

      {isOpen && (
        <div className="contact-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="contact-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="contact-modal-header">
              <h2>{t.contact.title}</h2>
              <p>{t.contact.description}</p>
            </div>

            {submitStatus === 'success' ? (
              <div className="contact-modal-success">
                <div className="success-icon">✅</div>
                <h3>{t.contact.success}</h3>
                <p>{t.contact.successMessage}</p>
              </div>
            ) : (
              <form className="contact-modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t.contact.name} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.contact.email} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">{t.contact.company} *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.company}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.contact.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder={t.contact.message}
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="form-error">
                    {t.contact.error}
                  </div>
                )}

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactButton;

