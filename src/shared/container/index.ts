import { register as registerProviders, registeredProviders } from './providers';
import { register as registerRepositories, registeredRepositories } from './repositories';

const registeredDependencies = {
  ...registeredRepositories,
  ...registeredProviders,
};

function register() {
  registerRepositories();
  registerProviders();
}

export { registeredDependencies, register };
