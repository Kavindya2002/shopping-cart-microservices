const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const buildSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Inventory Service API',
        version: '1.0.0',
        description: 'CRUD operations for product stock and warehouse tracking.'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5006}/api/inventory`,
          description: 'Direct service access'
        },
        {
          url: `${process.env.GATEWAY_URL || 'http://localhost:3000'}/inventory`,
          description: 'API Gateway access'
        }
      ],
      tags: [
        {
          name: 'Inventory',
          description: 'Manage inventory levels'
        }
      ],
      components: {
        schemas: {
          Inventory: {
            type: 'object',
            required: ["productId", "sku", "stockQuantity", "warehouseLocation"],
            properties: {
              productId: { type: 'string' },
              sku: { type: 'string' },
              stockQuantity: { type: 'number' },
              reservedQuantity: { type: 'number' },
              reorderLevel: { type: 'number' },
              warehouseLocation: { type: 'string' },
              status: { type: 'string', enum: ['in-stock', 'low-stock', 'out-of-stock'] }
            },
            example: { productId: 'PROD-1001', sku: 'SKU-TSHIRT-001', stockQuantity: 150, reservedQuantity: 10, reorderLevel: 20, warehouseLocation: 'Warehouse A - Shelf 3', status: 'in-stock' }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  });
};

module.exports = buildSwaggerSpec;
