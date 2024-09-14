import { ErrorHandler, responseHandle } from '@/helpers/response';
import { AdminService } from '@/services/admin.services';
import { Request, Response } from 'express';

export class AdminController {
  async getEvent(req: Request, res: Response) {
    try {
      const data = await AdminService.getEvent(req);
      return res.send(responseHandle('Getting data success', data));
    } catch (error) {
      throw new ErrorHandler('Failed to get event', 400);
    }
  }
  async searchEvent(req: Request, res: Response) {
    try {
      const data = await AdminService.searchEvent(req);
      return res.send(responseHandle('success search event', data));
    } catch (error) {
      throw new ErrorHandler('Failed to search Event', 400);
    }
  }
  async getEventDetail(req: Request, res: Response) {
    try {
      const data = await AdminService.getEventDetail(req);
      return res.send(responseHandle('Getting event detail success', data));
    } catch (error) {
      throw new ErrorHandler('Failed to get event details', 400);
    }
  }

  async getEventTicket(req: Request, res: Response) {
    try {
      const data = await AdminService.getEventTicket(req);
      return res.send(responseHandle('Getting event detail success', data));
    } catch (error) {
      throw new ErrorHandler('Failed to get event details', 400);
    }
  }
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

  async getEventByOrganizer(req: Request, res: Response) {
    try {
      const data = await AdminService.getEventByOrganizer(req);
      return res.send(responseHandle('get event success', data));
    } catch {
      throw new ErrorHandler('get event failed', 400);
    }
  }

  async getEventTransaction(req: Request, res: Response) {
    try {
      const data = await AdminService.getTransactionByEvent(req);
      console.log(data);
      return res.send(responseHandle('get transaction success', data));
    } catch {
      throw new ErrorHandler('get transaction failed', 400);
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      console.log(req.body, 'ini req di controller');

      const data = await AdminService.updateEvent(req);
      // console.log(data);

      return res.send(responseHandle('update event success', data));
    } catch {
      throw new ErrorHandler('update event failed', 400);
    }
  }

  async getTotalTransactionByDate(req: Request, res: Response) {
    try {
      const data = await AdminService.getTotalTransactionByDate(req);
      console.log(data);
      return res.send(responseHandle('get transaction success', data));
    } catch {
      throw new ErrorHandler('get transaction failed', 400);
    }
  }
}
