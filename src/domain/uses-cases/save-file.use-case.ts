import { mkdirSync, writeFileSync } from 'fs';

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
    try {
      mkdirSync(fileDestination, { recursive: true });
      writeFileSync(`${fileDestination}/${fileName}.txt`, fileContet);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
