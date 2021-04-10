import { ISendMailProviderDTO } from '../dtos';

interface IMailProvider {
  sendMail<T = Record<string, unknown>>(data: ISendMailProviderDTO<T>): Promise<void>;
}

export { IMailProvider };
