console.log('🚀🚀🚀 SERVER STARTING - VERSION 1.3.4 - DOCKER DEPLOYMENT 🚀🚀🚀');
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

// Serve built assets from root directory
app.use('/assets', express.static(join(__dirname, 'assets')));

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
  console.log('🔥🔥🔥 SERVER WORKING ROUTE HIT - VERSION 1.3.3! 🔥🔥🔥');
  res.send('<h1>SERVER IS DEFINITELY WORKING!</h1><p>If you see this, Railway is routing through our Node.js server.</p><p>Version 1.2.7</p>');
});

// Ultra simple test route
app.get('/ping', (req, res) => {
  console.log('🏓 PING ROUTE HIT - VERSION 1.3.3');
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

// Root endpoint - serve the React app
app.get('/', (req, res) => {
  console.log('🏠 ROOT ENDPOINT HIT - SERVING REACT APP');
  const indexPath = join(__dirname, 'index.html');
  res.sendFile(indexPath);
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

// Training page endpoint - redirect to hash route for HashRouter
// This MUST come before the catch-all route
app.get('/training', (req, res) => {
  console.log('🎯🎯🎯 TRAINING ENDPOINT HIT - REDIRECTING TO HASH ROUTE! 🎯🎯🎯');
  console.log('Training endpoint hit at:', new Date().toISOString());
  console.log('Redirecting to #/training for HashRouter');
  
  // Redirect to hash route for HashRouter
  res.redirect('/#/training');
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
