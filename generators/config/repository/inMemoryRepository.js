const { getModules } = require('../../utils/getModules');
const { getEntitiesByModuleName } = require('../../utils/getEntitiesByModuleName');

/** @type {import('plop').PlopGenerator['actions']} */
const inMemoryRepositoryActions = [
  {
    type: 'add',
    path:
      '../src/modules/{{ module }}/repositories/in-memory/InMemory{{ pascalCase pluralEntity }}Repository.ts',
    templateFile: 'templates/repository/InMemoryRepository.hbs',
  },
  {
    type: 'append',
    separator: '',
    path: '../src/modules/{{ module }}/repositories/in-memory/index.ts',
    template: "export * from './InMemory{{ pascalCase pluralEntity }}Repository';\n",
  },
];

/** @type {import('plop').PlopGenerator} */
const inMemoryRepositoryPlopConfig = {
  description: 'Create a inMemory repository',
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
  actions: inMemoryRepositoryActions,
};

module.exports = { inMemoryRepositoryPlopConfig, inMemoryRepositoryActions };
