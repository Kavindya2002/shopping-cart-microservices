const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Order Service API',
        version: '1.0.0',
        description: 'CRUD operations for customer orders in the clothing shop.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5004}/api/orders`,
          description: 'Direct service access'
        },
        {
          url: `${process.env.GATEWAY_URL || 'http://localhost:3000'}/orders`,
          description: 'API Gateway access'
        }
      ],
      tags: [
        {
          name: 'Orders',
          description: 'Manage customer orders'
        }
      ],
      components: {
        schemas: {
          Order: {
            type: 'object',
            required: ["customerId", "shippingAddress", "totalAmount"],
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
                    price: { type: 'number' }
                  }
                }
              },
              shippingAddress: { type: 'string' },
              totalAmount: { type: 'number' },
              orderStatus: { type: 'string', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
              paymentStatus: { type: 'string', enum: ['unpaid', 'paid', 'refunded'] }
            },
            example: { customerId: 'CUS-1001', items: [{ productId: 'PROD-1001', productName: 'Linen Shirt', quantity: 1, price: 4500 }], shippingAddress: '12 Flower Road, Colombo', totalAmount: 4500, orderStatus: 'pending', paymentStatus: 'unpaid' }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
