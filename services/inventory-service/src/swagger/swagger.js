const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      version: '1.0.0',
      description: 'API documentation for the Inventory Service'
    },
    servers: [
      {
        url: 'http://localhost:5006'
      }
    ],
    components: {
      schemas: {
        Inventory: {
          type: 'object',
          required: ['productId', 'availableStock', 'warehouseLocation'],
          properties: {
            productId: {
              type: 'string',
              example: 'PROD001'
            },
            availableStock: {
              type: 'number',
              example: 100
            },
            warehouseLocation: {
              type: 'string',
              example: 'Colombo Warehouse'
            },
            lastUpdated: {
              type: 'string',
              format: 'date-time',
              example: '2026-03-31T10:00:00.000Z'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
