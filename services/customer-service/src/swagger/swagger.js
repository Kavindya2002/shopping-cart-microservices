const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Customer Service API',
        version: '1.0.0',
        description: 'CRUD operations for customer profiles and contact details.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5002}/api/customers`,
          description: 'Direct service access'
        },
        {
          url: `${process.env.GATEWAY_URL || 'http://localhost:3000'}/customers`,
          description: 'API Gateway access'
        }
      ],
      tags: [
        {
          name: 'Customers',
          description: 'Manage clothing shop customers'
        }
      ],
      components: {
        schemas: {
          Customer: {
            type: 'object',
            required: ["firstName", "lastName", "email", "phone", "address"],
            properties: {
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              address: { type: 'string' },
              loyaltyPoints: { type: 'number' },
              status: { type: 'string', enum: ['active', 'inactive'] }
            },
            example: { firstName: 'Nimal', lastName: 'Perera', email: 'nimal@example.com', phone: '0771234567', address: '12 Flower Road, Colombo', loyaltyPoints: 20, status: 'active' }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
