const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const gmailPASS = process.env.gmailPASS

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/process_request', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Example: send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jostlearn@gmail.com',
      pass: gmailPASS
    }
  });

  const mailOptions = {
    from: email,
    to: 'jostlearn@example.com',
    subject: subject,
    text: `${name} (${email}) says: ${message}`
  };

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
