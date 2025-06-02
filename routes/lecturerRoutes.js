const express = require('express');
const router = express.Router();
const Record = require('../models/Record'); // Make sure you have this model

// Route to render lecturer-dashboard
router.get('/lecturer-dashboard', async (req, res) => {
  try {
    const records = await Record.findAll(); // Fetching all records from DB
    console.log('Fetched Records:', records); // Log to check the fetched data

    // Check if offense exists in records
    if (records.length > 0) {
      records.forEach(record => {
        console.log('Offense Field:', record.offense); // Log the offense field to verify its value
      });
    }

    res.render('lecturer-dashboard', { records }); // Passing records to view
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).send('Error fetching records');
  }
});

//route to render the details
// ✅ Add this route to display individual record details
router.get('/record-details/:id', async (req, res) => {
  const record = await Record.findByPk(req.params.id);
  if (!record) {
    return res.status(404).send('Record not found');
  }
  res.render('record-details', { record }); // record-details.ejs must exist
});

module.exports = router;
