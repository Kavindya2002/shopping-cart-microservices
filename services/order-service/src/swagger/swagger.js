const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order API',
      version: '1.0.0',
      description: 'API documentation for the Order Service'
    },
    servers: [
      {
        url: 'http://localhost:5004'
      }
    ],
    components: {
      schemas: {
        OrderItem: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              example: 'PROD001'
            },
            quantity: {
              type: 'number',
              example: 2
            },
            price: {
              type: 'number',
              example: 2500
            }
          }
        },
        Order: {
          type: 'object',
          required: ['customerId', 'cartId', 'orderItems', 'totalAmount'],
          properties: {
            customerId: {
              type: 'string',
              example: 'CUST001'
            },
            cartId: {
              type: 'string',
              example: 'CART001'
            },
            orderItems: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem'
              },
              example: [
                {
                  productId: 'PROD001',
                  quantity: 2,
                  price: 2500
                }
              ]
            },
            totalAmount: {
              type: 'number',
              example: 5000
            },
            orderStatus: {
              type: 'string',
              enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
              example: 'pending'
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
