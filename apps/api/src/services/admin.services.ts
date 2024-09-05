import { ErrorHandler } from '@/helpers/response';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export class AdminService {
  static async createEvent(req: Request) {
    try {
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
            id: userId,
          },
        },
      };

      return await prisma.event.create({ data });
    } catch (error) {
      throw new ErrorHandler('Failed to create event', 400);
    }
  }
}
