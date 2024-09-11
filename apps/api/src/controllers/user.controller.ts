import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/user.services';
import { responseHandle, ErrorHandler } from '@/helpers/response';

export class UserController {
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.addToCart(req);
      return res.send(responseHandle('Success Add To Cart', data));
    } catch (error) {
      next(error);
    }
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getCart(req);
      return res.send(responseHandle('Success Get Cart', data));
    } catch (error) {
      next(error);
    }
  }

  async checkOut(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.checkOut(req);
      return res.send(responseHandle('Check Out SUccess', data));
    } catch (error) {
      next(error);
    }
  }

  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getTransaction(req);
      return res.send(responseHandle('Success Get Transaction', data));
    } catch (error) {
      next(error);
    }
  }
  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.review(req);
      return res.send(responseHandle('Success Create Review', data));
    } catch (error) {
      next(error);
    }
  }
}
