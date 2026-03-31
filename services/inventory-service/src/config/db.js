const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is not set. Starting Inventory Service without a database connection.');
    return false;
  }

  if (/USERNAME|PASSWORD|CLUSTER\.mongodb\.net/i.test(mongoUri)) {
    console.error('MONGO_URI still contains placeholder values. Starting Inventory Service without a database connection.');
    return false;
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Atlas connected: ${connection.connection.host}`);
    return true;
  } catch (error) {
    console.error('Database connection failed. Starting Inventory Service without a database connection.');
    console.error(error.message);
    return false;
  }
};

module.exports = connectDB;
