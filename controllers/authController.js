// const User = require('../models/user');
// const bcrypt = require('bcrypt');

// exports.showSignupForm = (req, res) => {
//   res.render('signup');
// };

// exports.handleSignup = async (req, res) => {
//   console.log('Form Data:', req.body); // This helps confirm if 'role' is coming through

//   const { name, email, password, role } = req.body; // Make sure to destructure 'role'

//   // Check if 'role' is present
//   if (!role) {
//     return res.status(400).send('Role is required');
//   }

//   // Validate email format: no spaces, must contain "@"
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// if (!emailRegex.test(email)) {
//   return res.status(400).send('Email must include a domain (e.g., @example.com)');
// }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ name, email, password: hashedPassword, role }); // Pass 'role' to the create method
//     res.render('message', {
//       message: 'User registered successfully!',
//       isError: false
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(400).render('message', {
//       message: 'Registration failed.',
//       isError: true
//     });
//   }
// };


// // Show Login Form
// exports.showLoginForm = (req, res) => {
//   res.render('login');
// };

// // Handle Login
// exports.handleLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).send('Invalid email or password.');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).send('Invalid email or password.');
//     }

//     // Store user info in session (only selected fields for security)
//     req.session.user = {
//       id: user.id,
//       email: user.email,
//       role: user.role
//     };

//   // Save session before redirecting
//     req.session.save((err) => {
//       if (err) {
//         console.error('Session Save Error:', err);
//         return res.status(500).send('Session error');
//       }

//       // Redirect based on user role
//       if (user.role === 'DSA') {
//         return res.redirect('/dsa-dashboard');
//       } else if (user.role === 'Lecturer') {
//         return res.redirect('/lecturer-dashboard');
//       } else {
//         return res.redirect('/home'); // Default fallback
//       }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).send('Server error.');
//   }
// };

// // logout
// // authController.js
// exports.logoutUser = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Logout Error:', err);
//       return res.redirect('/home');
//     }
//     res.redirect('/auth/login');
//   });
// };

// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Show signup form
// exports.showSignupForm = (req, res) => {
//   res.render('signup');
// };

// // Handle signup with email verification
// exports.handleSignup = async (req, res) => {
//   console.log('Form Data:', req.body);

//   const { name, email, password, role } = req.body;

//   if (!role) {
//     return res.status(400).send('Role is required');
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).send('Email must include a domain (e.g., @example.com)');
//   }

//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).render('message', {
//         message: 'Email already registered.',
//         isError: true,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       is_verified: false,
//       verification_token: verificationToken,
//     });

//     const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;

    // await transporter.sendMail({
    //   from: `"Sherubtse Auth" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: 'Verify your email',
    //   html: `<h3>Hello ${name},</h3><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`,
    // });

//     await transporter.sendMail({
//       from: `"Sherubtse Auth" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Verify your email',
//       html: `<h3>Hello ${name},</h3><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`,
//     }, (err, info) => {
//       if (err) {
//         console.error('❌ Error sending email:', err);
//       } else {
//         console.log('✅ Email sent:', info.response);
//       }
//     });


//     res.render('message', {
//       message: 'Signup successful! Please check your email to verify your account.',
//       isError: false,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).render('message', {
//       message: 'Registration failed.',
//       isError: true,
//     });
//   }
// };

// // Show login form
// exports.showLoginForm = (req, res) => {
//   res.render('login');
// };

// // Handle login with verification check
// exports.handleLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send('Invalid email or password.');
//     }

//     if (!user.is_verified) {
//       return res.status(401).send('Please verify your email before logging in.');
//     }

//     req.session.user = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     req.session.save((err) => {
//       if (err) {
//         console.error('Session Save Error:', err);
//         return res.status(500).send('Session error');
//       }

//       if (user.role === 'DSA') {
//         return res.redirect('/dsa-dashboard');
//       } else if (user.role === 'Lecturer') {
//         return res.redirect('/lecturer-dashboard');
//       } else {
//         return res.redirect('/home');
//       }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).send('Server error.');
//   }
// };

// logout
// authController.js
// exports.logoutUser = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Logout Error:', err);
//       return res.redirect('/home');
//     }
//     res.redirect('/auth/login');
//   });
// };


// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Show signup form
// exports.showSignupForm = (req, res) => {
//   res.render('signup');
// };

// // Handle signup with email verification
// exports.handleSignup = async (req, res) => {
//   console.log('Form Data:', req.body);

//   const { name, email, password, role } = req.body;

//   if (!role) {
//     return res.status(400).send('Role is required');
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).send('Email must include a domain (e.g., @example.com)');
//   }

//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).render('message', {
//         message: 'Email already registered.',
//         isError: true,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       is_verified: false,
//       verification_token: verificationToken,
//     });

//     const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;

//     await transporter.sendMail({
//       from: `"Disciplinary" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Verify your email',
//       html: `<h3>Hello ${name},</h3><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`,
//     }, (err, info) => {
//       if (err) {
//         console.error('❌ Error sending email:', err);
//       } else {
//         console.log('✅ Email sent:', info.response);
//       }
//     });

