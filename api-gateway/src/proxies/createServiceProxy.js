const { createProxyMiddleware } = require('http-proxy-middleware');

const appendPath = (targetPrefix, currentPath, options = {}) => {
  if (!currentPath || currentPath === '/') {
    if (options.trailingSlash) {
      return `${targetPrefix}/`;
    }

    return targetPrefix;
  }

  return `${targetPrefix}${currentPath}`;
};

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
      pathRewrite: (path) => appendPath('/docs', path, { trailingSlash: true })
    });
  }

  if (type === 'docs-json') {
    return createProxyMiddleware({
      ...baseOptions,
      pathRewrite: (path) => appendPath('/docs-json', path)
    });
  }

  if (type === 'health') {
    return createProxyMiddleware({
      ...baseOptions,
      pathRewrite: (path) => appendPath('/health', path)
    });
  }

  return createProxyMiddleware({
    ...baseOptions,
    pathRewrite: (path) => appendPath(service.servicePath, path)
  });
};

module.exports = createServiceProxy;
