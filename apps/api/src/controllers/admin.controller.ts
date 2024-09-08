import { ErrorHandler, responseHandle } from '@/helpers/response';
import { AdminService } from '@/services/admin.services';
import { Request, Response } from 'express';

export class AdminController {

  async getEvent(req: Request, res: Response){
    try {
      const data = await AdminService.getEvent(req)
      return res.send(responseHandle("Getting data success", data))
    } catch (error) {
      throw new ErrorHandler("Failed to get event", 400) 
    }
  }
  async getEventDetail(req: Request, res: Response){
    try {
      const data = await AdminService.getEventDetail(req)
      return res.send(responseHandle("Getting event detail success", data))
    } catch (error) {
      throw new ErrorHandler("Failed to get event details", 400)
    }
  }

  async getEventTicket(req: Request, res: Response){
    try {
      const data = await AdminService.getEventTicket(req)
      return res.send(responseHandle("Getting event detail success", data))
    } catch (error) {
      throw new ErrorHandler("Failed to get event details", 400)
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
}
