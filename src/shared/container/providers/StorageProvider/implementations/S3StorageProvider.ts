import { S3 } from 'aws-sdk';
import mime from 'mime';
import path from 'path';
import fs from 'fs';

import { uploadConfig } from '@config/upload';

import { env } from '@shared/env';

import { IStorageProvider } from '../model/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: env.AWS_BUCKET_REGION,
    });
  }

  async moveFile(file: string, destinationFolder: string): Promise<string> {
    const originalName = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const fileContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${env.AWS_BUCKET}/${destinationFolder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: fileContentType || undefined,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
