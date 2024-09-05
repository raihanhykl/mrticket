import { ErrorHandler, responseHandle } from '@/helpers/response';
import { AdminService } from '@/services/admin.services';
import { Request, Response } from 'express';

export class AdminController {
  async createEvent(req: Request, res: Response) {
    try {
      const data = await AdminService.createEvent(req);
      return res.send(responseHandle('create event success', data));
    } catch {
      throw new ErrorHandler('create event failed', 400);
    }
  }
}
