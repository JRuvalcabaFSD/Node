import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class BcryptAdapter {
  static hash = (password: string) => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  };

  static validate = (password: string, hash: string) => {
    return compareSync(password, hash);
  };
}
