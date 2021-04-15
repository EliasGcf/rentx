import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProviders = {
  ethereal: new EtherealMailProvider(),
  ses: new SESMailProvider(),
};

export { mailProviders };
