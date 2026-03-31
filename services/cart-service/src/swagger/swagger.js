const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cart API',
      version: '1.0.0',
      description: 'API documentation for the Cart Service'
    },
    servers: [
      {
        url: 'http://localhost:5003'
      }
    ],
    components: {
      schemas: {
        CartItem: {
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
        Cart: {
          type: 'object',
          required: ['customerId'],
          properties: {
            customerId: {
              type: 'string',
              example: 'CUST001'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem'
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
            status: {
              type: 'string',
              example: 'active',
              enum: ['active', 'checked-out']
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
