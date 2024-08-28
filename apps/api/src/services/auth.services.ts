import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { compare, hash } from 'bcrypt';
import { generateToken } from '@/lib/jwt';
import { ErrorHandler } from '@/helpers/response';

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
  referral_code: string;
  f_referral_code: string;
  roleId: number;
}

export class AuthSerivce {
  static async login(req: Request) {
    const { email, password } = req.body;

    console.log(email + password + email, 'ini DI AUTH SERVICE');

    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as IUser;

    // console.log(user);

    if (!user) {
      throw new ErrorHandler('User not found', 400);
    }
    const checkPassword = await compare(password, user.password!);
    if (checkPassword) {
      delete user.password;
    } else throw new ErrorHandler('Password wrong', 400);
    return generateToken(user);
    // return user;
  }

  static async register(req: Request) {
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
          id: Number(roleId),
        },
      },
      poin: 0,
      exp_poin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    };

    return await prisma.user.create({ data });
  }
}
