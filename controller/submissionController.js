const Submission = require('../models/Submission');

exports.createSubmission = async (req, res) => {
  try {
    const submissionData = {
      type: req.body.type,
      userType: req.body.userType,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating || 0,
      urgency: req.body.urgency || 'Low',
      picture: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.status = req.body.status || submission.status;
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};