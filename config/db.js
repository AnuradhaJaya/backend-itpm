// const mongoose = require("mongoose");
// const Submission = require('../models/Submission');
// require('dotenv').config();

// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to DB");
//     } catch (err) {
//         console.log("Error connecting to DB:", err.message);
//     }
// }

// module.exports = connectDB;

const mongoose = require("mongoose");
const Submission = require('../models/Submission');
require('dotenv').config();
const connectDB = async () => {
    try {
      console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  
module.exports = connectDB;