// recordController.js
const Record = require('../models/Record');

// Display all records
exports.showDsaDashboard = async (req, res) => {
  try {
    const records = await Record.findAll();
    res.render('dsa-dashboard', { records });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Show form to add a new record
exports.showAddRecordForm = (req, res) => {
  res.render('add-record'); // Render add record form
};

// Handle creating a new record
exports.createRecord = async (req, res) => {
  try {
    // Log the request body to see what data is coming in
    console.log(req.body);


    const { studentName, studentId, offense, actionTaken, description, date } = req.body;

    // Create a new record using the data from the form
    await Record.create({
      studentName,
      studentId,
      offense,
      actionTaken,
      description, // This should come from the form
      date // This should come from the form
    });

    // Redirect or send a success message
    res.redirect('/dsa-dashboard');
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).send('Error creating record');
  }
};


// Show form to edit a record
// Show the edit form for a specific record
exports.showEditRecordForm = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);  // Get the record by ID
    if (record) {
      res.render('edit-record', { record });  // Render the 'edit-record' view with the record data
    } else {
      res.status(404).send('Record not found');
    }
  } catch (error) {
    console.error('Error fetching record for editing:', error);
    res.status(500).send('Error fetching record');
  }
};

// Handle updating a record
exports.updateRecord = async (req, res) => {
  try {
    const { studentName, studentId, offense, actionTaken } = req.body;
    const record = await Record.findByPk(req.params.id);
    if (!record) {
      return res.status(404).send('Record not found');
    }
    record.studentName = studentName;
    record.studentId = studentId;
    record.offense = offense;
    record.actionTaken = actionTaken;
    await record.save();
    res.redirect('/dsa-dashboard');
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Handle deleting a record
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) {
      return res.status(404).send('Record not found');
    }
    await record.destroy();
    res.redirect('/dsa-dashboard');
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).send('Internal Server Error');
  }
};


