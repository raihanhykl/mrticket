import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { NextFunction, Request } from 'express';
import { compare, hash } from 'bcrypt';
import { generateTokeEmailVerification, generateToken } from '@/lib/jwt';
import { ErrorHandler } from '@/helpers/response';
import IUser from '@/interfaces/user';
import { sendVerificationEmail } from '@/lib/nodemailer';
import { verification_url } from '@/config';

export class AuthSerivce {
  static async login(req: Request) {
    const { email, password } = req.body;

    console.log(email + password + email, 'ini DI AUTH SERVICE');

    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as IUser;

    console.log(user);

    if (!user) {
      throw new ErrorHandler('User not found', 400);
    }
    if (user.is_verified == false) {
      throw new ErrorHandler('User not verified', 400);
    }
    const checkPassword = await compare(password, user.password!);
    if (checkPassword) {
      delete user.password;
    } else throw new ErrorHandler('Password wrong', 400);
    return generateToken(user);
    // return user;
  }

  static async register(req: Request) {
    return await prisma.$transaction(async (prisma) => {
      try {
        const {
          email,
          password,
          phone_number,
          first_name,
          last_name,
          f_referral_code,
          roleId,
        } = req.body;

        const hashPassword = await hash(password, 10);
        const data: Prisma.UserCreateInput = {
          first_name,
          last_name,
          email,
          phone_number,
          password: hashPassword,
          referral_code: Math.random().toString(36).slice(2, 9).padEnd(7, '0'),
          f_referral_code,
          Role: {
            connect: {
              id: roleId,
            },
          },
          poin: 0,
          exp_poin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        };

        const newUser = await prisma.user.create({ data });

        if (f_referral_code != '') {
          const referral = (await prisma.user.findFirst({
            where: {
              referral_code: f_referral_code,
            },
          })) as IUser;
          if (!referral) throw new ErrorHandler('Referral code not found', 400);
          console.log(referral + ': INI REFERRAL');

          await prisma.user.update({
            where: {
              id: Number(referral?.id),
            },
            data: {
              poin: {
                increment: 10000,
              },
              exp_poin: new Date(
                new Date().setMonth(new Date().getMonth() + 3),
              ),
            },
          });
          await prisma.userVoucher.create({
            data: {
              userId: newUser.id,
              voucherId: 1,
              is_used: false,
              valid_date: new Date(
                new Date().setMonth(new Date().getMonth() + 3),
              ),
            },
          });
        }
        const token = generateTokeEmailVerification({ email });
        console.log('masukk', email, token, verification_url);

        return sendVerificationEmail(email, {
          email,
          verification_url: verification_url + token,
        });
      } catch (error) {
        throw new ErrorHandler((error as Error).message, 400);
      }
    });
  }
  static async verifyEmail(req: Request) {
    const { email } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new ErrorHandler('User not found', 400);
    else if (user.is_verified)
      throw new ErrorHandler('User already verified', 400);
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        is_verified: true,
      },
    });
  }
}
