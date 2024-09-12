import { ErrorHandler } from '@/helpers/response';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export class UserService {
  static async getUser(req: Request) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: Number(req.user.id),
        },
      });
    } catch (error) {
      throw new Error('Failed get user!');
    }
  }
  static async addToCart(req: Request) {
    try {
      console.log(req.body, 'ini req body api service');

      const { ticketId, quantity } = req.body;
      const data: Prisma.CartCreateInput = {
        quantity,
        Ticket: {
          connect: {
            id: ticketId,
          },
        },
        User: {
          connect: {
            id: Number(req.user.id),
          },
        },
      };

      return await prisma.cart.create({ data });
    } catch (error) {
      throw new Error('Failed add to cart!');
    }
  }

  static async checkOut(req: Request) {
    return await prisma.$transaction(async (prisma) => {
      try {
        const { total_price, voucher_id, values, usePoint } = req.body;
        const data: Prisma.TransactionCreateInput = {
          invoice: 'INV-' + Date.now() + '/' + Math.floor(Math.random() * 100),
          transaction_date: new Date(),
          total_price,
          Voucher: {
            connect: {
              id: voucher_id,
            },
          },
          User: {
            connect: {
              id: Number(req.user.id),
            },
          },
        };
        const trans = await prisma.transaction.create({ data });

        if (usePoint) {
          const res = await prisma.user.update({
            where: {
              id: Number(req.user.id),
            },
            data: {
              poin: 0,
            },
          });
          console.log('ini res use point: ', res);
        }

        for (const value of values) {
          const { quantity, price, discount, ticket_id, cartId } = value;
          const dataDetail: Prisma.TransactionDetailCreateInput = {
            quantity,
            price,
            discount,
            Transaction: {
              connect: {
                id: trans.id,
              },
            },
            Ticket: {
              connect: {
                id: ticket_id,
              },
            },
          };
          await prisma.transactionDetail.create({ data: dataDetail });
          await prisma.cart.delete({ where: { id: Number(cartId) } });
          const stock = await prisma.ticket.findFirst({
            where: { id: Number(ticket_id) },
          });
          if (stock?.stock) {
            if (stock?.stock < quantity)
              throw new ErrorHandler('Stock tiket tidak cukup', 404);
            await prisma.ticket.update({
              where: {
                id: ticket_id,
              },
              data: {
                stock: {
                  decrement: quantity,
                },
              },
            });
          }
        }
      } catch (error) {
        throw new Error('Check Out Failed');
      }
    });
  }
  static async getCart(req: Request) {
    try {
      // const { userId } = req.body;
      return await prisma.cart.findMany({
        where: {
          userId: Number(req.user.id),
        },
        include: {
          Ticket: {
            include: {
              Event: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Failed get cart!');
    }
  }

  static async getTransaction(req: Request) {
    try {
      return await prisma.transaction.findMany({
        where: {
          userId: Number(req.user.id),
        },
        include: {
          transaction_detail: {
            include: {
              Ticket: {
                include: {
                  Event: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Failed get transaction!');
    }
  }

  static async review(req: Request) {
    try {
      console.log(req.body, 'ini req body api service');

      const { review, rating, eventId } = req.body;
      const check = await prisma.transaction.findFirst({
        where: {
          userId: Number(req.user.id),
          transaction_detail: {
            some: {
              Ticket: {
                eventId: Number(eventId), // Cari berdasarkan eventId yang sesuai
              },
            },
          },
        },
      });

      console.log(check, 'ini check');

      if (!check) {
        console.log('check nya gaada bg');

        throw new Error('Transaction not found, user not permitted');
      }

      const data: Prisma.ReviewCreateInput = {
        review,
        rating,
        Event: {
          connect: {
            id: Number(eventId),
          },
        },
        User: {
          connect: {
            id: Number(req.user.id),
          },
        },
      };
      const valid = await prisma.event;

      return await prisma.review.create({ data });
    } catch (error) {
      throw new Error('Failed to create review');
    }
  }
}
