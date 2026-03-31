const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('Database connection failed. Please check your MONGO_URI.');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
