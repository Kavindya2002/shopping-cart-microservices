require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./src/config/db');
const orderRoutes = require('./src/routes/orderRoutes');
const swaggerSpec = require('./src/swagger/swagger');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'order-service',
    status: mongoose.connection.readyState === 1 ? 'ok' : 'degraded',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    message: 'Order Service is running'
  });
});

app.use('/api/orders', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database not connected. Update MONGO_URI and restart the service.'
    });
  }

  next();
}, orderRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs-json', (req, res) => {
  res.status(200).json(swaggerSpec);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: 'Server error',
    error: error.message
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
  });
};

startServer();
