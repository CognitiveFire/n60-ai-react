import React from 'react';
import Navbar from './Navbar';
import CookieConsent from './CookieConsent';
import './TrainingPage.css';

const Training = () => {
  return (
    <div className="training-page">
      <Navbar onLoginClick={() => {}} />
      <CookieConsent />

      {/* Hero Section */}
      <div className="training-hero">
        <div className="training-hero-grid">
          <div className="training-hero-content">
            <h1>AI Competence Training for Teams</h1>
            <p className="training-hero-subhead">
              One-day, modular workshop to use AI responsibly and effectively.
            </p>
            <div className="training-hero-bullets">
              <div className="training-hero-bullet">
                <span>✓</span>
                <span>Responsible</span>
              </div>
              <div className="training-hero-bullet">
                <span>✓</span>
                <span>Practical</span>
              </div>
              <div className="training-hero-bullet">
                <span>✓</span>
                <span>GDPR-aware</span>
              </div>
            </div>
            <div className="training-hero-ctas">
              <a href="https://calendly.com/n60/new-meeting" target="_blank" rel="noopener noreferrer" className="training-btn training-btn-outline">
                📅 Book a Call
              </a>
              <button 
                className="training-btn training-btn-outline" 
                onClick={() => {
                  // Create a temporary PDF viewer modal
                  const modal = document.createElement('div');
                  modal.style.cssText = `
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.8); z-index: 9999; display: flex;
                    align-items: center; justify-content: center; padding: 20px;
                  `;
                  modal.innerHTML = `
                    <div style="background: white; border-radius: 8px; width: 90%; height: 90%; max-width: 1200px; max-height: 800px; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; background: #f7f7f9; border-radius: 8px 8px 0 0;">
                        <h3 style="margin: 0; color: #2c3548; font-size: 18px; font-weight: 600;">AI Training Agenda</h3>
                        <div style="display: flex; gap: 0.5rem;">
                          <button onclick="window.open('/n60 Logo/Smarter work. Safer data. Stronger teams.pdf', '_blank')" style="padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; background: #2c3548; color: white;">📥 Download</button>
                          <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; background: #f2867d; color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">×</button>
                        </div>
                      </div>
                      <div style="flex: 1; padding: 0; border-radius: 0 0 8px 8px;">
                        <iframe src="/n60 Logo/Smarter work. Safer data. Stronger teams.pdf" style="border: none; border-radius: 0 0 8px 8px; width: 100%; height: 100%;"></iframe>
                      </div>
                    </div>
                  `;
                  modal.onclick = (e) => {
                    if (e.target === modal) modal.remove();
                  };
                  document.body.appendChild(modal);
                }}
              >
                📄 Download Agenda
              </button>
            </div>
          </div>
          <div className="training-hero-visual">
            <img 
              src="https://i.ibb.co/T9v8W2x/Chat-GPT-Image-Oct-18-2025-10-45-18-AM.png" 
              alt="AI Training Banner" 
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="training-container">
        <div className="training-grid">
          
          {/* Main Content */}
          <div className="training-main">
            
            {/* Why It Matters Section */}
            <div className="training-section">
              <h2 className="training-h2">Why It Matters</h2>
              <p className="training-body">
                AI adoption is already happening inside most companies — often without oversight. Studies show that over 60% of employees are using AI tools in some form, yet only 14% of organisations have an AI policy in place. This creates both opportunity and risk.
              </p>
              <div className="training-stats-grid">
                <div className="training-stat-card">
                  <div className="training-stat-number">71%</div>
                  <div className="training-stat-text">of workers use AI tools without company approval</div>
                </div>
                <div className="training-stat-card">
                  <div className="training-stat-number">80%</div>
                  <div className="training-stat-text">of AI tools used by employees are unmanaged by IT or security</div>
                </div>
                <div className="training-stat-card">
                  <div className="training-stat-number">46%</div>
                  <div className="training-stat-text">admit to pasting internal documents into public AI tools</div>
                </div>
                <div className="training-stat-card">
                  <div className="training-stat-number">32%</div>
                  <div className="training-stat-text">hide AI use from their employer</div>
                </div>
                <div className="training-stat-card">
                  <div className="training-stat-number">47%</div>
                  <div className="training-stat-text">have used AI in ways that could be considered inappropriate</div>
                </div>
                <div className="training-stat-card">
                  <div className="training-stat-number">14%</div>
                  <div className="training-stat-text">of organisations have an AI usage policy</div>
                </div>
              </div>
            </div>

            {/* What You Get Section */}
            <div className="training-section">
              <h2 className="training-h2">What You Get</h2>
              <div className="training-features-grid">
                <div className="training-feature-card">
                  <div className="training-feature-icon">🌐</div>
                  <h3 className="training-h3">Language & Materials</h3>
                  <p>Delivered in English; materials, AI policy, and test available in English or Norwegian.</p>
                </div>
                <div className="training-feature-card">
                  <div className="training-feature-icon">🎯</div>
                  <h3 className="training-h3">Department Tailoring</h3>
                  <p>Tailored modules per department (Marketing, Sales, HR, Finance, Ops).</p>
                </div>
                <div className="training-feature-card">
                  <div className="training-feature-icon">🏆</div>
                  <h3 className="training-h3">Certificate</h3>
                  <p>Certificate of AI Competency for each participant.</p>
                </div>
                <div className="training-feature-card">
                  <div className="training-feature-icon">📋</div>
                  <h3 className="training-h3">AI Usage Policy</h3>
                  <p>Company AI Usage Policy template (co-created + signed).</p>
                </div>
                <div className="training-feature-card">
                  <div className="training-feature-icon">📚</div>
                  <h3 className="training-h3">Templates</h3>
                  <p>Prompt library & practical workflow templates.</p>
                </div>
                <div className="training-feature-card">
                  <div className="training-feature-icon">📊</div>
                  <h3 className="training-h3">Summary Report</h3>
                  <p>Optional summary report + next steps.</p>
                </div>
              </div>
            </div>

            {/* Agenda Section */}
            <div className="training-section">
              <h2 className="training-h2">Agenda (1-day)</h2>
              <ul className="training-agenda-list">
                <li className="training-agenda-item">
                  <div className="training-agenda-time">09:00–09:30</div>
                  <div className="training-agenda-content">The AI landscape (SME impact)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">09:30–10:15</div>
                  <div className="training-agenda-content">Responsible AI (ethics, GDPR, safe data)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">10:15–11:15</div>
                  <div className="training-agenda-content">Hands-on tools (ChatGPT, automation, image)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">11:15–12:00</div>
                  <div className="training-agenda-content">Department Focus (Part 1)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">13:00–14:00</div>
                  <div className="training-agenda-content">Department Focus (Part 2)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">14:00–15:00</div>
                  <div className="training-agenda-content">AI Policy Workshop (co-create & adopt)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">15:00–15:45</div>
                  <div className="training-agenda-content">Assessment & Certification (N60 Training Platform)</div>
                </li>
                <li className="training-agenda-item">
                  <div className="training-agenda-time">15:45–16:00</div>
                  <div className="training-agenda-content">Wrap-up & recommendations</div>
                </li>
              </ul>
            </div>

            {/* Pricing Section */}
            <div className="training-section">
              <h2 className="training-h2">Pricing & Formats</h2>
              <div className="training-pricing-grid">
                <div className="training-pricing-card">
                  <h3 className="training-pricing-title">In-Person Workshop</h3>
                  <div className="training-pricing-price">25,000 NOK</div>
                  <ul className="training-pricing-features">
                    <li>1 day · up to 20 participants</li>
                    <li>On-site (travel within Norway included)</li>
                    <li>Materials, certificate, policy template</li>
                  </ul>
                </div>
                <div className="training-pricing-card featured">
                  <h3 className="training-pricing-title">Digital Workshop</h3>
                  <div className="training-pricing-price">18,000 NOK</div>
                  <ul className="training-pricing-features">
                    <li>1 day · up to 15 participants</li>
                    <li>Live online + digital certificate & templates</li>
                    <li>Same materials and certification</li>
                  </ul>
                </div>
              </div>
              <p className="training-small" style={{ textAlign: 'center' }}>
                Add-on: Management follow-up (1 hr) – 2,500 NOK
              </p>
            </div>

            {/* Certificate Section */}
            <div className="training-section">
              <h2 className="training-h2">Certificate + AI Usage Policy</h2>
              <div className="training-certificate-grid">
                <div className="training-certificate-mock">
                  <h3>Certificate of AI Competency</h3>
                  <p>N60.ai Training Platform</p>
                  <div style={{ margin: '2rem 0', padding: '2rem', border: '2px dashed #e2e8f0', borderRadius: '8px' }}>
                    <p>Certificate Preview</p>
                  </div>
                </div>
                <div>
                  <p className="training-body">
                    Participants complete a short competency test on the N60 Training Platform (English or Norwegian). On passing, they receive the Certificate of AI Competency; team signs the Company AI Usage Policy.
                  </p>
                </div>
              </div>
            </div>


            {/* FAQ Section */}
            <div className="training-section">
              <h2 className="training-h2">FAQ</h2>
              <div className="training-faq-item">
                <div className="training-faq-question">
                  <span>Do we need prior AI experience?</span>
                  <span>+</span>
                </div>
                <div className="training-faq-answer">
                  No prior experience required. The training is designed for all skill levels.
                </div>
              </div>
              <div className="training-faq-item">
                <div className="training-faq-question">
                  <span>How do you tailor by department?</span>
                  <span>+</span>
                </div>
                <div className="training-faq-answer">
                  We customize examples, exercises, and use cases specific to your department's needs and workflows.
                </div>
              </div>
              <div className="training-faq-item">
                <div className="training-faq-question">
                  <span>Can we choose Norwegian for materials/policy/test?</span>
                  <span>+</span>
                </div>
                <div className="training-faq-answer">
                  Yes. All materials, the AI policy, and competency test are available in Norwegian upon request.
                </div>
              </div>
              <div className="training-faq-item">
                <div className="training-faq-question">
                  <span>How is data handled during exercises?</span>
                  <span>+</span>
                </div>
                <div className="training-faq-answer">
                  We use anonymized examples and ensure no sensitive company data is used in AI tools during training.
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="training-section-bg">
              <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
                <h2 className="training-h2">Ready to upskill your team?</h2>
                <p className="training-body" style={{ marginBottom: '2rem' }}>
                  Get in touch to book your training or request a custom quote
                </p>
                
                <form className="training-form">
                  <div className="training-form-group">
                    <label htmlFor="name" className="training-form-label">
                      Full Name <span className="training-form-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="training-form-input"
                    />
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="email" className="training-form-label">
                      Email Address <span className="training-form-required">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="training-form-input"
                    />
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="company" className="training-form-label">
                      Company Name <span className="training-form-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      required 
                      className="training-form-input"
                    />
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="participants" className="training-form-label">
                      Number of Participants
                    </label>
                    <select 
                      id="participants" 
                      name="participants" 
                      className="training-form-select"
                    >
                      <option value="">Select number of participants</option>
                      <option value="1-5">1-5 participants</option>
                      <option value="6-10">6-10 participants</option>
                      <option value="11-15">11-15 participants</option>
                      <option value="16-20">16-20 participants</option>
                      <option value="20+">20+ participants</option>
                    </select>
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="format" className="training-form-label">
                      Preferred Format
                    </label>
                    <select 
                      id="format" 
                      name="format" 
                      className="training-form-select"
                    >
                      <option value="">Select format</option>
                      <option value="in-person">In-Person Workshop (25,000 NOK)</option>
                      <option value="digital">Digital Workshop (18,000 NOK)</option>
                      <option value="not-sure">Not sure - need advice</option>
                    </select>
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="department" className="training-form-label">
                      Main Department Focus
                    </label>
                    <select 
                      id="department" 
                      name="department" 
                      className="training-form-select"
                    >
                      <option value="">Select department</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="hr">Human Resources</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                      <option value="mixed">Mixed departments</option>
                    </select>
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="language" className="training-form-label">
                      Preferred Language for Materials
                    </label>
                    <select 
                      id="language" 
                      name="language" 
                      className="training-form-select"
                    >
                      <option value="english">English</option>
                      <option value="norwegian">Norwegian</option>
                      <option value="both">Both English and Norwegian</option>
                    </select>
                  </div>
                  
                  <div className="training-form-group">
                    <label htmlFor="message" className="training-form-label">
                      Additional Information
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      placeholder="Tell us about your specific needs, preferred dates, or any questions you have..."
                      className="training-form-textarea"
                    />
                  </div>
                  
                  <div className="training-form-buttons">
                    <button 
                      type="submit" 
                      className="training-btn training-btn-primary training-form-submit"
                      onClick={async (e) => {
                        e.preventDefault();
                        const form = e.target.closest('form');
                        const formData = new FormData(form);
                        const data = Object.fromEntries(formData.entries());
                        
                        try {
                          const response = await fetch('/api/training-contact', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                          });
                          
                          const result = await response.json();
                          
                          if (response.ok) {
                            alert('✅ Training inquiry sent successfully! We\'ll respond within 24 hours.');
                            form.reset();
                          } else {
                            alert('❌ Error sending inquiry: ' + (result.error || 'Please try again.'));
                          }
                        } catch (error) {
                          console.error('Form submission error:', error);
                          alert('❌ Error sending inquiry. Please try again or contact us directly.');
                        }
                      }}
                    >
                      📅 Send Inquiry
                    </button>
                    <a 
                      href="https://calendly.com/n60/new-meeting" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="training-btn training-btn-secondary training-form-submit"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                    >
                      📞 Book a Call
                    </a>
                  </div>
                  
                  <p className="training-form-note">
                    We'll respond within 24 hours with availability and next steps.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="training-sidebar">
            <div className="training-sidebar-card training-sidebar-cta">
              <h3>Book a Call</h3>
              <p style={{ marginBottom: '1rem' }}>Ready to get started?</p>
              <a href="https://calendly.com/n60/new-meeting" target="_blank" rel="noopener noreferrer" className="training-btn training-btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                📅 Book a Call
              </a>
            </div>

            {/* Course Leader Bio */}
            <div className="training-sidebar-card">
              <h3>Course Leader</h3>
                      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <img 
                          src="https://i.ibb.co/5Wj164Y1/IMG-5698.jpg" 
                          alt="Matthew Robinson" 
                          className="training-bio-photo"
                          style={{ width: '80px', height: '80px' }}
                        />
                      </div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2c3548', marginBottom: '0.5rem', textAlign: 'center' }}>
                Matthew Robinson
              </h4>
              <p style={{ fontSize: '14px', color: '#2c3548', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '600' }}>
                Founder, N60.ai
              </p>
              <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#6b7280', marginBottom: '1rem' }}>
                25+ years experience in marketing and digital transformation across Europe/Nordics. Practical, ROI-oriented teaching style.
              </p>
              <div className="training-bio-badges" style={{ justifyContent: 'center' }}>
                <span className="training-bio-badge">GDPR-aware</span>
                <span className="training-bio-badge">SME-focused</span>
                <span className="training-bio-badge">Hands-on</span>
              </div>
            </div>


            <div className="training-sidebar-card">
              <h3>Assurance</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.5rem 0', color: '#2c3548' }}>✓ GDPR-aware</li>
                <li style={{ padding: '0.5rem 0', color: '#2c3548' }}>✓ Certificate included</li>
                <li style={{ padding: '0.5rem 0', color: '#2c3548' }}>✓ Norwegian materials available</li>
              </ul>
            </div>

            <div className="training-sidebar-card">
              <h3>Quick FAQ</h3>
              <div className="training-faq-item">
                <div className="training-faq-question" style={{ fontSize: '14px', padding: '0.5rem 0' }}>
                  <span>Prior experience needed?</span>
                  <span>+</span>
                </div>
              </div>
              <div className="training-faq-item">
                <div className="training-faq-question" style={{ fontSize: '14px', padding: '0.5rem 0' }}>
                  <span>Department tailoring?</span>
                  <span>+</span>
                </div>
              </div>
              <div className="training-faq-item">
                <div className="training-faq-question" style={{ fontSize: '14px', padding: '0.5rem 0' }}>
                  <span>Norwegian materials?</span>
                  <span>+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
