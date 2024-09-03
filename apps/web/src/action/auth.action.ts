'use server';
import { signIn, signOut } from '@/auth';
import { api } from '@/config/axios.config';

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

export const actionRegister = async (
  values: {
    email: string;
    password: string;
    phone_number: string;    
    first_name: string;
    last_name: string;
    f_referral_code?: string;
    roleId: number;
  },
) => {
  try {
    await api.post('/auth/v2', values);
    return {
      message: 'Register Berhasil',
    };
  } catch (error) {
    console.log(error);

    throw new Error('Register Gagal');
  }
};
