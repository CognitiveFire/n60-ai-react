import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
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

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

// Serve static files from the React build - this must come BEFORE the catch-all route
app.use(express.static(join(__dirname, 'dist')));

// Serve robots.txt and sitemap.xml from public directory
app.use(express.static(join(__dirname, 'public')));

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is working!' });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Root endpoint for basic connectivity test
app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  const indexPath = join(__dirname, 'dist', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

app.post('/api/sendgrid', async (req, res) => {
  console.log('Received POST request to /api/sendgrid');
  console.log('Request body:', req.body);
  const { name, email, company, message } = req.body;
  try {
    await sgMail.send({
      to: 'matthew@n60.ai',
      from: 'matthew@n60.ai',
      subject: `Ny henvendelse fra ${name} (${company})`,
      text: `Navn: ${name}\nE-post: ${email}\nBedrift: ${company}\n\nMelding:\n${message}`
    });
    console.log('Email sent successfully');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    res.status(500).json({ error: 'Kunne ikke sende e-post' });
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
  const indexPath = join(__dirname, 'dist', 'index.html');
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
