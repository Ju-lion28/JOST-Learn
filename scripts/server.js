const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
const port = 3000;

// Configure OAuth credentials
const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

// Generate OAuth URL for user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://mail.google.com/',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/process_request', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Authenticate using OAuth credentials
  oauth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN', // You need to obtain this token using the OAuth flow
  });

  // Create a transporter object using OAuth
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'jostlearn@gmail.com',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      refreshToken: 'YOUR_REFRESH_TOKEN',
      accessToken: oauth2Client.getAccessToken(),
    },
  });

  // Define email options
  const mailOptions = {
    from: email,
    to: 'jostlearn@example.com',
    subject: subject,
    text: `${name} (${email}) says: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to submit request');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Request submitted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
