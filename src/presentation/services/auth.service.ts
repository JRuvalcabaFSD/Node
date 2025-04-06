import { BcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

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

  public async loginUser(loginUserDto: LoginUserDto) {
    let credentialValid = false;

    const findUser = await UserModel.findOne({ email: loginUserDto.email });
    if (!findUser) throw CustomError.unAuthorized('Invalid credentials');
    credentialValid = BcryptAdapter.validate(loginUserDto.password, findUser.password);

    if (!credentialValid) throw CustomError.unAuthorized('Invalid credentials');
    const { password, ...user } = UserEntity.fromObject(findUser);
    const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
    if (!token) throw CustomError.internalServer('error wile creating JWT');
    return { user, token };
  }
}
