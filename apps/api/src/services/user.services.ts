import { ErrorHandler } from '@/helpers/response';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { number } from 'zod';

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
  static async getUserVerif(req: Request) {
    try {
      return await prisma.user.findUnique({
        where: {
          email: req.user.email,
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

  static async checkOutBackup(req: Request) {
    return await prisma.$transaction(async (prisma) => {
      try {
        const { total_price, voucher_id, values, usePoint } = req.body;
        console.log(
          'ini total price: ',
          total_price,
          'ini voucher id: ',
          voucher_id,
          'ini values: ',
          values,
          'ini use point: ',
          usePoint,
        );
        const data: Prisma.TransactionCreateInput = {
          invoice: 'INV-' + Date.now() + '/' + Math.floor(Math.random() * 100),
          transaction_date: new Date(),
          total_price,
          User: {
            connect: {
              id: Number(req.user.id),
            },
          },
        };
        console.log(voucher_id, 'ini voucher id');

        if (voucher_id) {
          console.log('ini voucher id: ', voucher_id);
          const checkVoucher = await prisma.userVoucher.findUnique({
            where: {
              id: Number(voucher_id),
            },
          });

          if (!checkVoucher) throw new ErrorHandler('Voucher not valid', 400);
          data.UserVoucher = {
            connect: {
              id: Number(voucher_id),
            },
          };

          await prisma.userVoucher.update({
            where: {
              id: Number(voucher_id),
            },
            data: {
              is_used: true,
            },
          });
        }
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

  static async checkOut(req: Request) {
    const { voucher_id, usePoint } = req.body;
    const { id } = req.user;

    await prisma.$transaction(async (prisma) => {
      try {
        console.log('here');

        const data = {
          invoice: 'INV-' + Date.now() + '/' + Math.floor(Math.random() * 100),
          transaction_date: new Date(),
          total_price: 0,
          User: {
            connect: {
              id,
            },
          },
        } as Prisma.TransactionCreateInput;
        const newTransaction = await prisma.transaction.create({
          data,
        });

        const userCarts = await prisma.cart.findMany({
          include: {
            Ticket: true,
          },
          where: {
            userId: id,
          },
        });
        let total = 0;
        for (let i = 0; i < userCarts.length; i++) {
          let discount = 0;
          if (
            userCarts[i].Ticket?.disc_start_date &&
            userCarts[i].Ticket?.disc_end_date
          ) {
            if (
              userCarts[i].Ticket?.disc_start_date! >= new Date() &&
              userCarts[i].Ticket?.disc_end_date! <= new Date()
            ) {
              discount = Number(userCarts[i].Ticket?.discount_price || 0);
            }
          }

          //update stock
          await prisma.ticket.update({
            data: {
              stock: {
                decrement: userCarts[i].quantity!,
              },
            },
            where: { id: userCarts[i].ticketId! },
          });

          total +=
            (userCarts[i].Ticket?.price! - discount) * userCarts[i].quantity;

          const newTransDetail = {
            quantity: userCarts[i].quantity,
            price: userCarts[i].Ticket?.price,
            discount: Number(userCarts[i].Ticket?.discount_price || 0),
            Transaction: {
              connect: {
                id: newTransaction.id,
              },
            },
            Ticket: {
              connect: {
                id: userCarts[i].ticketId,
              },
            },
          } as Prisma.TransactionDetailCreateInput;
          await prisma.transactionDetail.create({
            data: newTransDetail,
          });
        }

        const updatedTransaction = {} as Prisma.TransactionUpdateInput;

        const currentUser = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!currentUser) throw new ErrorHandler('User not found', 404);

        if (voucher_id) {
          const checkVoucher = await prisma.userVoucher.findUnique({
            include: {
              Voucher: true,
            },
            where: {
              id: Number(voucher_id),
              is_used: false,
            },
          });
          if (!checkVoucher) throw new ErrorHandler('Voucher not valid', 400);

          await prisma.userVoucher.update({
            where: {
              id: Number(voucher_id),
            },
            data: {
              is_used: true,
            },
          });

          updatedTransaction.UserVoucher = {
            connect: {
              id: Number(voucher_id),
            },
          };

          total = total - (total * checkVoucher.Voucher?.amount!) / 100;
        }

        if (usePoint) {
          console.log(usePoint, total, currentUser.poin);

          updatedTransaction.poin_used =
            total > currentUser.poin ? currentUser.poin : total;

          await prisma.user.update({
            where: {
              id,
            },
            data: {
              poin: currentUser.poin - updatedTransaction.poin_used,
            },
          });
        }

        updatedTransaction.total_price =
          total > currentUser.poin ? total - currentUser.poin : 0;
        await prisma.transaction.update({
          where: {
            id: newTransaction.id,
          },
          data: updatedTransaction,
        });

        await prisma.cart.deleteMany({
          where: {
            userId: id,
          },
        });
      } catch (error) {}
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

  static async updateCart(req: Request) {
    try {
      const { quantity, cartId } = req.body;

      return await prisma.cart.update({
        where: {
          id: Number(cartId),
        },
        data: {
          quantity,
        },
      });
    } catch (error) {
      throw new Error('Failed update cart!');
    }
  }

  static async deleteCart(req: Request) {
    try {
      const { cartId } = req.body;

      return await prisma.cart.delete({
        where: {
          id: cartId,
        },
      });
    } catch (error) {
      throw new Error('Failed delete cart!');
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

      const { review, rating, eventId, transactionId } = req.body;
      const check = await prisma.transaction.findFirst({
        where: {
          userId: Number(req.user.id),
          transaction_detail: {
            some: {
              Ticket: {
                eventId: Number(eventId),
              },
            },
          },
        },
      });

      const check2 = await prisma.review.findFirst({
        where: {
          userId: Number(req.user.id),
          eventId: Number(eventId),
          transactionId: Number(transactionId),
        },
      });

      console.log(check, 'ini check');

      if (!check) {
        console.log('check nya gaada bg');
        throw new Error('Transaction not found, user not permitted');
      }

      if (!check2) {
        const data: Prisma.ReviewCreateInput = {
          review,
          rating,
          Transaction: {
            connect: {
              id: Number(transactionId),
            },
          },
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
        // const valid = await prisma.event;

        return await prisma.review.create({ data });
      }
    } catch (error) {
      throw new Error('Failed to create review');
    }
  }

  static async getUserVoucher(req: Request) {
    try {
      return await prisma.userVoucher.findMany({
        where: {
          userId: Number(req.user.id),
          is_used: false,
          valid_date: {
            gte: new Date(),
          },
        },
        include: {
          Voucher: true,
        },
      });
    } catch (error) {
      throw new Error('Failed to get user voucher');
    }
  }

  static async getReview(req: Request) {
    try {
      // console.log(
      //   'ini id user: ',
      //   req.user.id,
      //   'ini id event: ',
      //   req.params.event_id,
      // );
      return await prisma.review.findMany({
        where: {
          userId: Number(req.user.id),
          // Event: {
          //   id: Number(req.params.event_id),
          // },
        },
        include: {
          Event: true,
        },
      });
    } catch (error) {
      throw new Error('Failed to get all review');
    }
  }
}
