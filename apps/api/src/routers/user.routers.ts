import { Request, Response, Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { validateToken } from '@/middlewares/validateToken';
import { sendVerificationEmail } from '@/lib/nodemailer';
import { verifyEmail } from '@/middlewares/verify';

export class UserRouter {
  private router = Router();
  private userController = new UserController();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.get('/get-user', validateToken, this.userController.getUser);
    this.router.post(
      '/addToCart',
      validateToken,
      this.userController.addToCart,
    );
    this.router.get(
      '/get-user-verif',
      verifyEmail,
      this.userController.getUserVerif,
    );
    this.router.get('/cart', validateToken, this.userController.getCart);
    this.router.patch(
      '/update-cart',
      validateToken,
      this.userController.updateCart,
    );
    this.router.patch(
      '/delete-cart',
      validateToken,
      this.userController.deleteCart,
    );
    this.router.post('/check-out', validateToken, this.userController.checkOut);
    this.router.get(
      '/transaction',
      validateToken,
      this.userController.getTransaction,
    );
    this.router.post(
      '/review',
      validateToken,
      this.userController.createReview,
    );

    this.router.get('/review', validateToken, this.userController.getReview);

    this.router.get(
      '/user-voucher',
      validateToken,
      this.userController.getUserVoucher,
    );

    this.router.post('/test', async (req: Request, res: Response) => {
      const { email } = req.body;
      await sendVerificationEmail(email, {
        email,
        verification_url: 'testing',
      });

      res.send('sent');
    });
  }
  public getRouter() {
    return this.router;
  }
}
