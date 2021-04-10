import { registerProviders, registeredProviders } from './providers';
import { registerRepositories, registeredRepositories } from './repositories';

const registeredDependencies = {
  ...registeredRepositories,
  ...registeredProviders,
};

function registerDependencies() {
  registerRepositories();
  registerProviders();
}

export { registeredDependencies, registerDependencies };
