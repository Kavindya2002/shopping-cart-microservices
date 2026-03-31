const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for the Product Service'
    },
    servers: [
      {
        url: 'http://localhost:5001'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string',
              example: 'Classic T-Shirt'
            },
            price: {
              type: 'number',
              example: 1999
            },
            description: {
              type: 'string',
              example: 'Soft cotton t-shirt for daily wear'
            },
            category: {
              type: 'string',
              example: 'Men'
            },
            stock: {
              type: 'number',
              example: 25
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
