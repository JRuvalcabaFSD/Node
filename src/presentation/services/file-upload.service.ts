import { UploadedFile } from 'express-fileupload';
import { existsSync, mkdir, mkdirSync } from 'fs';
import { resolve } from 'path';
import { CustomError } from '../../domain';

export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string) {
    if (!existsSync(folderPath)) mkdirSync(folderPath);
  }

  public async uploadMultiple(file: any[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {}

  public async uploadSimple(file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {
    const fileExtension = file.mimetype.split('/').at(1);
    const destination = resolve(__dirname, '../../../', folder);
    this.checkFolder(destination);

    try {
      file.mv(`${destination}/mi-image.${fileExtension}`);
    } catch (error) {
      console.log(error);

      throw CustomError.internalServer();
    }
  }
}
