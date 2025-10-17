import React from 'react';
import Navbar from './Navbar';
import CookieConsent from './CookieConsent';
import './Training.css';

const Training = () => {
  return (
    <div className="training-page">
      <Navbar onLoginClick={() => {}} />
      <CookieConsent />
      
      <section className="training-hero">
        <div className="container">
          <div className="hero-content">
            <h1>AI Competence Training for Teams</h1>
            <p className="hero-subtitle">Empower your employees to use AI responsibly and effectively</p>
            <p className="hero-description">
              AI isn't just for tech companies. It's a tool every team can use to work smarter. Our one-day AI Competence Training gives your employees the knowledge and confidence to use AI tools responsibly, efficiently, and in line with your company's goals and policies.
            </p>
            <p className="hero-description">
              Ready to upskill your team? Let's make AI part of your company's everyday workflow: safely, efficiently, and with purpose.
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

      {/* Learning Outcomes Section */}
      <section className="learning-outcomes">
        <div className="container">
          <h2>What Your Team Will Learn</h2>
          <div className="outcomes-grid">
            <div className="outcome-item">
              <h3>🎯 AI Fundamentals</h3>
              <p>Understand what AI is, how it works, and its current capabilities and limitations</p>
            </div>
            <div className="outcome-item">
              <h3>🛡️ Responsible AI Use</h3>
              <p>Learn best practices for using AI tools safely and ethically in your industry</p>
            </div>
            <div className="outcome-item">
              <h3>⚡ Productivity Boost</h3>
              <p>Discover practical AI tools that can streamline your daily work processes</p>
            </div>
            <div className="outcome-item">
              <h3>📊 Data Privacy</h3>
              <p>Understand data protection, privacy concerns, and how to use AI securely</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Agenda */}
      <section className="training-agenda">
        <div className="container">
          <h2>Training Agenda</h2>
          <div className="agenda-items">
            <div className="agenda-item">
              <h3>Morning Session (3 hours)</h3>
              <ul>
                <li>Introduction to AI and Machine Learning</li>
                <li>Current AI Tools and Their Applications</li>
                <li>Hands-on Practice with Popular AI Tools</li>
                <li>Break and Q&A</li>
              </ul>
            </div>
            <div className="agenda-item">
              <h3>Afternoon Session (3 hours)</h3>
              <ul>
                <li>AI Ethics and Responsible Use</li>
                <li>Data Privacy and Security Best Practices</li>
                <li>Implementing AI in Your Workflow</li>
                <li>Creating Your AI Action Plan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2>Training Options</h2>
          <div className="pricing-table">
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <h3>In-Person Workshop</h3>
              <div className="price">
                <span className="currency">NOK</span>
                <span className="amount">25,000</span>
                <span className="period">per session</span>
              </div>
              <ul className="features">
                <li>Up to 15 participants</li>
                <li>Full-day training (6 hours)</li>
                <li>Hands-on exercises</li>
                <li>Training materials included</li>
                <li>30-day follow-up support</li>
              </ul>
              <a href="#training-contact" className="cta-button primary">Book Training</a>
            </div>
            
            <div className="pricing-card">
              <h3>Virtual Training</h3>
              <div className="price">
                <span className="currency">NOK</span>
                <span className="amount">18,000</span>
                <span className="period">per session</span>
              </div>
              <ul className="features">
                <li>Up to 20 participants</li>
                <li>Half-day training (4 hours)</li>
                <li>Interactive online format</li>
                <li>Digital materials included</li>
                <li>14-day follow-up support</li>
              </ul>
              <a href="#training-contact" className="cta-button secondary">Book Training</a>
            </div>
          </div>
          
          <div className="add-on">
            <h3>Optional add-on</h3>
            <p><strong>Custom AI Policy Development:</strong> NOK 15,000</p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="whats-included">
        <div className="container">
          <h2>What's Included</h2>
          <div className="included-grid">
            <div className="included-item">
              <h3>📚 Training Materials</h3>
              <p>Comprehensive guides, checklists, and reference materials</p>
            </div>
            <div className="included-item">
              <h3>💻 Hands-on Practice</h3>
              <p>Real-world exercises using popular AI tools</p>
            </div>
            <div className="included-item">
              <h3>📞 Follow-up Support</h3>
              <p>Ongoing support to help implement what you've learned</p>
            </div>
            <div className="included-item">
              <h3>🎓 Certificate of Completion</h3>
              <p>Professional certificate for all participants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="training-contact" className="training-contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Ready to get started?</h2>
              <p>Contact us to discuss your AI training needs and get a customized proposal.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <h3>📅 Book a Training Session</h3>
                  <p>Fill out the form and we'll contact you within 24 hours</p>
                </div>
                
                <div className="contact-method">
                  <h3>📧 Email us directly</h3>
                  <p><a href="mailto:hello@n60.ai">hello@n60.ai</a></p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="training-form">
                <h3>Request Training Information</h3>
                
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                  />
                </div>
                
                <div className="form-row">
                  <select name="participants" required>
                    <option value="">Number of Participants</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-15">6-15 people</option>
                    <option value="16-30">16-30 people</option>
                    <option value="30+">30+ people</option>
                  </select>
                  
                  <select name="format" required>
                    <option value="">Preferred Format</option>
                    <option value="in-person">In-Person Workshop</option>
                    <option value="virtual">Virtual Training</option>
                    <option value="hybrid">Hybrid (In-Person + Virtual)</option>
                  </select>
                </div>
                
                <textarea
                  name="message"
                  placeholder="Tell us about your team's AI training needs, specific departments, or any questions you have..."
                  rows="4"
                  required
                />
                
                <button type="submit" className="submit-button">
                  Request Training Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;