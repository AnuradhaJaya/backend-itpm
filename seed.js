const mongoose = require('mongoose');
const Submission = require('./models/Submission');
require('dotenv').config();

const dummyData = [
  // Feedback
  {
    type: 'Feedback',
    userType: 'Resident',
    category: 'Operational',
    description: 'The pickup was on time, and the collector was very polite!',
    rating: 5,
    status: 'Open',
    createdAt: new Date('2025-03-20'),
  },
  {
    type: 'Feedback',
    userType: 'Collector',
    category: 'Technical',
    description: 'The app is great, but it crashed once during my route.',
    rating: 4,
    status: 'Open',
    createdAt: new Date('2025-03-21'),
  },
  {
    type: 'Feedback',
    userType: 'Company',
    category: 'Environmental',
    description: 'Love how the app tracks our recycling impact!',
    rating: 5,
    status: 'Resolved',
    createdAt: new Date('2025-03-22'),
  },
  // Complaints
  {
    type: 'Complaint',
    userType: 'Resident',
    category: 'Operational',
    description: 'My glass bottles were not picked up on the scheduled day.',
    urgency: 'High',
    status: 'Open',
    createdAt: new Date('2025-03-23'),
  },
  {
    type: 'Complaint',
    userType: 'Collector',
    category: 'Interpersonal',
    description: 'The resident was not home during the pickup window, and I had to wait.',
    urgency: 'Medium',
    status: 'Open',
    createdAt: new Date('2025-03-24'),
  },
  {
    type: 'Complaint',
    userType: 'Company',
    category: 'Operational',
    description: 'The delivered e-waste was contaminated and unusable.',
    urgency: 'High',
    status: 'Resolved',
    createdAt: new Date('2025-03-25'),
  },
];
  // Your dummy data remains the same
  // ...


const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected');
    await Submission.deleteMany({});
    await Submission.insertMany(dummyData);
    console.log('Dummy data inserted');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();