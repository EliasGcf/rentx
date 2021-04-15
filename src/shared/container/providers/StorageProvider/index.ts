import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';

const storageProviders = {
  disk: LocalStorageProvider,
  s3: S3StorageProvider,
};

export { storageProviders };
