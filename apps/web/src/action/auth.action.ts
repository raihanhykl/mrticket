'use server';
import { signIn, signOut } from '@/auth';

export const loginAction = async (values: {
  email: string;
  password: string;
}) => {
  try {
    await signIn('credentials', {
      redirect: true,
      redirectTo: '/',
      email: values.email!,
      password: values.password!,
    });

    return {
      message: 'Login Success',
    };
  } catch (e) {
    throw e;
  }
};

export const actionLogout = async () => {
  return await signOut({ redirect: true, redirectTo: '/login' });
};
