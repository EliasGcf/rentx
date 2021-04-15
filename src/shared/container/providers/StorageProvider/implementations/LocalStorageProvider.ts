import fs from 'fs';
import path from 'path';

import { uploadConfig } from '@config/upload';

import { IStorageProvider } from '../model/IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async moveFile(file: string, destinationFolder: string): Promise<string> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);
    const endPath = path.resolve(uploadConfig.tmpFolder, destinationFolder, file);

    await fs.promises.rename(filePath, endPath);

    return file;
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    const fileName = path.resolve(uploadConfig.tmpFolder, folder, file);

    try {
      await fs.promises.stat(fileName);
    } catch {
      return;
    }

    await fs.promises.unlink(fileName);
  }
}

export { LocalStorageProvider };
