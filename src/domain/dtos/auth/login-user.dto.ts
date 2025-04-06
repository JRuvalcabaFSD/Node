import { regularExps } from '../../../config';

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    if (!object) return ['Missing data'];

    const { email, password } = object;

    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password'];

    return [undefined, new LoginUserDto(email, password)];
  }
}
