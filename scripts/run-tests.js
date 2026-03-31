const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const packages = [
  'api-gateway',
  'services/cart-service',
  'services/customer-service',
  'services/inventory-service',
  'services/order-service',
  'services/payment-service',
  'services/product-service'
];

for (const packagePath of packages) {
  console.log(`=== ${packagePath} ===`);

  const result = spawnSync(process.platform === 'win32' ? 'npm test' : 'npm', process.platform === 'win32' ? [] : ['test'], {
    cwd: path.join(rootDir, packagePath),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
