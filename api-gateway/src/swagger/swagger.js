const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Shopping Cart API Gateway',
        version: '1.0.0',
        description: 'Central entry point that hides the internal ports of all microservices.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: 'Gateway base URL'
        }
      ],
      tags: [
        {
          name: 'Gateway',
          description: 'Gateway metadata and health endpoints'
        }
      ]
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
