import { register as registerDateProvider, registeredDateProvider } from './DateProvider';

export * from './DateProvider';

const registeredProviders = {
  ...registeredDateProvider,
};

function register() {
  registerDateProvider();
}

export { registeredProviders, register };
