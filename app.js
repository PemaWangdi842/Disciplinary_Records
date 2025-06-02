require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); //routes user
const recordRoutes = require('./routes/recordRoutes'); //routes admin
const User = require('./models/user'); // Import the User model
const Record = require('./models/Record'); // Add admin Record model
const lecturerRoutes = require('./routes/lecturerRoutes');

const app = express();
// the user logged in and available for authorization checks in future routes.
const session = require('express-session');

const PORT = process.env.PORT || 3000; 

app.use(session({
  secret: '2EslKJUFGk',
  resave: false,
  saveUninitialized: true
}));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML (optional, you can keep or remove)
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes (commented out for now)
app.use('/auth', authRoutes);
app.use('/', recordRoutes);   // Record management routes
app.use('/', lecturerRoutes); //liturer



// Route for home page
app.get('/', (req, res) => {
  res.render('index'); // Make sure views/index.ejs exists
});

// Connect to the database and start the server
sequelize.sync().then(() => {
  console.log('Database connected...');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

