import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContet: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}
  execute({ fileDestination = 'ouputs', fileName = 'table', fileContet }: Options): boolean {
    const filePath = path.join(__dirname, '..', '..', '..', fileDestination);

    try {
      mkdirSync(filePath, { recursive: true });
      writeFileSync(`${filePath}/${fileName}.txt`, fileContet);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
