import { BcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { EmailService, SendEmailOptions } from './email.service';

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existsUser) throw CustomError.badRequest('Email already exists');

    try {
      const newUser = new UserModel(registerUserDto);
      newUser.password = BcryptAdapter.hash(registerUserDto.password);

      await newUser.save();
      await this.sendEmailValidation(newUser.email);
      const { password, ...user } = UserEntity.fromObject(newUser);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return { user, token };
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

  private sendEmailValidation = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('Error getting token');
    const link = `${envs.WEBSERVER_URL}api/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click n the following link to validate your email</p>
      <a href="${link}">Validate your email</a>
    `;

    const opt: SendEmailOptions = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    };

    const isSend = await this.emailService.sendEmail(opt);
    if (!isSend) throw CustomError.internalServer('Error sending email');
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unAuthorized('Invalid credentials');

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not found in token');

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer('Email not exist');

    user.emailValidated = true;
    await user.save();
    return true;
  };
}
