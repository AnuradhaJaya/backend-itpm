const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 }, // Star rating (0-5)
  picture: { type: String }, // URL to the uploaded picture
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);