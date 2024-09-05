import { AdminController } from '@/controllers/admin.controller';
import { Router } from 'express';

export class AdminRouter {
  private router = Router();
  private adminController = new AdminController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post('/create-event', this.adminController.createEvent);
  }
  public getRouter() {
    return this.router;
  }
}
