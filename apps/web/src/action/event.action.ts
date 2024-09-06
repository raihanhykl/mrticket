'use server';
import { auth } from '@/auth';
import { api } from '@/config/axios.config';
import axios, { AxiosError } from 'axios';

export const addEventAction = async (values: {
    // userId: string;
    event_name: string;
    event_desc: string;
    category: string;
    location: string;
    start_date: Date;
    end_date: Date;
    start_time: string;
    end_time: string;
}) => {
  const session = await auth()
  try {
    const data = {...values, userId: Number(session?.user.id)}
    console.log(data);
    
    await api.post('/admin/create-event', data);
    return {
      message: 'Event Berhasil Ditambahkan',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error('Register Gagal');
  }
};
