
import React, { useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    consent: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.consent) {
      setError('Consent is required');
      return;
    }

    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/sendgrid', formData);
      setSuccess('Email sent successfully');
      console.log('Response:', response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Kunne ikke sende e-post');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Contact Form</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            I consent to the terms and conditions
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}