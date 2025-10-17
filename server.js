console.log('🚀🚀🚀 SERVER STARTING - VERSION 1.2.7 - DOCKER DEPLOYMENT 🚀🚀🚀');
console.log('Node.js version:', process.version);
console.log('Current working directory:', process.cwd());

import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting server...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Port:', port);
console.log('Current directory:', __dirname);

// Initialize Resend only if API key is available
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Resend initialized with API key');
} else {
  console.log('⚠️  Resend API key not found - email functionality disabled');
}

app.use(cors());
app.use(express.json());

// Serve static files from the React build - this must come BEFORE the catch-all route
app.use(express.static(join(__dirname, 'dist')));

// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));

// Serve React app files from src directory (for development)
app.use('/src', express.static(join(__dirname, 'src')));

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is working!' });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  console.log('🏥 HEALTH CHECK HIT - VERSION 1.2.4');
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.2.4',
    message: 'Docker deployment working correctly'
  });
});

// Ultra simple test route for Docker deployment
app.get('/docker-test', (req, res) => {
  console.log('🐳🐳🐳 DOCKER TEST ROUTE HIT - VERSION 1.2.4! 🐳🐳🐳');
  res.send('<h1>DOCKER DEPLOYMENT SUCCESS!</h1><p>This proves our Node.js server is handling requests through Docker.</p><p>Version 1.2.4</p><p>Timestamp: ' + new Date().toISOString() + '</p>');
});

// Another test route to confirm server is working
app.get('/server-working', (req, res) => {
  console.log('🔥🔥🔥 SERVER WORKING ROUTE HIT - VERSION 1.2.7! 🔥🔥🔥');
  res.send('<h1>SERVER IS DEFINITELY WORKING!</h1><p>If you see this, Railway is routing through our Node.js server.</p><p>Version 1.2.7</p>');
});

// Ultra simple test route
app.get('/ping', (req, res) => {
  console.log('🏓 PING ROUTE HIT - VERSION 1.2.7');
  res.send('pong');
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  console.log('🧪 TEST ROUTE HIT');
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    version: '1.0.4',
    files: {
      public: require('fs').existsSync(join(__dirname, 'public', 'training.html')),
      dist: require('fs').existsSync(join(__dirname, 'dist', 'training.html'))
    }
  });
});

// Simple training test route
app.get('/training-test', (req, res) => {
  console.log('🎯 TRAINING TEST ROUTE HIT!');
  res.send('<h1>Training Test Route Works!</h1><p>If you see this, custom routes are working.</p><p>Version: 1.1.5</p>');
});

// Simple debug route
app.get('/debug', (req, res) => {
  console.log('🔍 DEBUG ROUTE HIT!');
  const fs = require('fs');
  const path = require('path');
  
  const files = {
    public: fs.existsSync(path.join(__dirname, 'public', 'training.html')),
    dist: fs.existsSync(path.join(__dirname, 'dist', 'training.html')),
    index: fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
  };
  
  res.json({
    message: 'Debug route working',
    version: '1.1.9',
    timestamp: new Date().toISOString(),
    files: files,
    directory: __dirname
  });
});

// Ultra simple test route
app.get('/simple-test', (req, res) => {
  console.log('🚀🚀🚀 SIMPLE TEST ROUTE HIT - VERSION 1.2.3! 🚀🚀🚀');
  res.send('<h1>SUCCESS! Server routes are working!</h1><p>Version 1.2.3</p><p>If you see this, the server is running the latest code.</p><p>Timestamp: ' + new Date().toISOString() + '</p>');
});

// Another test route with different path
app.get('/server-test', (req, res) => {
  console.log('🔥 SERVER TEST ROUTE HIT - VERSION 1.2.3! 🔥');
  res.send('<h1>SERVER IS WORKING!</h1><p>This proves our Node.js server is handling requests.</p><p>Version 1.2.3</p>');
});

