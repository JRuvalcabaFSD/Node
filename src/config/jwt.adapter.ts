import { sign, SignOptions } from 'jsonwebtoken';

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = '2h') {
    return new Promise((res) => {
      sign(payload, 'SEED', { expiresIn: duration } as SignOptions, (err, token) => {
        if (err) res(null);
        res(token);
      });
    });
  }
}
