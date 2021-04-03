const { readdirSync } = require('fs');
const path = require('path');

function getModules() {
  const allFiles = readdirSync(path.resolve(__dirname, '..', '..', 'src', 'modules'), {
    withFileTypes: true,
  });

  const modules = allFiles
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return modules;
}

module.exports = { getModules };
