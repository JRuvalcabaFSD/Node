import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existsUser) throw CustomError.badRequest('Email already exists');

    try {
      const newUser = new UserModel(registerUserDto);
      newUser.password = BcryptAdapter.hash(registerUserDto.password);

      await newUser.save();
      const { password, ...user } = UserEntity.fromObject(newUser);
      return { user, token: 'ABC' };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
