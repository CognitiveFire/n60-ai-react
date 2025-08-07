import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/sendgrid', async (req, res) => {
  const { name, email, company, message } = req.body;
  try {
    await sgMail.send({
      to: 'matthew@n60.ai',
      from: 'matthew@n60.ai',
      subject: `Ny henvendelse fra ${name} (${company})`,
      text: `Navn: ${name}\nE-post: ${email}\nBedrift: ${company}\n\nMelding:\n${message}`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    res.status(500).json({ error: 'Kunne ikke sende e-post' });
  }
});

app.use('*', (_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(port, () => console.log(`n60-backend listening on port ${port}`));
