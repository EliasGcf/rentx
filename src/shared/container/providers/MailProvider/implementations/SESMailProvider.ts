import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import aws from 'aws-sdk';
import fs from 'fs';

import { env } from '@shared/env';

import { ISendMailProviderDTO } from '../dtos';
import { IMailProvider } from '../model/IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      this.client = nodemailer.createTransport({
        SES: new aws.SES({
          apiVersion: '2010-12-01',
          region: env.AWS_SES_REGION,
        }),
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  async sendMail<T = Record<string, unknown>>({
    to,
    subject,
    variables,
    path,
  }: ISendMailProviderDTO<T>): Promise<void> {
    const templateFileContent = fs.readFileSync(path, 'utf-8');

    const templateParse = handlebars.compile<T>(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
