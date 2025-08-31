
// Hero.jsx
import React from 'react';
// CSS moved to App.css

const Hero = ({ onOpenDemo, backgroundImage, videoUrl }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-headline">Kraftig AI-markedsføring for norske B2B-bedrifter</h1>
          <p className="hero-subheadline">
            N60.ai leverer målrettede AI-verktøy for markedsføring, skreddersydd for din bedrift. Ingen unødvendige funksjoner – bare løsninger som gir rask vekst og flere kunder.
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/n60/new-meeting', '_blank')} 
            className="hero-cta"
          >
            Se demoen
          </button>
        </div>
        <div className="hero-right">
          <div className="hero-dashboards">
            {/* Laptop Display */}
            <div className="laptop-display">
              <div className="laptop-screen">
                <div className="dashboard-header">
                  <h3>AI-Driven Marketing</h3>
                </div>
                <div className="dashboard-grid">
                  <div className="dashboard-card demand-generation">
                    <h4>Demand Generation</h4>
                    <div className="chart-placeholder">
                      <div className="chart-line purple"></div>
                      <div className="chart-line yellow"></div>
                    </div>
                    <div className="chart-labels">
                      <span>Segment lead 1: 17%</span>
                      <span>Segment lead 2: 22%</span>
                    </div>
                  </div>
                  <div className="dashboard-card outreach">
                    <h4>Outreach</h4>
                    <div className="chart-placeholder">
                      <div className="chart-line wavy"></div>
                    </div>
                    <span className="metric">110 Emails sent</span>
                  </div>
                  <div className="dashboard-card outreach-secondary">
                    <h4>Outreach</h4>
                    <div className="chart-placeholder">
                      <div className="chart-line wavy"></div>
                    </div>
                    <span className="metric">22% Pipeline score</span>
                  </div>
                  <div className="dashboard-card account-management">
                    <h4>Account Management</h4>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Account</th>
                            <th>Segment</th>
                            <th>Segment leads: 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Account A</td>
                            <td>Segment 2</td>
                            <td>2.1</td>
                          </tr>
                          <tr>
                            <td>Account B</td>
                            <td>Segment 1</td>
                            <td>1.3</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="dashboard-card account-management-secondary">
                    <h4>Account Management</h4>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Account</th>
                            <th>Segment</th>
                            <th>Pipeline score</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Account B</td>
                            <td>Segment 1</td>
                            <td>1.7</td>
                          </tr>
                          <tr>
                            <td>Account P</td>
                            <td>Segment 1</td>
                            <td>1.7</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Phone Display */}
            <div className="mobile-display">
              <div className="mobile-screen">
                <div className="mobile-dashboard">
                  <div className="mobile-card demand-generation">
                    <h4>Demand Generation</h4>
                    <div className="mobile-chart">
                      <div className="bar-chart">
                        <div className="bar" style={{height: '60%'}}></div>
                        <div className="bar" style={{height: '80%'}}></div>
                        <div className="bar" style={{height: '40%'}}></div>
                      </div>
                    </div>
                    <span className="mobile-metric">82 Generated leads</span>
                  </div>
                  <div className="mobile-card outreach">
                    <h4>Outreach</h4>
                    <div className="mobile-chart">
                      <div className="line-chart">
                        <div className="line-point"></div>
                        <div className="line-point"></div>
                        <div className="line-point"></div>
                      </div>
                    </div>
                    <span className="mobile-metric">110 Emails sent</span>
                    <span className="mobile-metric">488MKT unread</span>
                  </div>
                  <div className="mobile-card prediction">
                    <h4>Prediction</h4>
                    <div className="mobile-chart">
                      <div className="line-chart">
                        <div className="line-point"></div>
                        <div className="line-point"></div>
                        <div className="line-point"></div>
                      </div>
                    </div>
                    <span className="mobile-metric">4.8 Infound leads per vianeD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question Button */}
          <button 
            className="hero-question-btn"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="question-icon">💰</span>
            <span>Hva koster det?</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
