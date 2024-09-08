import { AdminController } from '@/controllers/admin.controller';
import { Router } from 'express';
import { uploader } from '@/lib/uploader';

export class AdminRouter {
  private router = Router();
  private adminController = new AdminController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post('/create-event',uploader('EVENT', 'events').single('image'), this.adminController.createEvent);
    this.router.post('/create-ticket', this.adminController.createTicket);
    this.router.get('/event', this.adminController.getEvent);
    this.router.get(`/event/:event_id`, this.adminController.getEventDetail);
    this.router.get(`/event-ticket/:event_id`, this.adminController.getEventTicket);
  }
  public getRouter() {
    return this.router;
  }
}
