// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// let sentEmails = [];

// //Email sender setup
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'deondre71@ethereal.email',
//         pass: 'SWAPDqM44gEGM6jKmv'
//     }
// });
// //const nodemailer = require('nodemailer');
// // const transporter = nodemailer.createTransport({
// //   host: 'smtp.gmail.com',
// //   port: 587,
// //   auth: {
// //     user: 'iamchandanpandey11@gmail.com',
// //     pass: 'chandan1995'
// //   },
// // });
// // transporter.verify().then(console.log).catch(console.error);

// app.post('/send-newsletter', (req, res) => {
//   const { email } = req.body;
//   if (!/\S+@\S+\.\S+/.test(email)) {
//     return res.status(400).json({ message: 'Invalid email format.' });
//   }

//   const mailOptions = {
//     from:'chandan961742@gmail.com',
//     to: email,
//     subject: 'Newsletter Subscription',
//     text: 'Thank you for subscribing to our newsletter!'
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Failed to send email.' });
//     } else {
//       console.log('Email sent: ' + info.response);
//       sentEmails.push({ email, timestamp: new Date() });
//       res.json({ message: 'Newsletter sent successfully!' });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://news-latter-backend-1.onrender.com/send-newsletter', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center w-full h-full m-0 p-0 font-sans text-4xl">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-4/5 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h1>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-l px-4 py-2 outline-none flex-1"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
            Send Newsletter
          </button>
        </form>
        {message && <p className="mt-4 text-gray-800">{message}</p>}
      </div>
    </div>
  );
}

export default App;
