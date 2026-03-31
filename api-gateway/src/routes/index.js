const express = require('express');

const services = require('../config/services');

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get gateway information
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: Gateway metadata and proxied routes
 */
router.get('/', (req, res) => {
  const serviceList = services.map((service) => ({
    name: service.name,
    gatewayPath: service.gatewayPath,
    directServiceUrl: service.target,
    docsPath: `/docs/${service.docsSlug}`,
    proxiedDocs: `${service.gatewayPath}/docs`,
    proxiedHealth: `${service.gatewayPath}/health`
  }));

  res.status(200).json({
    message: 'Shopping Cart API Gateway is running',
    gateway: process.env.GATEWAY_NAME || 'api-gateway',
    docs: '/docs',
    docsJson: '/docs-json',
    health: '/health',
    services: serviceList
  });
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check gateway health
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: Gateway health information
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    gateway: process.env.GATEWAY_NAME || 'api-gateway',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
