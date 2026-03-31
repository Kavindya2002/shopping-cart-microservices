require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5005;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`${process.env.SERVICE_NAME || 'payment-service'} is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start ${process.env.SERVICE_NAME || 'payment-service'}`, error.message);
    process.exit(1);
  }
};

startServer();
