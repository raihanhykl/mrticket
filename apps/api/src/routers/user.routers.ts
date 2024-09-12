import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { validateToken } from '@/middlewares/validateToken';

export class UserRouter {
  private router = Router();
  private userController = new UserController();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.get('/get-user', validateToken, this.userController.getUser);
    this.router.post(
      '/addToCart',
      validateToken,
      this.userController.addToCart,
    );
    this.router.get('/cart', validateToken, this.userController.getCart);
    this.router.post('/check-out', validateToken, this.userController.checkOut);
    this.router.get(
      '/transaction',
      validateToken,
      this.userController.getTransaction,
    );
    this.router.post(
      '/review',
      validateToken,
      this.userController.createReview,
    );
  }
  public getRouter() {
    return this.router;
  }
}
