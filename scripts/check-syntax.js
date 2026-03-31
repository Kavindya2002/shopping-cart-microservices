const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const sourceRoots = ['api-gateway', 'services', 'scripts'];
const skippedDirectories = new Set(['node_modules', 'coverage', 'dist', '.git']);

const collectJavaScriptFiles = (directory) => {
  const absoluteDirectory = path.join(rootDir, directory);

  if (!fs.existsSync(absoluteDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(absoluteDirectory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const relativePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (skippedDirectories.has(entry.name)) {
        return [];
      }

      return collectJavaScriptFiles(relativePath);
    }

    return entry.name.endsWith('.js') ? [relativePath] : [];
  });
};

const files = sourceRoots.flatMap(collectJavaScriptFiles);

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: rootDir,
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Syntax check passed for ${files.length} JavaScript files.`);
