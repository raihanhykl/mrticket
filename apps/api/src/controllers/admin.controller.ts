import { ErrorHandler, responseHandle } from '@/helpers/response';
import { AdminService } from '@/services/admin.services';
import { Request, Response } from 'express';

export class AdminController {
  async createEvent(req: Request, res: Response) {
    try {
      const data = await AdminService.createEvent(req);
      console.log(data);

      return res.send(responseHandle('create event success', data));
    } catch {
      throw new ErrorHandler('create event failed', 400);
    }
  }
  async createTicket(req: Request, res: Response) {
    try {
      const data = await AdminService.createTicket(req);
      return res.send(responseHandle('create ticket success', data));
    } catch {
      throw new ErrorHandler('create ticket failed', 400);
    }
  }
}
