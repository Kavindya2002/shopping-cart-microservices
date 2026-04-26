const mongoose = require('mongoose');
const dns = require('node:dns');

mongoose.set('bufferCommands', false);

const configureDnsServers = () => {
  if (!process.env.DNS_SERVERS) {
    return;
  }

  const servers = process.env.DNS_SERVERS
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length > 0) {
    dns.setServers(servers);
  }
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is not set. Starting Product Service without a database connection.');
    return false;
  }

  if (/USERNAME|PASSWORD|CLUSTER\.mongodb\.net/i.test(mongoUri)) {
    console.error('MONGO_URI still contains placeholder values. Starting Product Service without a database connection.');
    return false;
  }

  try {
    configureDnsServers();

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Atlas connected: ${connection.connection.host}`);
    return true;
  } catch (error) {
    console.error('Database connection failed. Starting Product Service without a database connection.');
    console.error(error.message);
    return false;
  }
};

module.exports = connectDB;
