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

  static async getEventByOrganizer(req: Request) {
    try {
      const data = await prisma.event.findMany({
        where: {
          userId: Number(req.user.id),
        },
      });
      return data;
    } catch (error) {
      throw new ErrorHandler('Failed to get data', 400);
    }
  }

  static async getTransactionByEvent(req: Request) {
    try {
      // const data = await prisma.transaction.findMany({
      //   where: {
      //     id: Number(req.params.transaction_id),
      //   },
      // });

      const groupedResult = await prisma.transactionDetail.groupBy({
        by: ['ticketId'], // Mengelompokkan berdasarkan ticketId
        _sum: {
          quantity: true, // Menghitung total quantity per ticket type
        },
        where: {
          Ticket: {
            Event: {
              userId: 8, // Memfilter event berdasarkan userId
              id: Number(req.params.event_id),
            },
          },
        },
      });

      const detailedResult = await Promise.all(
        groupedResult.map(async (item) => {
          // Ambil detail tiket dan event
          const ticketDetail = await prisma.ticket.findUnique({
            where: { id: Number(item.ticketId) },
            select: {
              ticket_type: true,
              Event: {
                select: {
                  event_name: true,
                  userId: true, // Ambil userId dari event
                },
              },
            },
          });

          // Ambil detail transaksi untuk mendapatkan user
          const transactionDetail = await prisma.transactionDetail.findMany({
            where: { ticketId: item.ticketId },
            select: {
              Transaction: {
                select: {
                  User: {
                    select: {
                      first_name: true,
                      last_name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          });

          return {
            ticketId: item.ticketId,
            ticket_type: ticketDetail?.ticket_type,
            event_name: ticketDetail?.Event?.event_name,
            quantity: item._sum.quantity,
            user:
              transactionDetail.length > 0
                ? transactionDetail[0].Transaction
                : null,
          };
        }),
      );

      // let data: any = [];

      // groupedResult.map((item) => {
      //   data.push({ quantity: item._sum.quantity, ticket_type: item.ticketId, userId: item. });
      // });

      return detailedResult;
    } catch (error) {
      throw new ErrorHandler('Failed to get data', 400);
    }
  }

  static async getTotalTransactionByDate(req: Request) {
    try {
      // const data = await prisma.transactionDetail.groupBy({});
    } catch (error) {}
  }
}