//     res.render('message', {
//       message: 'Signup successful! Please check your email to verify your account.',
//       isError: false,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).render('message', {
//       message: 'Registration failed.',
//       isError: true,
//     });
//   }
// };

// exports.verifyEmail = async (req, res) => {
//   const { token } = req.query;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findOne({ where: { email: decoded.email } });

//     if (!user || user.verification_token !== token) {
//       return res.status(400).render('message', {
//         message: 'Invalid or expired verification token.',
//         isError: true,
//       });
//     }

//     if (user.is_verified) {
//       return res.render('message', {
//         message: 'Email already verified. You can log in.',
//         isError: false,
//       });
//     }

//     user.set({
//       is_verified: true,
//       verification_token: null,
//     });

//     await user.save();

//     console.log(`✅ User ${user.email} verified successfully.`);

//     res.render('message', {
//       message: '✅ Email verified successfully! You can now log in.',
//       isError: false,
//     });
//   } catch (err) {
//     console.error('❌ Verification error:', err);
//     res.status(400).render('message', {
//       message: '❌ Invalid or expired verification token.',
//       isError: true,
//     });
//   }
// };

// // Show login form
// exports.showLoginForm = (req, res) => {
//   res.render('login');
// };

// // Handle login with verification check
// exports.handleLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send('Invalid email or password.');
//     }

//     if (!user.is_verified) {
//       return res.status(401).send('Please verify your email before logging in.');
//     }

//     req.session.user = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     req.session.save((err) => {
//       if (err) {
//         console.error('Session Save Error:', err);
//         return res.status(500).send('Session error');
//       }

//       if (user.role === 'DSA') {
//         return res.redirect('/dsa-dashboard');
//       } else if (user.role === 'Lecturer') {
//         return res.redirect('/lecturer-dashboard');
//       } else {
//         return res.redirect('/home');
//       }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).send('Server error.');
//   }
// };

// // Logout
// exports.logoutUser = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Logout Error:', err);
//       return res.redirect('/home');
//     }
//     res.redirect('/auth/login');
//   });
// };


const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Show signup form
exports.showSignupForm = (req, res) => {
  res.render('signup');
};

// Handle signup with email verification
exports.handleSignup = async (req, res) => {
  console.log('📥 Form Data:', req.body);

  const { name, email, password, role } = req.body;

  if (!role) {
    return res.status(400).send('Role is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Email must include a domain (e.g., @example.com)');
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).render('message', {
        message: 'Email already registered.',
        isError: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 1: Create the user first (without token)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      is_verified: false,
      verification_token: '', // temporary
    });

    // Step 2: Generate token with user ID
    const verificationToken = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Step 3: Update user with the token
    newUser.verification_token = verificationToken;
    await newUser.save();

    const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"Disciplinary" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html: `
        <h3>Hello ${name},</h3>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    });

    console.log(`📨 Verification email sent to ${email}`);

    res.status(200).render('message', {
      message: 'Signup successful! Please check your email to verify your account.',
      isError: false,
    });
  } catch (error) {
    console.error('❌ Signup Error:', error);
    res.status(400).render('message', {
      message: 'Registration failed.',
      isError: true,
    });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id, email: decoded.email } });

    if (!user || user.verification_token !== token) {
      return res.status(400).render('message', {
        message: 'Invalid or expired verification token.',
        isError: true,
      });
    }

    if (user.is_verified) {
      return res.status(200).render('message', {
        message: 'Email already verified. You can log in.',
        isError: false,
      });
    }

    user.set({
      is_verified: true,
      verification_token: null,
    });

    await user.save();

    console.log(`✅ User ${user.email} verified successfully.`);

    res.status(200).render('message', {
      message: '✅ Email verified successfully! You can now log in.',
      isError: false,
    });
  } catch (err) {
    console.error('❌ Verification Error:', err);
    res.status(400).render('message', {
      message: '❌ Invalid or expired verification token.',
      isError: true,
    });
  }
};

// Show login form
exports.showLoginForm = (req, res) => {
  res.render('login');
};

// Handle login with verification check
exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid email or password.');
    }

    if (!user.is_verified) {
      return res.status(401).send('Please verify your email before logging in.');
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    req.session.save((err) => {
      if (err) {
        console.error('❌ Session Save Error:', err);
        return res.status(500).send('Session error');
      }

      console.log(`🔐 Login successful for ${user.email}`);

      if (user.role === 'DSA') {
        return res.redirect('/dsa-dashboard');
      } else if (user.role === 'Lecturer') {
        return res.redirect('/lecturer-dashboard');
      } else {
        return res.redirect('/home');
      }
    });
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).send('Server error.');
  }
};

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('❌ Logout Error:', err);
      return res.redirect('/home');
    }
    res.redirect('/auth/login');
  });
};




