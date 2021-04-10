const { getModules } = require('../utils/getModules');

/** @type {import('plop').PlopGenerator} */
const entityPlopConfig = {
  description: 'Create a new entity',
  prompts: [
    {
      type: 'list',
      name: 'module',
      message: 'In which module do you want to create?',
      choices: getModules(),
    },
    {
      type: 'input',
      name: 'entityName',
      message: 'What is the entity name?',
    },
  ],
  actions: [
    {
      type: 'add',
      path:
        '../src/modules/{{ module }}/infra/typeorm/entities/{{ pascalCase entityName }}.ts',
      templateFile: 'templates/entity/Entity.hbs',
    },
  ],
};

module.exports = { entityPlopConfig };
