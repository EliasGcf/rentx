import fs from 'fs';

export async function deleteFile(fileName: string) {
  try {
    await fs.promises.stat(fileName);
  } catch {
    return;
  }

  await fs.promises.unlink(fileName);
}
