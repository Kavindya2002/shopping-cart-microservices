require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const swaggerSpec = require('./src/swagger/swagger');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'product-service',
    status: 'ok',
    message: 'Product Service is running'
  });
});

app.use('/api/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: 'Server error', error: error.message });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Product Service is running on port ${PORT}`);
  });
};

startServer();
