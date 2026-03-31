const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Product Service API',
        version: '1.0.0',
        description: 'CRUD operations for the clothing product catalog.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5001}/api/products`,
          description: 'Direct service access'
        },
        {
          url: `${process.env.GATEWAY_URL || 'http://localhost:3000'}/products`,
          description: 'API Gateway access'
        }
      ],
      tags: [
        {
          name: 'Products',
          description: 'Manage clothing products'
        }
      ],
      components: {
        schemas: {
          Product: {
            type: 'object',
            required: ["name", "description", "category", "price"],
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              category: { type: 'string' },
              price: { type: 'number' },
              sizes: {
                type: 'array',
                items: { type: 'string' }
              },
              colors: {
                type: 'array',
                items: { type: 'string' }
              },
              imageUrl: { type: 'string' },
              isActive: { type: 'boolean' }
            },
            example: { name: 'Classic Denim Jacket', description: 'Stylish blue denim jacket', category: 'Outerwear', price: 8500, sizes: ['S', 'M', 'L'], colors: ['Blue'], imageUrl: 'https://example.com/jacket.jpg', isActive: true }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
