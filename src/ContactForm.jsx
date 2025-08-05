
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    console.log('ContactForm formStatus updated:', formStatus);
  }, [formStatus]);

  const handleFormSubmit = async (event) => {
    console.log('ContactForm: Form submitted, starting handleFormSubmit...');
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };
    console.log('ContactForm: Submitting form data:', data);

    try {
      console.log('ContactForm: Sending axios request to production server...');
      const response = await axios.post('http://ip-172-31-22-34:5000/sendgrid', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('ContactForm: Axios response received:', response);
      const result = response.data;
      console.log('ContactForm: Axios result:', result);

      if (response.status === 200) {
        console.log('ContactForm: Setting form status to success...');
        setFormStatus({ type: 'success', message: 'E-post sendt vellykket!' });
        event.target.reset();
      } else {
        console.log('ContactForm: Setting form status to error:', result.error);
        setFormStatus({ type: 'error', message: result.error || 'Kunne ikke sende e-post.' });
      }
    } catch (error) {
      console.log('ContactForm: Axios error:', error.message);
      console.log('ContactForm: Full error object:', error);
      if (error.response) {
        console.log('ContactForm: Error response:', error.response.data);
        setFormStatus({ type: 'error', message: error.response.data.error || 'Kunne ikke sende e-post.' });
      } else {
        setFormStatus({ type: 'error', message: 'En feil oppstod under sending av e-post: ' + error.message });
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={(e) => {
      console.log('ContactForm: onSubmit triggered on form element');
      handleFormSubmit(e);
    }}>
      <input type="text" name="name" placeholder="Navn" required />
      <input type="email" name="email" placeholder="E-post" required />
      <input type="text" name="company" placeholder="Bedrift" required />
      <textarea name="message" placeholder="Melding" required></textarea>
      <button type="submit">Send</button>
      {formStatus && (
        <p className={formStatus.type === 'success' ? 'success-message' : 'error-message'}>
          {formStatus.message}
        </p>
      )}
    </form>
  );
}

export default ContactForm;