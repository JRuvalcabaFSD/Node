import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
    return;
  };

  registerUser = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    this.authService
      .registerUser(data!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
  loginUser = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.authService
      .loginUser(data!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    this.authService
      .validateEmail(token)
      .then(() => res.json('Email validate'))
      .catch((error) => this.handleError(error, res));
  };
}
