import { ISendMailProviderDTO } from '../dtos';
import { IMailProvider } from '../model/IMailProvider';

class InMemoryMailProvider implements IMailProvider {
  private mails: ISendMailProviderDTO[] = [];

  async sendMail(data: ISendMailProviderDTO<any>): Promise<void> {
    this.mails.push(data);
  }
}

export { InMemoryMailProvider };
