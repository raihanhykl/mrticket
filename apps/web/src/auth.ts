// 'use server';
import NextAuth, { User } from 'next-auth';
import Credential from 'next-auth/providers/credentials';
import { api } from './config/axios.config';
import { jwtDecode } from 'jwt-decode';

export const { signIn, signOut, handlers, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credential({
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials?.email || !credentials?.password)
            return null;

          const res = await api.post('/auth/v1', {
            email: credentials?.email,
            password: credentials?.password,
          });
          const token = res.data.data;
          if (!token) throw new Error("Can't login");
          const user = jwtDecode<User>(token);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.first_name = token.first_name as string;
        session.user.last_name = token.last_name as string;
        session.user.email = token.email as string;
        session.user.phone_number = token.phone_number as string;
        session.user.referral_code = token.referral_code as string;
        session.user.f_referral_code = token.f_referral_code as string;
        session.user.roleId = token.roleId as number;
        session.user.poin = token.poin as number;
        session.user.exp_poin = token.exp_poin as Date;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        token.id = Number(user.id);
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.email = user.email;
        token.phone_number = user.phone_number;
        token.referral_code = user.referral_code;
        token.f_referral_code = user.f_referral_code;
        token.roleId = Number(user.roleId);
        token.poin = Number(user.poin);
        token.exp_poin = user.exp_poin;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
  },
});
