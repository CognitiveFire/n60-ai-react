
// Contact.jsx
import React from 'react';
// CSS moved to App.css

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Kontakt Oss</h2>
      <form className="contact-form">
        <input type="text" name="name" placeholder="Navn" required />
        <input type="email" name="email" placeholder="E-post" required />
        <input type="text" name="company" placeholder="Bedrift" required />
        <textarea name="message" placeholder="Melding" required></textarea>
        <button type="submit">Send Melding</button>
      </form>
    </section>
  );
};

export default Contact;