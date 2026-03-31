const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const inventoryRoutes = require('./routes/inventoryRoutes');
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
    message: 'Inventory Service is running',
    service: process.env.SERVICE_NAME || 'inventory-service',
    health: '/health',
    docs: '/docs',
    docsJson: '/docs-json',
    baseResource: '/api/inventory'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: process.env.SERVICE_NAME || 'inventory-service',
    timestamp: new Date().toISOString()
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/docs-json', (req, res) => {
  res.status(200).json(swaggerSpec);
});

app.use('/api/inventory', inventoryRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
