import { ErrorHandler } from '@/helpers/response';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export class AdminService {
  static async getEvent(req: Request) {
    try {
      const data = await prisma.event.findMany({});
      return data;
    } catch (error) {
      throw new ErrorHandler('Failed to get data', 400);
    }
  }

  static async searchEvent(req: Request) {
    try {
      const search = req.query.search;
      console.log(search, 'testtttttt');

      const data = await prisma.event.findMany({
        where: {
          event_name: {
            contains: String(search),
          },
        },
      });

      return data;
    } catch (error) {
      throw new ErrorHandler('failed to search event', 400);
    }
  }

  static async getEventDetail(req: Request) {
    try {
      const data = await prisma.event.findUnique({
        where: {
          id: Number(req.params.event_id),
        },
      });
      return data;
    } catch (error) {
      throw new ErrorHandler('Failed to get data', 400);
    }
  }

  static async getEventTicket(req: Request) {
    try {
      const data = await prisma.ticket.findMany({
        where: {
          eventId: Number(req.params.event_id),
        },
      });
      return data;
    } catch (error) {
      throw new ErrorHandler('Failed to get data', 400);
    }
  }
  static async createEvent(req: Request) {
    try {
      console.log(req.body);
      console.log(req.file, 'ini req file');

      // const image = req.file?.filename;
      const {
        event_name,
        event_desc,
        location,
        start_date,
        end_date,
        start_time,
        end_time,
        category,
        userId,
      } = req.body;

      const data: Prisma.EventCreateInput = {
        event_name,
        event_desc,
        location,
        start_date,
        end_date,
        start_time,
        end_time,
        category,
        User: {
          connect: {
            id: Number(userId),
          },
        },
      };

      if (req?.file) {
        const image = req.file;
        data.image = image.filename;
      }

      return await prisma.event.create({ data });
    } catch (error) {
      throw new ErrorHandler('Failed to create event', 400);
    }
  }
  static async createTicket(req: Request) {
    try {
      const {
        ticket_type,
        price,
        stock,
        eventId,
        discount_price,
        disc_start_date,
        disc_end_date,
      } = req.body;
      const data: Prisma.TicketCreateInput = {
        ticket_type,
        price,
        stock,
        discount_price,
        Event: {
          connect: {
            id: eventId,
          },
        },
        disc_start_date: disc_start_date || null,
        disc_end_date: disc_end_date || null,
      };
      return await prisma.ticket.create({ data });
    } catch (error) {
      throw new ErrorHandler('Failed to create ticket', 400);
    }
  }

  static async updateEvent(req: Request) {
    try {
      console.log(req.body);

      const {
        event_name,
        event_desc,
        location,
        start_date,
        end_date,
        start_time,
        end_time,
        category,
      } = req.body;

      const data: Prisma.EventUpdateInput = {
        event_name,
        event_desc,
        location,
        start_date,
        end_date,
        start_time,
        end_time,
        category,
        User: {
          connect: {
            id: Number(req.user.id),
          },
        },
      };

      if (req?.file) {
        const image = req.file;
        data.image = image.filename;
      }

      return await prisma.event.update({
        where: {
          id: 1,
        },
        data,
      });
    } catch (error) {
      console.log('ini error', error);
    }
  }
}
