const express = require('express');
const router = express.Router();
const multer = require('multer');
const submissionController = require('../controller/submissionController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.post('/', upload.single('picture'), submissionController.createSubmission);
router.get('/', submissionController.getAllSubmissions);
router.put('/:id', submissionController.updateSubmission);
router.delete('/:id', submissionController.deleteSubmission);

module.exports = router;