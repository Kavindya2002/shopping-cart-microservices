const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const customerRoutes = require('./routes/customerRoutes');
const buildSwaggerSpec = require('./swagger/swagger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const swaggerSpec = buildSwaggerSpec();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Customer Service is running',
    service: process.env.SERVICE_NAME || 'customer-service',
    health: '/health',
    docs: '/docs',
    docsJson: '/docs-json',
    baseResource: '/api/customers'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: process.env.SERVICE_NAME || 'customer-service',
    timestamp: new Date().toISOString()
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/docs-json', (req, res) => {
  res.status(200).json(swaggerSpec);
});

app.use('/api/customers', customerRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
