import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

interface IUploadConfig {
  upload(
    folder: string,
  ): {
    storage: multer.StorageEngine;
  };
}

const uploadConfig: IUploadConfig = {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          callback(null, fileName);
        },
      }),
    };
  },
};

export { uploadConfig };
