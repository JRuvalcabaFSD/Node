import { UploadedFile } from 'express-fileupload';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { CustomError } from '../../domain';
import { Uuid } from '../../config';

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!existsSync(folderPath)) mkdirSync(folderPath);
  }

  public async uploadSimple(file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? '';
      const destination = resolve(__dirname, '../../../', folder);

      this.checkFolder(destination);
      if (!validExtensions.includes(fileExtension)) throw CustomError.badRequest(`Type of file not allowed, valid ones ${validExtensions}`);

      const fileName = `${this.uuid()}.${fileExtension}`;
      file.mv(`${destination}/${fileName}`);
      return { fileName };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async uploadMultiple(files: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {
    const fileNames = await Promise.all(files.map((file) => this.uploadSimple(file, folder, validExtensions)));

    return fileNames;
  }
}
