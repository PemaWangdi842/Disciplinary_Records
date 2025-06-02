// controllers/lecturerController.js
const Record = require('../models/Record');

// Function to render the lecturer dashboard
exports.renderLecturerDashboard = async (req, res) => {
  try {
    const records = await Record.findAll();
    res.render('lecturer-dashboard', { records });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).send('Error rendering lecturer dashboard');
  }
};

// Function to view record details
exports.viewRecordDetails = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (record) {
      res.render('record-details', { record });
    } else {
      res.status(404).send('Record not found');
    }
  } catch (err) {
    console.error('Error fetching record details:', err);
    res.status(500).send('Internal Server Error');
  }
};
