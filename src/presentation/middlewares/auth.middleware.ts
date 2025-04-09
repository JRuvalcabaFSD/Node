import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserEntity } from '../../domain';
import { UserModel } from '../../data';

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) {
      res.status(401).json({ error: 'No token provider' });
      return;
    }

    if (!authorization.startsWith('Bearer ')) {
      res.status(400).json({ error: 'Invalid Bearer token' });
      return;
    }

    const token = authorization.split(' ').at(-1) || '';

    if (!req.body) req.body = {};

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ error: 'Invalid token - user' });
        return;
      }
      const newUser = UserEntity.fromObject(user);

      req.body.user = newUser;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
