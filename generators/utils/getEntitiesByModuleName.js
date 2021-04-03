const { readdirSync } = require('fs');
const path = require('path');

function getEntitiesByModuleName(module) {
  const allFiles = readdirSync(
    path.resolve(
      __dirname,
      '..',
      '..',
      'src',
      'modules',
      module,
      'infra',
      'typeorm',
      'entities',
    ),
    {
      withFileTypes: true,
    },
  );

  const entities = allFiles
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name.replace('.ts', ''));

  return entities;
}

module.exports = { getEntitiesByModuleName };
