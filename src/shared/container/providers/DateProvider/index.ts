import { container } from 'tsyringe';

import { DayjsDateProvider } from './implementations/DayjsDateProvider';
import { IDateProvider } from './model/IDateProvider';

export * from './model/IDateProvider';
export * from './implementations/DayjsDateProvider';

const registeredDateProvider = {
  dateProvider: 'DateProvider',
} as const;

function register() {
  container.registerSingleton<IDateProvider>(
    registeredDateProvider.dateProvider,
    DayjsDateProvider,
  );
}

export { register, registeredDateProvider };
