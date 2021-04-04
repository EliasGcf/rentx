const { getModules } = require('../../utils/getModules');
const { getEntitiesByModuleName } = require('../../utils/getEntitiesByModuleName');

const { inMemoryRepositoryActions } = require('./inMemoryRepository');

/** @type {import('plop').PlopGenerator} */
const implementationRepositoryPlopConfig = {
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
    {
      type: 'confirm',
      name: 'shouldCreateInMemory',
      message: 'Do you want to create a in-memory repository?',
      default: true,
    },
  ],
  actions: answers => {
    let actions = [
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
    ];

    if (answers.shouldCreateInMemory) {
      actions = actions.concat(inMemoryRepositoryActions);
    }

    return actions;
  },
};

module.exports = { implementationRepositoryPlopConfig };
