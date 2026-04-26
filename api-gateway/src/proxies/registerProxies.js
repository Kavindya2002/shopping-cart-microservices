const services = require('../config/services');
const createServiceProxy = require('./createServiceProxy');

const redirectToTrailingSlash = (mountPath) => (req, res, next) => {
  const queryStart = req.originalUrl.indexOf('?');
  const pathname = queryStart === -1 ? req.originalUrl : req.originalUrl.slice(0, queryStart);

  if (pathname === mountPath) {
    const query = queryStart === -1 ? '' : req.originalUrl.slice(queryStart);
    return res.redirect(301, `${mountPath}/${query}`);
  }

  return next();
};

const registerProxies = (app) => {
  services.forEach((service) => {
    const docsPath = `/docs/${service.docsSlug}`;
    const legacyDocsPath = `${service.gatewayPath}/docs`;

    app.use(docsPath, redirectToTrailingSlash(docsPath), createServiceProxy(service, 'docs'));
    app.use(`/docs-json/${service.docsSlug}`, createServiceProxy(service, 'docs-json'));
    app.use(legacyDocsPath, redirectToTrailingSlash(legacyDocsPath), createServiceProxy(service, 'docs'));
    app.use(`${service.gatewayPath}/docs-json`, createServiceProxy(service, 'docs-json'));
    app.use(`${service.gatewayPath}/health`, createServiceProxy(service, 'health'));
    app.use(service.gatewayPath, createServiceProxy(service, 'resource'));
  });
};

module.exports = registerProxies;
