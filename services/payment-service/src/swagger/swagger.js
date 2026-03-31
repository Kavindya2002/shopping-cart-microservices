const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Payment Service API',
        version: '1.0.0',
        description: 'CRUD operations for order payment records.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5005}/api/payments`,
          description: 'Direct service access'
        },
        {
          url: `${process.env.GATEWAY_URL || 'http://localhost:3000'}/payments`,
          description: 'API Gateway access'
        }
      ],
      tags: [
        {
          name: 'Payments',
          description: 'Manage payment transactions'
        }
      ],
      components: {
        schemas: {
          Payment: {
            type: 'object',
            required: ["orderId", "customerId", "amount", "method", "transactionReference"],
            properties: {
              orderId: { type: 'string' },
              customerId: { type: 'string' },
              amount: { type: 'number' },
              method: { type: 'string', enum: ['card', 'cash-on-delivery', 'online-transfer'] },
              currency: { type: 'string' },
              paymentStatus: { type: 'string', enum: ['pending', 'completed', 'failed', 'refunded'] },
              transactionReference: { type: 'string' }
            },
            example: { orderId: 'ORD-1001', customerId: 'CUS-1001', amount: 4500, method: 'card', currency: 'LKR', paymentStatus: 'completed', transactionReference: 'TXN-1001' }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
