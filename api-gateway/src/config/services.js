module.exports = [
  {
    name: 'product-service',
    docsSlug: 'products',
    gatewayPath: '/products',
    servicePath: '/api/products',
    target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001'
  },
  {
    name: 'customer-service',
    docsSlug: 'customers',
    gatewayPath: '/customers',
    servicePath: '/api/customers',
    target: process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5002'
  },
  {
    name: 'cart-service',
    docsSlug: 'cart',
    gatewayPath: '/cart',
    servicePath: '/api/cart',
    target: process.env.CART_SERVICE_URL || 'http://localhost:5003'
  },
  {
    name: 'order-service',
    docsSlug: 'orders',
    gatewayPath: '/orders',
    servicePath: '/api/orders',
    target: process.env.ORDER_SERVICE_URL || 'http://localhost:5004'
  },
  {
    name: 'payment-service',
    docsSlug: 'payments',
    gatewayPath: '/payments',
    servicePath: '/api/payments',
    target: process.env.PAYMENT_SERVICE_URL || 'http://localhost:5005'
  },
  {
    name: 'inventory-service',
    docsSlug: 'inventory',
    gatewayPath: '/inventory',
    servicePath: '/api/inventory',
    target: process.env.INVENTORY_SERVICE_URL || 'http://localhost:5006'
  }
];
