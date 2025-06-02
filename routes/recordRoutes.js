const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { requireLogin, requireRole } = require('../middleware/authMiddleware');

// DSA dashboard route
// Display all records
router.get('/dsa-dashboard', recordController.showDsaDashboard);

// Show form to add a new record
router.get('/add-record', recordController.showAddRecordForm);

// Handle creating a new record
router.post('/add-record', recordController.createRecord);

// Show form to edit a record
router.get('/edit-record/:id', recordController.showEditRecordForm);

// Handle updating a record
router.post('/edit-record/:id', recordController.updateRecord);

// Handle deleting a record
router.post('/delete-record/:id', recordController.deleteRecord);

module.exports = router;
