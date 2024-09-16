import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { verify_email_secret } from '@/config';
export const verifyEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;
  const user = verify(token, verify_email_secret);
  req.user = user;
  next();
};