// Root endpoint - serve simple HTML to test if server is working
app.get('/', (req, res) => {
  console.log('🏠 ROOT ENDPOINT HIT - VERSION 1.2.7');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>N60.ai - Server is Working</title>
    </head>
    <body>
      <h1>Server is Working!</h1>
      <p>Version 1.2.7</p>
      <p>If you see this, our Node.js server is handling requests.</p>
      <ul>
        <li><a href="/ping">Test /ping</a></li>
        <li><a href="/server-working">Test /server-working</a></li>
        <li><a href="/training">Test /training</a></li>
        <li><a href="/health">Test /health</a></li>
      </ul>
    </body>
    </html>
  `);
});


// Main website contact form
app.post('/api/contact', async (req, res) => {
  console.log('Received POST request to /api/contact');
  console.log('Request body:', req.body);
  const { name, email, company, message } = req.body;
  
  if (!resend) {
    console.log('⚠️  Resend not available - form submission logged only');
    console.log('Contact form submission:', { name, email, company, message });
    res.status(200).json({ success: true, message: 'Form submitted (email disabled)' });
    return;
  }
  
  try {
    await resend.emails.send({
      from: 'N60 Website <onboarding@resend.dev>',
      to: ['matthew@n60.ai'],
      subject: `Ny henvendelse fra ${name} (${company})`,
      html: `
        <h2>Ny henvendelse fra N60.no</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Bedrift:</strong> ${company}</p>
        <p><strong>Melding:</strong></p>
        <p>${message}</p>
      `
    });
    console.log('Email sent successfully via Resend');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Kunne ikke sende e-post' });
  }
});

// Training form endpoint
app.post('/api/training-contact', async (req, res) => {
  console.log('Received POST request to /api/training-contact');
  console.log('Request body:', req.body);
  const { name, email, company, phone, participants, format, message } = req.body;
  
  if (!resend) {
    console.log('⚠️  Resend not available - training form submission logged only');
    console.log('Training form submission:', { name, email, company, phone, participants, format, message });
    res.status(200).json({ success: true, message: 'Training request submitted (email disabled)' });
    return;
  }
  
  try {
    await resend.emails.send({
      from: 'N60 Training <onboarding@resend.dev>',
      to: ['matthew@n60.ai'],
      subject: `AI Training Request from ${name} (${company})`,
      html: `
        <h2>AI Competence Training Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Participants:</strong> ${participants}</p>
        <p><strong>Preferred Format:</strong> ${format}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message provided'}</p>
      `
    });
    console.log('Training email sent successfully via Resend');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Could not send email' });
  }
});

// Specific routes for privacy policy (both with and without .html extension)
app.get('/privacy-policy.html', (req, res) => {
  const privacyPolicyPath = join(__dirname, 'public', 'privacy-policy.html');
  console.log('Serving privacy policy from:', privacyPolicyPath);
  res.sendFile(privacyPolicyPath);
});

app.get('/privacy-policy', (req, res) => {
  const privacyPolicyPath = join(__dirname, 'public', 'privacy-policy.html');
  console.log('Serving privacy policy from:', privacyPolicyPath);
  res.sendFile(privacyPolicyPath);
});

// Training page endpoint - serve inline HTML
// This MUST come before the catch-all route
app.get('/training', (req, res) => {
  console.log('🎯🎯🎯 TRAINING ENDPOINT HIT - VERSION 1.1.8 - SERVING INLINE HTML! 🎯🎯🎯');
  console.log('Training endpoint hit at:', new Date().toISOString());
  console.log('THIS IS THE LATEST VERSION WITH INLINE HTML!');
  
  const trainingHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Competence Training for Teams - N60.ai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; background: #ffffff; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .navbar { background: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1rem 0; }
        .navbar-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #3b82f6; text-decoration: none; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { color: #374151; text-decoration: none; font-weight: 500; transition: color 0.3s ease; }
        .nav-links a:hover { color: #3b82f6; }
        .training-hero { background: linear-gradient(135deg, #0f1c30 0%, #363f50 100%); color: white; padding: 120px 0 80px; text-align: center; }
        .hero-content h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.1; }
        .hero-subtitle { font-size: 1.5rem; font-weight: 300; margin-bottom: 1.5rem; opacity: 0.9; }
        .hero-description { font-size: 1.1rem; max-width: 800px; margin: 0 auto 2rem; opacity: 0.9; line-height: 1.7; }
        .hero-cta { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; }
        .cta-button { padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: inline-block; }
        .cta-button.primary { background: #3b82f6; color: white; }
        .cta-button.secondary { background: transparent; color: white; border: 2px solid white; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .section { padding: 80px 0; }
        .section h2 { font-size: 2.5rem; font-weight: 700; text-align: center; margin-bottom: 3rem; color: #1f2937; }
        .outcomes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .outcome-item { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; border: 1px solid #e5e7eb; }
        .outcome-item h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #1f2937; }
        .agenda-items { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .agenda-item { background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid #3b82f6; }
        .agenda-item h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #1f2937; }
        .agenda-item ul { list-style: none; }
        .agenda-item li { padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
        .pricing-table { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .pricing-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; text-align: center; position: relative; }
        .pricing-card.featured { border: 2px solid #3b82f6; transform: scale(1.05); }
        .popular-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600; }
        .price { margin: 1rem 0; }
        .currency { font-size: 1.2rem; color: #6b7280; }
        .amount { font-size: 3rem; font-weight: 800; color: #1f2937; }
        .period { font-size: 1rem; color: #6b7280; }
        .features { list-style: none; margin: 2rem 0; }
        .features li { padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
        .add-on { background: linear-gradient(135deg, #0f1c30 0%, #363f50 100%); color: white; padding: 2rem; border-radius: 12px; text-align: center; margin-top: 3rem; }
        .add-on h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .add-on strong { color: #fbbf24; }
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .contact-methods { margin-top: 2rem; }
        .contact-method { background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }
        .contact-method h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
        .training-form { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .training-form input, .training-form select, .training-form textarea { padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.3s ease; }
        .training-form input:focus, .training-form select:focus, .training-form textarea:focus { outline: none; border-color: #3b82f6; }
        .submit-button { width: 100%; background: #3b82f6; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; margin-top: 1rem; }
        .submit-button:hover { background: #2563eb; }
        @media (max-width: 768px) {
            .hero-content h1 { font-size: 2rem; }
            .hero-cta { flex-direction: column; align-items: center; }
            .contact-content { grid-template-columns: 1fr; gap: 2rem; }
            .form-row { grid-template-columns: 1fr; }
            .nav-links { display: none; }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-content">
                <a href="/" class="logo">n60.ai</a>
                <ul class="nav-links">
                    <li><a href="/#solutions">Solutions</a></li>
                    <li><a href="/#innovation">Innovation</a></li>
                    <li><a href="/training">Training & Courses</a></li>
                    <li><a href="/#how-we-work">How We Work</a></li>
                    <li><a href="/#why-ai">Why AI</a></li>
                    <li><a href="/#contact">Pricing</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="training-hero">
        <div class="container">
            <div class="hero-content">
                <h1>AI Competence Training for Teams</h1>
                <p class="hero-subtitle">Empower your employees to use AI responsibly and effectively</p>
                <p class="hero-description">
                    AI isn't just for tech companies. It's a tool every team can use to work smarter. Our one-day AI Competence Training gives your employees the knowledge and confidence to use AI tools responsibly, efficiently, and in line with your company's goals and policies.
                </p>
                <p class="hero-description">
                    Ready to upskill your team? Let's make AI part of your company's everyday workflow: safely, efficiently, and with purpose.
                </p>
                <div class="hero-cta">
                    <a href="#training-contact" class="cta-button primary">Book Your Training Session</a>
                    <a href="#pricing" class="cta-button secondary">View Pricing</a>
                </div>
            </div>
        </div>
    </section>

    <section class="section learning-outcomes">
        <div class="container">
            <h2>What Your Team Will Learn</h2>
            <div class="outcomes-grid">
                <div class="outcome-item">
                    <h3>🎯 AI Fundamentals</h3>
                    <p>Understand what AI is, how it works, and its current capabilities and limitations</p>
                </div>
                <div class="outcome-item">
                    <h3>🛡️ Responsible AI Use</h3>
                    <p>Learn best practices for using AI tools safely and ethically in your industry</p>
                </div>
                <div class="outcome-item">
                    <h3>⚡ Productivity Boost</h3>
                    <p>Discover practical AI tools that can streamline your daily work processes</p>
                </div>
                <div class="outcome-item">
                    <h3>📊 Data Privacy</h3>
                    <p>Understand data protection, privacy concerns, and how to use AI securely</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section training-agenda">
        <div class="container">
            <h2>Training Agenda</h2>
            <div class="agenda-items">
                <div class="agenda-item">
                    <h3>Morning Session (3 hours)</h3>
                    <ul>
                        <li>Introduction to AI and Machine Learning</li>
                        <li>Current AI Tools and Their Applications</li>
                        <li>Hands-on Practice with Popular AI Tools</li>
                        <li>Break and Q&A</li>
                    </ul>
                </div>
                <div class="agenda-item">
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

    <section id="pricing" class="section pricing-section">
        <div class="container">
            <h2>Training Options</h2>
            <div class="pricing-table">
                <div class="pricing-card featured">
                    <div class="popular-badge">Most Popular</div>
                    <h3>In-Person Workshop</h3>
                    <div class="price">
                        <span class="currency">NOK</span>
                        <span class="amount">25,000</span>
                        <span class="period">per session</span>
                    </div>
                    <ul class="features">
                        <li>Up to 15 participants</li>
                        <li>Full-day training (6 hours)</li>
                        <li>Hands-on exercises</li>
                        <li>Training materials included</li>
                        <li>30-day follow-up support</li>
                    </ul>
                    <a href="#training-contact" class="cta-button primary">Book Training</a>
                </div>
                
                <div class="pricing-card">
                    <h3>Virtual Training</h3>
                    <div class="price">
                        <span class="currency">NOK</span>
                        <span class="amount">18,000</span>
                        <span class="period">per session</span>
                    </div>
                    <ul class="features">
                        <li>Up to 20 participants</li>
                        <li>Half-day training (4 hours)</li>
                        <li>Interactive online format</li>
                        <li>Digital materials included</li>
                        <li>14-day follow-up support</li>
                    </ul>
                    <a href="#training-contact" class="cta-button secondary">Book Training</a>
                </div>
            </div>
            
            <div class="add-on">
                <h3>Optional add-on</h3>
                <p><strong>Custom AI Policy Development:</strong> NOK 15,000</p>
            </div>
        </div>
    </section>

    <section class="section whats-included">
        <div class="container">
            <h2>What's Included</h2>
            <div class="outcomes-grid">
                <div class="outcome-item">
                    <h3>📚 Training Materials</h3>
                    <p>Comprehensive guides, checklists, and reference materials</p>
                </div>
                <div class="outcome-item">
                    <h3>💻 Hands-on Practice</h3>
                    <p>Real-world exercises using popular AI tools</p>
                </div>
                <div class="outcome-item">
                    <h3>📞 Follow-up Support</h3>
                    <p>Ongoing support to help implement what you've learned</p>
                </div>
                <div class="outcome-item">
                    <h3>🎓 Certificate of Completion</h3>
                    <p>Professional certificate for all participants</p>
                </div>
            </div>
        </div>
    </section>

    <section id="training-contact" class="section training-contact">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <h2>Ready to get started?</h2>
                    <p>Contact us to discuss your AI training needs and get a customized proposal.</p>
                    
                    <div class="contact-methods">
                        <div class="contact-method">
                            <h3>📅 Book a Training Session</h3>
                            <p>Fill out the form and we'll contact you within 24 hours</p>
                        </div>
                        
                        <div class="contact-method">
                            <h3>📧 Email us directly</h3>
                            <p><a href="mailto:hello@n60.ai">hello@n60.ai</a></p>
                        </div>
                    </div>
                </div>
                
                <div class="contact-form-container">
                    <form class="training-form" action="/api/training-contact" method="POST">
                        <h3>Request Training Information</h3>
                        
                        <div class="form-row">
                            <input type="text" name="name" placeholder="Your Name" required>
                            <input type="email" name="email" placeholder="Your Email" required>
                        </div>
                        
                        <div class="form-row">
                            <input type="text" name="company" placeholder="Company Name" required>
                            <input type="tel" name="phone" placeholder="Phone Number">
                        </div>
                        
                        <div class="form-row">
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
                        
                        <textarea name="message" placeholder="Tell us about your team's AI training needs, specific departments, or any questions you have..." rows="4" required></textarea>
                        
                        <button type="submit" class="submit-button">Request Training Information</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <script>
        document.querySelector('.training-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you within 24 hours.');
            this.reset();
        });
    </script>
</body>
</html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(trainingHTML);
});

// Catch-all handler: send back React's index.html file for any non-API routes
// This must come AFTER the static file middleware
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Skip static file requests that should be handled by express.static
  if (req.path.startsWith('/images/') || req.path.startsWith('/assets/') || req.path.startsWith('/favicon.ico') || req.path.startsWith('/robots.txt') || req.path.startsWith('/sitemap.xml')) {
    return res.status(404).json({ error: 'Static file not found' });
  }
  
  // Serve the React app for all other routes
  console.log('🎯 CATCH-ALL SERVING REACT APP FOR:', req.path);
  const indexPath = join(__dirname, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

const server = app.listen(port, () => {
  console.log(`✅ n60-backend listening on port ${port}`);
  console.log(`🌐 Server ready at http://localhost:${port}`);
  console.log(`🏥 Health check available at http://localhost:${port}/health`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
