const { readdirSync } = require('fs');
const path = require('path');

function getProviders(includeProviderName = true) {
  const readPath = path.resolve(
    __dirname,
    '..',
    '..',
    'src',
    'shared',
    'container',
    'providers',
  );

  const allFiles = readdirSync(readPath, {
    withFileTypes: true,
  });

  const modules = allFiles
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return modules;
}

module.exports = { getProviders };
