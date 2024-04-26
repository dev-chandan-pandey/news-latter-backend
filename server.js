const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let sentEmails = [];

//Email sender setup
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'deondre71@ethereal.email',
        pass: 'SWAPDqM44gEGM6jKmv'
    }
});
//const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     user: 'iamchandanpandey11@gmail.com',
//     pass: 'chandan1995'
//   },
// });
// transporter.verify().then(console.log).catch(console.error);

app.post('/send-newsletter', (req, res) => {
  const { email } = req.body;
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  const mailOptions = {
    from:'chandan961742@gmail.com',
    to: email,
    subject: 'Newsletter Subscription',
    text: 'Thank you for subscribing to our newsletter!'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send email.' });
    } else {
      console.log('Email sent: ' + info.response);
      sentEmails.push({ email, timestamp: new Date() });
      res.json({ message: 'Newsletter sent successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
