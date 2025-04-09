import { isValidObjectId } from 'mongoose';

export class Validators {
  static isMongoId(id: string) {
    return isValidObjectId(id);
  }
}
