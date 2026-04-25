const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment API',
      version: '1.0.0',
      description: 'API documentation for the Payment Service'
    },
    servers: [
      {
        url: 'http://localhost:5005'
      }
    ],
    components: {
      schemas: {
        Payment: {
          type: 'object',
          required: ['orderId', 'amount', 'paymentMethod'],
          properties: {
            orderId: {
              type: 'string',
              example: 'ORD001'
            },
            amount: {
              type: 'number',
              example: 5000
            },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'card', 'bank-transfer'],
              example: 'card'
            },
            paymentStatus: {
              type: 'string',
              enum: ['pending', 'paid', 'failed'],
              example: 'paid'
            },
            transactionDate: {
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
