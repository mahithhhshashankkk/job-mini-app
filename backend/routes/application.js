const express = require('express');
const Application = require('../models/Application');
const router = express.Router();

// POST /applications - submit application
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /applications - list all applications (admin view)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job_id', 'title company')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /applications/:jobId - get applications for specific job
router.get('/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ job_id: req.params.jobId })
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
