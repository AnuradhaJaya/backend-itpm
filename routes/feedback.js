const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Create: Submit feedback with picture
router.post('/', upload.single('picture'), async (req, res) => {
  try {
    const feedbackData = {
      userType: req.body.userType,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating,
      picture: req.file ? `/uploads/${req.file.filename}` : null,
    };
    const feedback = new Feedback(feedbackData);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read: Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update: Mark as resolved
router.put('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    feedback.status = req.body.status;
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete: Remove invalid feedback
router.delete('/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;