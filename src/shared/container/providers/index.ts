import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/model/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

import { IMailProvider } from './MailProvider/model/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

import { IHashProvider } from './HashProvider/model/IHashProvider';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';

import { IJWTProvider } from './JWTProvider/model/IJWTProvider';
import { JsonWebTokenProvider } from './JWTProvider/implementations/JsonWebTokenProvider';

const registeredProviders = {
  dateProvider: 'DateProvider',
  mailProvider: 'MailProvider',
  hashProvider: 'HashProvider',
  JWTProvider: 'JWTProvider',
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

  container.registerSingleton<IHashProvider>(
    registeredProviders.hashProvider,
    BCryptHashProvider,
  );

  container.registerSingleton<IJWTProvider>(
    registeredProviders.JWTProvider,
    JsonWebTokenProvider,
  );
}

export * from './DateProvider/implementations/DayjsDateProvider';
export * from './DateProvider/model/IDateProvider';

export * from './MailProvider/implementations/EtherealMailProvider';
export * from './MailProvider/model/IMailProvider';

export * from './HashProvider/implementations/BCryptHashProvider';
export * from './HashProvider/model/IHashProvider';

export * from './JWTProvider/implementations/JsonWebTokenProvider';
export * from './JWTProvider/model/IJWTProvider';

export { registeredProviders, registerProviders };
