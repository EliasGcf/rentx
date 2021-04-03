const { getModules } = require('../utils/getModules');
const { getEntitiesByModuleName } = require('../utils/getEntitiesByModuleName');

/** @type {import('plop').PlopGenerator} */
const repositoryPlopConfig = {
  description: 'Create a repository',
  prompts: [
    {
      type: 'list',
      name: 'module',
      message: 'In which module do you want to create?',
      choices: getModules(),
    },
    {
      type: 'list',
      name: 'entity',
      message: 'For which entity is this repository?',
      choices: answers => getEntitiesByModuleName(answers.module),
    },
    {
      type: 'input',
      name: 'pluralEntity',
      default: answers => `${answers.entity}s`,
      message: 'Confirm if this is a correct plural',
    },
  ],
  actions: [
    {
      type: 'add',
      path:
        '../src/modules/{{ module }}/repositories/I{{ pascalCase pluralEntity }}Repository.ts',
      templateFile: 'templates/repository/IRepository.hbs',
    },
    {
      type: 'append',
      separator: '',
      path: '../src/modules/{{ module }}/repositories/index.ts',
      template: "export * from './I{{ pascalCase pluralEntity }}Repository';\n",
    },
    {
      type: 'add',
      path:
        '../src/modules/{{ module }}/infra/typeorm/repositories/{{ pascalCase pluralEntity }}Repository.ts',
      templateFile: 'templates/repository/TypeORMRepository.hbs',
    },
    {
      type: 'append',
      separator: '',
      path: '../src/modules/{{ module }}/infra/typeorm/repositories/index.ts',
      template: "export * from './{{ pascalCase pluralEntity }}Repository';\n",
    },
  ],
};

module.exports = { repositoryPlopConfig };
