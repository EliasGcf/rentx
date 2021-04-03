const { getModules } = require('../utils/getModules');

/** @type {import('plop').PlopGenerator} */
const useCasePlopConfig = {
  description: 'Create a useCase workflow',
  prompts: [
    {
      type: 'list',
      name: 'module',
      message: 'In which module do you want to create?',
      choices: getModules(),
    },
    {
      type: 'input',
      name: 'useCaseName',
      message: 'What is the useCase name?',
    },
  ],
  actions: [
    {
      type: 'addMany',
      destination: '../src/modules/{{ module }}/useCases/{{ camelCase useCaseName }}',
      templateFiles: 'templates/useCase',
      base: 'templates/useCase',
    },
  ],
};

module.exports = { useCasePlopConfig };
