import React, { useState } from 'react';
import Navbar from './Navbar';
import CookieConsent from './CookieConsent';
import './Training.css';

const Training = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    participants: '',
    format: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/training-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: `Takk for din henvendelse, ${formData.name}! Vi tar kontakt innen 24 timer for å planlegge AI-kompetanseopplæringen.`
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          participants: '',
          format: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setFormStatus({
        type: 'error',
        message: 'Det oppstod en feil ved sending av meldingen. Vennligst prøv igjen eller send oss en e-post direkte.'
      });
    }
  };

  return (
    <div className="training-page">
      <Navbar onLoginClick={() => {}} />
      {/* Hero Section */}
      <section className="training-hero">
        <div className="container">
          <div className="hero-content">
            <h1>AI Competence Training for Teams</h1>
            <p className="hero-subtitle">Empower your employees to use AI responsibly and effectively</p>
            <p className="hero-description">
              AI isn't just for tech companies. It's a tool every team can use to work smarter. Our one-day AI Competence Training gives your employees the knowledge and confidence to use AI tools responsibly, efficiently, and in line with your company's goals and policies.
            </p>
            <p className="hero-description">
              We combine practical exercises with clear frameworks for ethical and productive AI use. The course is modular and can be tailored for different departments: marketing, operations, HR, finance, and sales.
            </p>
            <div className="hero-cta">
              <a href="#training-contact" className="cta-button primary">
                Book Your Training Session
              </a>
              <a href="#pricing" className="cta-button secondary">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="learning-outcomes">
        <div className="container">
          <h2>By the end of the day, your team will:</h2>
          <div className="outcomes-grid">
            <div className="outcome-item">
              <div className="outcome-icon">✅</div>
              <p>Understand how to use AI tools safely and effectively</p>
            </div>
            <div className="outcome-item">
              <div className="outcome-icon">✅</div>
              <p>Apply AI to real daily tasks within their role</p>
            </div>
            <div className="outcome-item">
              <div className="outcome-icon">✅</div>
              <p>Learn company-specific do's and don'ts for responsible AI use</p>
            </div>
            <div className="outcome-item">
              <div className="outcome-icon">✅</div>
              <p>Receive a Certificate of AI Competency</p>
            </div>
            <div className="outcome-item">
              <div className="outcome-icon">✅</div>
              <p>Sign a Company AI Usage Policy promoting accountability and trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Agenda Section */}
      <section className="course-agenda">
        <div className="container">
          <h2>Course Agenda</h2>
          
          <div className="agenda-section">
            <h3>Morning (09:00 – 12:00)</h3>
            <div className="agenda-items">
              <div className="agenda-item">
                <div className="agenda-time">09:00-09:30</div>
                <div className="agenda-content">
                  <h4>Introduction: The AI landscape and business impact</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">09:30-10:15</div>
                <div className="agenda-content">
                  <h4>Responsible AI: Ethics, GDPR, and safe data use</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">10:15-11:15</div>
                <div className="agenda-content">
                  <h4>Hands-on tools: Practical use of ChatGPT, automation, and AI content tools</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">11:15-11:30</div>
                <div className="agenda-content">
                  <h4>Break</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">11:30-12:30</div>
                <div className="agenda-content">
                  <h4>Department focus (Part 1): Tailored examples and exercises</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="agenda-section">
            <h3>Afternoon (13:00 – 16:00)</h3>
            <div className="agenda-items">
              <div className="agenda-item">
                <div className="agenda-time">13:00-14:00</div>
                <div className="agenda-content">
                  <h4>Department focus (Part 2): Continued practical training</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">14:00-15:00</div>
                <div className="agenda-content">
                  <h4>AI Policy Workshop: Co-create and sign your company's AI usage policy</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">15:00-15:45</div>
                <div className="agenda-content">
                  <h4>Assessment & Certification: Final Q&A and certificate ceremony</h4>
                </div>
              </div>
              <div className="agenda-item">
                <div className="agenda-time">15:45-16:00</div>
                <div className="agenda-content">
                  <h4>Wrap-up</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2>Delivery Options & Pricing</h2>
          <div className="pricing-table">
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <h3>In-Person Workshop</h3>
              <div className="price">25,000 NOK</div>
              <div className="duration">1 Day</div>
              <div className="participants">Up to 20</div>
              <p className="description">Delivered on-site, includes travel within Norway</p>
              <ul className="features">
                <li>✅ Tailored modules per department</li>
                <li>✅ AI Usage Policy template</li>
                <li>✅ Certificate of AI Competency</li>
                <li>✅ Practical tools and prompt library</li>
                <li>✅ Summary report and recommendations</li>
              </ul>
            </div>
            
            <div className="pricing-card">
              <h3>Digital Workshop</h3>
              <div className="price">18,000 NOK</div>
              <div className="duration">1 Day</div>
              <div className="participants">Up to 15</div>
              <p className="description">Live online, includes templates and digital certificate</p>
              <ul className="features">
                <li>✅ Tailored modules per department</li>
                <li>✅ AI Usage Policy template</li>
                <li>✅ Certificate of AI Competency</li>
                <li>✅ Practical tools and prompt library</li>
                <li>✅ Summary report and recommendations</li>
              </ul>
            </div>
          </div>
          
          <div className="add-on">
            <h3>Optional add-on</h3>
            <p>Management follow-up session (1 hr) – <strong>2,500 NOK</strong></p>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="whats-included">
        <div className="container">
          <h2>What's Included</h2>
          <div className="included-grid">
            <div className="included-item">
              <div className="included-icon">🎯</div>
              <h3>Tailored modules per department</h3>
              <p>Customized training content for Marketing, Sales, HR, Finance, and Operations teams</p>
            </div>
            <div className="included-item">
              <div className="included-icon">📋</div>
              <h3>AI Usage Policy template</h3>
              <p>Company-specific policy framework that protects your business and promotes responsible innovation</p>
            </div>
            <div className="included-item">
              <div className="included-icon">🏆</div>
              <h3>Certificate of AI Competency</h3>
              <p>Official certification for all participants, demonstrating their AI competence</p>
            </div>
            <div className="included-item">
              <div className="included-icon">🛠️</div>
              <h3>Practical tools and prompt library</h3>
              <p>Ready-to-use prompts, templates, and tools for immediate implementation</p>
            </div>
            <div className="included-item">
              <div className="included-icon">📊</div>
              <h3>Summary report and recommendations</h3>
              <p>Detailed assessment and actionable recommendations for continued AI adoption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="training-contact" className="training-contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Ready to upskill your team?</h2>
              <p>Let's make AI part of your company's everyday workflow: safely, efficiently, and with purpose.</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📅</div>
                  <h3>Book a Training Session</h3>
                  <p>Fill out the form and we'll contact you within 24 hours</p>
                </div>
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <h3>Email us directly</h3>
                  <p><a href="mailto:hello@n60.ai">hello@n60.ai</a></p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="training-form" onSubmit={handleSubmit}>
                <h3>Request Training Information</h3>
                
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-row">
                  <select
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Number of Participants</option>
                    <option value="1-5">1-5 participants</option>
                    <option value="6-10">6-10 participants</option>
                    <option value="11-15">11-15 participants</option>
                    <option value="16-20">16-20 participants</option>
                    <option value="20+">20+ participants</option>
                  </select>
                  
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Preferred Format</option>
                    <option value="in-person">In-Person Workshop (25,000 NOK)</option>
                    <option value="digital">Digital Workshop (18,000 NOK)</option>
                  </select>
                </div>
                
                <textarea
                  name="message"
                  placeholder="Tell us about your team's AI training needs, specific departments, or any questions you have..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                />
                
                <button type="submit" className="submit-button">
                  Request Training Information
                </button>
                
                {formStatus && (
                  <div className={`form-status ${formStatus.type}`}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} N60</p>
          <p className="made-with-love">Made in Bergen, Norway, with love ❤️</p>
        </div>
      </footer>
      
      <CookieConsent />
    </div>
  );
};

export default Training;
