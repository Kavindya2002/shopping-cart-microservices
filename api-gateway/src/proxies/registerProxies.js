const services = require('../config/services');
const createServiceProxy = require('./createServiceProxy');

const registerProxies = (app) => {
  services.forEach((service) => {
    app.use(`/docs/${service.docsSlug}`, createServiceProxy(service, 'docs'));
    app.use(`/docs-json/${service.docsSlug}`, createServiceProxy(service, 'docs-json'));
    app.use(`${service.gatewayPath}/docs`, createServiceProxy(service, 'docs'));
    app.use(`${service.gatewayPath}/docs-json`, createServiceProxy(service, 'docs-json'));
    app.use(`${service.gatewayPath}/health`, createServiceProxy(service, 'health'));
    app.use(service.gatewayPath, createServiceProxy(service, 'resource'));
  });
};

module.exports = registerProxies;
