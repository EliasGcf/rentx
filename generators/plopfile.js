const { useCasePlopConfig } = require('./config/useCase');
const { repositoryPlopConfig } = require('./config/repository');

function setGenerators(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('useCase', useCasePlopConfig);
  plop.setGenerator('repository', repositoryPlopConfig);
}

module.exports = setGenerators;
