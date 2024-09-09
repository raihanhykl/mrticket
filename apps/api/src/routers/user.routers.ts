import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';

export class UserRouter {
  private router = Router();
  private userController = new UserController();

  constructor() {
    this.routes();
  }


  private routes() {
    this.router.post('/addToCart', this.userController.addToCart);
    this.router.get('/cart/:user_id', this.userController.getCart);
  }
  public getRouter() {
    return this.router;
  }
}
