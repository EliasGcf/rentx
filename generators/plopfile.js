const { useCasePlopConfig } = require('./config/useCase');
const {
  implementationRepositoryPlopConfig,
  inMemoryRepositoryPlopConfig,
} = require('./config/repository');

function setGenerators(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('useCase', useCasePlopConfig);
  plop.setGenerator('repository', implementationRepositoryPlopConfig);
  plop.setGenerator('in-memory repository', inMemoryRepositoryPlopConfig);
}

module.exports = setGenerators;
