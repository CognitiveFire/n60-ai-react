import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'test@example.com',
  from: process.env.SENDGRID_EMAIL,
  subject: 'Test Email',
  text: 'This is a test email from SendGrid.',
};

sgMail.send(msg)
  .then(() => console.log('Email sent successfully'))
  .catch(error => console.error('Error:', error.response ? error.response.body : error));
