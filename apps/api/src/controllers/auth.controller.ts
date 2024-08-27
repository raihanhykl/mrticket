import { responseHandle } from '@/helpers/response';
import { AuthSerivce } from '@/services/auth.services';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthSerivce.login(req);
      return res.send(responseHandle('login success', data));
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthSerivce.register(req);
      return res.send(responseHandle('register success', data));
    } catch (error) {
      next(error);
    }
  }
}
