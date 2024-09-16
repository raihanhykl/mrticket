import { AdminController } from '@/controllers/admin.controller';
import { Router } from 'express';
import { uploader } from '@/lib/uploader';
import { validateToken } from '@/middlewares/validateToken';

export class AdminRouter {
  private router = Router();
  private adminController = new AdminController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post(
      '/create-event',
      uploader('EVENT', 'events').single('image'),
      this.adminController.createEvent,
    );
    this.router.post('/create-ticket', this.adminController.createTicket);
    this.router.get('/search', this.adminController.searchEvent);
    this.router.get('/event', this.adminController.getEvent);
    this.router.patch('/delete-event', this.adminController.deleteEvent);
    this.router.post(
      '/update-event',
      uploader('EVENT', 'events').single('image'),
      validateToken,
      this.adminController.updateEvent,
    );
    this.router.get(
      '/event-organizer',
      validateToken,
      this.adminController.getEventByOrganizer,
    );
    this.router.get(
      '/event-transaction/:event_id',
      validateToken,
      this.adminController.getEventTransaction,
    );
    this.router.get(`/event/:event_id`, this.adminController.getEventDetail);
    this.router.get(
      `/event-ticket/:event_id`,
      this.adminController.getEventTicket,
    );
    this.router.get(
      '/get-transaction-by-date/:date',
      validateToken,
      this.adminController.getTotalTransactionByDate,
    );
  }
  public getRouter() {
    return this.router;
  }
}
