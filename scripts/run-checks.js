const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const runNpmCommand = (args) => {
  if (process.platform === 'win32') {
    return {
      command: `npm ${args.join(' ')}`,
      args: [],
      shell: true
    };
  }

  return {
    command: 'npm',
    args,
    shell: false
  };
};

const commands = [
  {
    label: 'lint',
    ...runNpmCommand(['run', 'lint'])
  },
  {
    label: 'syntax',
    command: process.execPath,
    args: ['scripts/check-syntax.js'],
    shell: false
  },
  {
    label: 'tests',
    ...runNpmCommand(['test'])
  }
];

for (const step of commands) {
  console.log(`\n=== ${step.label} ===`);

  const result = spawnSync(step.command, step.args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: step.shell
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
