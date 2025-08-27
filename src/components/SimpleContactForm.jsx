import React, { useState } from 'react';
import './SimpleContactForm.css';

const SimpleContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
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
  };

  if (isSubmitted) {
    return (
      <div className="simple-contact-success">
        <div className="success-content">
          <h3>Takk for din henvendelse!</h3>
          <p>Vi vil ta kontakt med deg snart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-contact-form-container">
      <div className="simple-contact-form">
        <h2>Kontakt oss</h2>
        <p>Har du et spørsmål? Send oss en melding og vi svarer deg raskt.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Navn *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ditt navn"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-post *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="din.epost@bedrift.no"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Bedrift</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Bedriftsnavn"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Melding *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Fortell oss om ditt prosjekt eller spørsmål..."
            />
          </div>

          <button type="submit" className="submit-button">
            Send melding
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleContactForm;
