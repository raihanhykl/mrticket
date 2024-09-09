import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export class UserService {
  static async addToCart(req: Request) {
    try {
      const { userId, ticketId, quantity } = req.body;
      const data: Prisma.CartCreateInput = {
        quantity,
        Ticket: {
          connect: {
            id: ticketId,
          },
        },
        User: {
          connect: {
            id: userId,
          },
        },
      };

      return await prisma.cart.create({ data });
    } catch (error) {
      throw new Error('Failed add to cart!');
    }
  }

  static async getCart(req: Request) {
    try {
      // const { userId } = req.body;
      return await prisma.cart.findMany({
        where: {
          userId: Number(req.params.user_id)
        },
        include: {
          Ticket: {
            include: {
              Event: true,
            },
          }
        },
      });
    } catch (error) {
      throw new Error('Failed get cart!');
    };
  }
}
