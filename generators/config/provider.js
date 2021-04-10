const { getProviders } = require('../utils/getProviders');

/** @type {import('plop').PlopGenerator} */
const providerPlopConfig = {
  description: 'Create a new provider',
  prompts: [
    {
      type: 'checkbox',
      name: 'files',
      message: 'What files do you want to create?',
      choices: ['Model', 'Implementation'],
      default: ['Model'],
    },
    {
      type: 'input',
      name: 'providerName',
      message: 'What is the provider name?',
      validate: answer => !!answer,
      when: answers => answers.files.includes('Model'),
    },
    {
      type: 'list',
      name: 'providerName',
      message: 'In what provider do you want to create?',
      choices: getProviders(),
      when: answers =>
        !answers.files.includes('Model') && answers.files.includes('Implementation'),
    },
    {
      type: 'input',
      name: 'implementationProviderName',
      message: 'What is the implementation provider name?',
      validate: answer => !!answer,
      when: answers => answers.files.includes('Implementation'),
    },
  ],
  actions: answers => {
    const actions = [];

    if (!answers.files.includes('Model') && answers.files.includes('Implementation')) {
      answers.providerName = answers.providerName.replace('Provider', '');
    }

    if (answers.files.includes('Model')) {
      actions.push({
        type: 'add',
        path:
          '../src/shared/container/providers/{{ pascalCase providerName }}Provider/model/I{{ pascalCase providerName }}Provider.ts',
        templateFile: 'templates/provider/Model.hbs',
      });
    }

    if (answers.files.includes('Implementation')) {
      actions.push({
        type: 'add',
        path:
          '../src/shared/container/providers/{{ pascalCase providerName }}Provider/implementations/{{ pascalCase implementationProviderName }}Provider.ts',
        templateFile: 'templates/provider/Implementation.hbs',
      });
    }

    return actions;
  },
};

module.exports = { providerPlopConfig };

// [
//   {
//     type: 'addMany',
//     destination:
//       '../src/shared/container/providers/{{ pascalCase providerName }}Provider',
//     templateFiles: 'templates/provider',
//     base: 'templates/provider',
//   },
// ];
