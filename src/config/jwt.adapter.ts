import { sign, SignOptions, verify } from 'jsonwebtoken';
import { envs } from './envs';

const jwtSeed = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = '2h') {
    return new Promise((res) => {
      sign(payload, jwtSeed, { expiresIn: duration } as SignOptions, (err, token) => {
        if (err) res(null);
        res(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((res) => {
      verify(token, jwtSeed, (err, decoded) => {
        if (err) res(null);
        res(decoded as T);
      });
    });
  }
}
