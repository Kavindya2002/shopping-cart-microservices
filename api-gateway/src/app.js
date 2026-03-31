const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const buildSwaggerSpec = require('./swagger/swagger');
const rootRoutes = require('./routes');
const registerProxies = require('./proxies/registerProxies');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const swaggerSpec = buildSwaggerSpec();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/docs-json', (req, res) => {
  res.status(200).json(swaggerSpec);
});

registerProxies(app);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
