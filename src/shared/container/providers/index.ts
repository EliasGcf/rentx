import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/model/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

import { IMailProvider } from './MailProvider/model/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

const registeredProviders = {
  dateProvider: 'DateProvider',
  mailProvider: 'MailProvider',
} as const;

function registerProviders() {
  container.registerSingleton<IDateProvider>(
    registeredProviders.dateProvider,
    DayjsDateProvider,
  );

  container.registerInstance<IMailProvider>(
    registeredProviders.mailProvider,
    new EtherealMailProvider(),
  );
}

export * from './DateProvider/implementations/DayjsDateProvider';
export * from './DateProvider/model/IDateProvider';

export * from './MailProvider/implementations/EtherealMailProvider';
export * from './MailProvider/model/IMailProvider';

export { registeredProviders, registerProviders };
