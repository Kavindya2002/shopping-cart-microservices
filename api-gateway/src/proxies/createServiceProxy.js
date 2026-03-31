const { createProxyMiddleware } = require('http-proxy-middleware');

const createServiceProxy = (service, type) => {
  const baseOptions = {
    target: service.target,
    changeOrigin: true,
    logLevel: 'silent',
    onError: (err, req, res) => {
      res.status(502).json({
        success: false,
        message: `Unable to reach ${service.name}`,
        error: err.message
      });
    }
  };

  if (type === 'docs') {
    return createProxyMiddleware({
      ...baseOptions,
      pathRewrite: (path) => path.replace(new RegExp(`^${service.gatewayPath}/docs`), '/docs')
    });
  }

  if (type === 'docs-json') {
    return createProxyMiddleware({
      ...baseOptions,
      pathRewrite: (path) => path.replace(new RegExp(`^${service.gatewayPath}/docs-json`), '/docs-json')
    });
  }

  if (type === 'health') {
    return createProxyMiddleware({
      ...baseOptions,
      pathRewrite: (path) => path.replace(new RegExp(`^${service.gatewayPath}/health`), '/health')
    });
  }

  return createProxyMiddleware({
    ...baseOptions,
    pathRewrite: (path) => path.replace(new RegExp(`^${service.gatewayPath}`), service.servicePath)
  });
};

module.exports = createServiceProxy;
