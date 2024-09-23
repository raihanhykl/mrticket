import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/user.services';
import { responseHandle, ErrorHandler } from '@/helpers/response';

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getUser(req);
      return res.send(responseHandle('Success Get User', data));
    } catch (error) {
      next(error);
    }
  }
  async getUserVerif(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getUserVerif(req);
      return res.send(responseHandle('Success Get User', data));
    } catch (error) {
      next(error);
    }
  }
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

  async getReview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getReview(req);
      return res.send(responseHandle('Success Get Review', data));
    } catch (error) {
      next(error);
    }
  }

  async getUserVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getUserVoucher(req);
      return res.send(responseHandle('Success Get User Voucher', data));
    } catch (error) {
      next(error);
    }
  }
  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.updateCart(req);
      return res.send(responseHandle('Success Update Cart', data));
    } catch (error) {
      next(error);
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.deleteCart(req);
      return res.send(responseHandle('Success Delete Cart', data));
    } catch (error) {
      next(error);
    }
  }
}
