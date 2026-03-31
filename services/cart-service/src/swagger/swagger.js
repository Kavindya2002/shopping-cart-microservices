const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Cart Service API',
        version: '1.0.0',
        description: 'CRUD operations for customer shopping carts.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5003}/api/cart`,
          description: 'Direct service access'
        },
        {
          url: `${process.env.GATEWAY_URL || 'http://localhost:3000'}/cart`,
          description: 'API Gateway access'
        }
      ],
      tags: [
        {
          name: 'Cart',
          description: 'Manage customer shopping carts'
        }
      ],
      components: {
        schemas: {
          Cart: {
            type: 'object',
            required: ["customerId"],
            properties: {
              customerId: { type: 'string' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: { type: 'string' },
                    productName: { type: 'string' },
                    quantity: { type: 'number' },
                    unitPrice: { type: 'number' },
                    size: { type: 'string' },
                    color: { type: 'string' }
                  }
                }
              },
              totalAmount: { type: 'number' },
              status: { type: 'string', enum: ['active', 'checked-out'] }
            },
            example: { customerId: 'CUS-1001', items: [{ productId: 'PROD-1001', productName: 'Linen Shirt', quantity: 2, unitPrice: 4500, size: 'L', color: 'White' }], totalAmount: 9000, status: 'active' }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
