const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer API',
      version: '1.0.0',
      description: 'API documentation for the Customer Service'
    },
    servers: [
      {
        url: 'http://localhost:5002'
      }
    ],
    components: {
      schemas: {
        Customer: {
          type: 'object',
          required: ['fullName', 'email', 'phone', 'address'],
          properties: {
            fullName: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              example: 'john@example.com'
            },
            phone: {
              type: 'string',
              example: '0771234567'
            },
            address: {
              type: 'string',
              example: 'Colombo, Sri Lanka'
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
