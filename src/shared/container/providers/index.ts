import { container } from 'tsyringe';

import { mailConfig } from '@config/mail';
import { uploadConfig } from '@config/upload';

import { IDateProvider } from './DateProvider/model/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

import { mailProviders } from './MailProvider';
import { IMailProvider } from './MailProvider/model/IMailProvider';

import { IHashProvider } from './HashProvider/model/IHashProvider';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';

import { IJWTProvider } from './JWTProvider/model/IJWTProvider';
import { JsonWebTokenProvider } from './JWTProvider/implementations/JsonWebTokenProvider';

import { storageProviders } from './StorageProvider';
import { IStorageProvider } from './StorageProvider/model/IStorageProvider';

const registeredProviders = {
  dateProvider: 'DateProvider',
  mailProvider: 'MailProvider',
  hashProvider: 'HashProvider',
  JWTProvider: 'JWTProvider',
  storageProvider: 'StorageProvider',
} as const;

function registerProviders() {
  container.registerSingleton<IDateProvider>(
    registeredProviders.dateProvider,
    DayjsDateProvider,
  );

  container.registerInstance<IMailProvider>(
    registeredProviders.mailProvider,
    mailProviders[mailConfig.driver],
  );

  container.registerSingleton<IHashProvider>(
    registeredProviders.hashProvider,
    BCryptHashProvider,
  );

  container.registerSingleton<IJWTProvider>(
    registeredProviders.JWTProvider,
    JsonWebTokenProvider,
  );

  container.registerSingleton<IStorageProvider>(
    registeredProviders.storageProvider,
    storageProviders[uploadConfig.driver],
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

export * from './StorageProvider/implementations/LocalStorageProvider';
export * from './StorageProvider/model/IStorageProvider';

export { registeredProviders, registerProviders };
