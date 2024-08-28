/** @format */

declare module 'next-auth' {
  interface User {
    id: number | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    phone_number: string | undefined;
    referral_code: string | undefined;
    f_referral_code: string | undefined;
    poin: number | undefined;
    exp_poin: Date | undefined;
    roleId: number | undefined;
  }

  interface Session {
    user: User;
  }
}

import { JWT } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: number | undefined;
    phone_number: string | undefined;
    email: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    poin: number | undefined;
    exp_poin: Date | undefined;
    referral_code: string | undefined;
    f_referral_code: string | undefined;
    roleId: number | undefined;
  }
}
