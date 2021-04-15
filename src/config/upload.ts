import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

import { env } from '@shared/env';

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;

  storage: multer.StorageEngine;
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const uploadConfig = {
  driver: env.STORAGE_DRIVER || 'disk',

  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
} as IUploadConfig;

export { uploadConfig };
