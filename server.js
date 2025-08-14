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

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

// Serve static files from the React build
app.use(express.static(join(__dirname, 'dist')));

// Serve images and other assets
app.use('/images', express.static(join(__dirname, 'dist/images')));
app.use('/favicon.ico', express.static(join(__dirname, 'dist/favicon.ico')));
app.use('/assets', express.static(join(__dirname, 'dist/assets')));

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is working!' });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
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

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Serve the React app for all other routes
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`n60-backend listening on port ${port}`));
