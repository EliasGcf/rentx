const { entityPlopConfig } = require('./config/entity');
const { useCasePlopConfig } = require('./config/useCase');
const { providerPlopConfig } = require('./config/provider');
const {
  implementationRepositoryPlopConfig,
  inMemoryRepositoryPlopConfig,
} = require('./config/repository');

function setGenerators(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('entity', entityPlopConfig);
  plop.setGenerator('useCase', useCasePlopConfig);
  plop.setGenerator('provider', providerPlopConfig);
  plop.setGenerator('repository', implementationRepositoryPlopConfig);
  plop.setGenerator('in-memory repository', inMemoryRepositoryPlopConfig);
}

module.exports = setGenerators;
