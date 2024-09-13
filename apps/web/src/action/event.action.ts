'use server';
import { auth } from '@/auth';
import { api } from '@/config/axios.config';
import axios, { AxiosError } from 'axios';

export const addEventAction = async (
  formData: FormData,
  tickets: {
    ticket_type: string;
    price: number;
    stock: number;
    discount_price?: number | undefined;
    disc_start_date?: Date | undefined;
    disc_end_date?: Date | undefined;
  }[],
) => {
  const session = await auth();
  try {
    formData.append('userId', Number(session?.user.id).toString());

    const res = await api.post('/admin/create-event', formData, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });
    for (let index = 0; index < tickets.length; index++) {
      await api.post('/admin/create-ticket', {
        ...tickets[index],
        eventId: res.data.data.id,
      });
    }
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

export const updateEventAction = async (
  formData: FormData,
  sessionToken: String,
) => {
  try {
    console.log(formData, sessionToken);
    await api.post('/admin/update-event', formData, {
      headers: {
        Authorization: 'Bearer ' + sessionToken,
      },
    });
  } catch (error) {
    console.log('gagal update');
  }
};
