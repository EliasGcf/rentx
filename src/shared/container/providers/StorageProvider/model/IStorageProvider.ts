interface IStorageProvider {
  moveFile(file: string, destinationFolder: string): Promise<string>;
  deleteFile(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
