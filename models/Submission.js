const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['Feedback', 'Complaint'] 
  },
  userType: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5 
  },
  urgency: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Low' 
  },
  picture: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Submission', submissionSchema);