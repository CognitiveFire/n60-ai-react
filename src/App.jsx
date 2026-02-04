import React, { useState } from 'react';

function App() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          company: formState.company,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus({ type: 'success', message: 'Thanks – I’ll get back to you shortly.' });
      setFormState({ name: '', company: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Feel free to try again in a moment.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <main className="page-inner">
        {/* Hero */}
        <header id="hero" className="page-header section hero-section">
          <div className="section-header">
            <p className="page-kicker">Matthew Robinson</p>
            <h1 className="page-title">Digital marketing leadership for growth-focused companies.</h1>
            <p className="lead">
              I help companies build sustainable demand, predictable pipelines, and modern marketing
              organisations. My work spans performance marketing, SEO and AEO, demand generation, and
              digital transformation — combining hands-on execution with senior-level strategic
              leadership.
            </p>
          </div>
          <p className="page-subtitle">
            Strategy, performance, and execution — from early-stage scale-ups to established global
            brands.
          </p>
          <div className="cta-row">
            <a href="#contact" className="button-primary">
              Start a conversation →
            </a>
          </div>
        </header>

        {/* What I do */}
        <section id="what-i-do" className="section">
          <div className="section-header">
            <p className="section-eyebrow">What I do</p>
            <h2 className="section-title">Strategy, execution, and leadership.</h2>
            <p className="section-kicker">
              I work at the intersection of strategy, execution, and leadership.
            </p>
          </div>

          <div className="columns-3">
            <div className="block-card">
              <h3 className="block-title">Growth &amp; Demand</h3>
              <p className="block-body">
                Building measurable demand engines across B2B and B2C — from acquisition to revenue.
              </p>
            </div>
            <div className="block-card">
              <h3 className="block-title">Digital Strategy &amp; Transformation</h3>
              <p className="block-body">
                Helping organisations modernise their marketing, data, and technology to support growth.
              </p>
            </div>
            <div className="block-card">
              <h3 className="block-title">Leadership &amp; Enablement</h3>
              <p className="block-body">
                Leading teams, mentoring specialists, and aligning marketing with sales, product, and
                leadership.
              </p>
            </div>
          </div>
        </section>

        {/* How I work */}
        <section id="how-i-work" className="section">
          <div className="section-header">
            <p className="section-eyebrow">How I work</p>
            <h2 className="section-title">Simple, structured, outcomes-driven.</h2>
          </div>
          <div className="stack-large">
            <ul className="tight-list">
              <li>Strategy first, execution grounded in data</li>
              <li>Clear priorities, realistic roadmaps</li>
              <li>Close collaboration with internal teams</li>
              <li>Transparent reporting and measurable impact</li>
            </ul>
            <p className="lead">
              I’m comfortable operating as an external advisor, a hands-on consultant, or an embedded
              marketing leader — depending on what the business needs.
            </p>
          </div>
        </section>

        {/* Experience & scope */}
        <section id="experience" className="section">
          <div className="section-header">
            <p className="section-eyebrow">Experience &amp; scope</p>
            <h2 className="section-title">Markets, clients, and models.</h2>
          </div>

          <div className="two-column">
            <div className="stack-large">
              <div>
                <p className="list-heading">I’ve worked with companies across:</p>
                <ul className="tight-list">
                  <li>Norway and Scandinavia</li>
                  <li>Europe</li>
                  <li>Global markets</li>
                </ul>
              </div>

              <div>
                <p className="list-heading">Client types:</p>
                <ul className="tight-list">
                  <li>Startups and scale-ups</li>
                  <li>SaaS and technology companies</li>
                  <li>Established, category-leading brands</li>
                </ul>
              </div>
            </div>

            <div className="stack">
              <p className="list-heading">Commercial models:</p>
              <p className="block-body">
                B2B, B2C, and hybrid organisations with complex buying journeys and long decision cycles.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="section">
          <div className="section-header">
            <p className="section-eyebrow">Capabilities</p>
            <h2 className="section-title">Where I’m most useful.</h2>
          </div>

          <div className="stack-large">
            <div className="stack-large">
              <p className="list-heading">Performance &amp; Acquisition</p>
              <ul className="tight-list">
                <li>Paid search, paid social, digital advertising</li>
                <li>Conversion optimisation and funnel design</li>
                <li>Budget ownership and ROI accountability</li>
              </ul>
            </div>

            <div className="stack-large">
              <p className="list-heading">SEO &amp; AEO</p>
              <ul className="tight-list">
                <li>Technical and content-led SEO</li>
                <li>Search visibility in AI-driven environments</li>
                <li>Structured content for discovery and authority</li>
              </ul>
            </div>

            <div className="stack-large">
              <p className="list-heading">Demand Generation &amp; Revenue</p>
              <ul className="tight-list">
                <li>Pipeline creation and forecasting</li>
                <li>Account-Based Marketing (ABM)</li>
                <li>Lead generation and nurturing</li>
              </ul>
            </div>

            <div className="stack-large">
              <p className="list-heading">Marketing Technology</p>
              <ul className="tight-list">
                <li>Marketing automation and CRM</li>
                <li>Martech stack design and optimisation</li>
                <li>Data, analytics, and attribution</li>
              </ul>
            </div>

            <div className="stack-large">
              <p className="list-heading">Product &amp; SaaS Marketing</p>
              <ul className="tight-list">
                <li>Positioning and messaging</li>
                <li>Go-to-market strategy</li>
                <li>Alignment between product, sales, and marketing</li>
              </ul>
            </div>

            <div className="stack-large">
              <p className="list-heading">AI &amp; Insights</p>
              <ul className="tight-list">
                <li>AI-assisted research and analysis</li>
                <li>Automation for efficiency and scale</li>
                <li>Practical applications, not experimentation theatre</li>
              </ul>
            </div>

            <div className="stack-large">
              <p className="list-heading">Governance</p>
              <ul className="tight-list">
                <li>GDPR, privacy, and data security</li>
                <li>Sustainable, compliant growth practices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Engagement models */}
        <section id="engagement-models" className="section">
          <div className="section-header">
            <p className="section-eyebrow">Engagement models</p>
            <h2 className="section-title">How we might work together.</h2>
          </div>

          <div className="stack-large">
            <div className="block-card">
              <h3 className="block-title">Strategic Advisor</h3>
              <p className="block-body">
                Senior-level guidance, audits, and roadmap creation.
              </p>
            </div>
            <div className="block-card">
              <h3 className="block-title">Consultant / Project Lead</h3>
              <p className="block-body">
                End-to-end ownership of campaigns, platforms, or transformation initiatives.
              </p>
            </div>
            <div className="block-card">
              <h3 className="block-title">Interim or Fractional Lead</h3>
              <p className="block-body">
                Hands-on leadership for teams, functions, or critical growth phases.
              </p>
            </div>

            <p className="small-text">
              Each engagement is shaped around business objectives, internal maturity, and delivery
              capacity.
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <div className="section-header">
            <p className="section-eyebrow">About me</p>
            <h2 className="section-title">A partner, not a passenger.</h2>
          </div>

          <div className="two-column">
            <div className="stack-large">
              <p className="lead">
                I’m a highly experienced digital marketer with a background in both consulting and
                in-house leadership roles. I’ve built and led teams, delivered complex cross-functional
                projects, and worked closely with executive leadership to translate ambition into
                execution.
              </p>
              <p className="lead">
                What clients tend to value most is my ability to simplify complex problems, connect
                strategy to measurable outcomes, and balance speed with quality and compliance.
              </p>
              <p className="lead">
                I care deeply about clarity, accountability, and work that actually moves the business
                forward.
              </p>
            </div>

            <div className="stack-large">
              <div>
                <p className="subtle-label">Pros</p>
                <ul className="tight-list">
                  <li>Senior-level experience without agency overhead</li>
                  <li>Equally comfortable in strategy and execution</li>
                  <li>Strong across both performance and long-term demand</li>
                  <li>Proven in complex, regulated environments</li>
                </ul>
              </div>
              <div>
                <p className="subtle-label">Cons (by design)</p>
                <ul className="tight-list">
                  <li>Not a volume freelancer</li>
                  <li>Selective with projects and timelines</li>
                  <li>Focused on impact over activity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="section-header">
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title">Let’s talk.</h2>
          </div>

          <div className="stack-large">
            <p className="lead">
              If you’re looking to improve demand, modernise your marketing, or need experienced
              leadership — I’m happy to explore whether there’s a fit.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="message">Short message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="A few lines about your context, challenges, or questions."
                />
              </div>

              <div className="form-footer">
                <button type="submit" className="button-primary" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send →'}
                </button>
                <span className="form-hint">I usually respond within one business day.</span>
              </div>

              {status && (
                <p className={`form-status ${status.type}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
