// 'use client';
import { auth } from '@/auth';
import { api } from '@/config/axios.config';
import { log } from 'console';
import { useSession } from 'next-auth/react';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

export const addToCart = async (
  cart: { ticketId: Number; quantity: Number }[],
  access_token: string,
) => {
  // const session = useSession();
  try {
    // const userId = session?.data?.user.access_token;
    console.log(cart);
    console.log('INI UAT :', access_token);

    for (let index = 0; index < cart.length; index++) {
      if (cart[index].quantity) {
        await api.post(
          '/users/addToCart',
          {
            ticketId: cart[index].ticketId,
            quantity: cart[index].quantity,
          },
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        );
      }
    }
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const checkOut = async (
  access_token: string,
  total_price: number,
  voucher_id: number | undefined,
  usePoint: boolean,
  values: {
    quantity: number;
    price: number | undefined;
    discount: number | undefined;
    ticket_id: number | undefined;
    cartId: number | undefined;
  }[],
) => {
  try {
    await api.post(
      '/users/check-out',
      { total_price, voucher_id, values, usePoint },
      {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      },
    );
    return {
      message: 'Check Out berhasil!',
    };
  } catch (error) {
    throw new Error('Check Out gagal.');
  }
};

export const addReview = async (
  access_token: string,
  eventId: number,
  review: string,
  rating: number,
) => {
  try {
    console.log('access_token', access_token);
    console.log('eventId', eventId);
    console.log('review', review);
    console.log('rating', rating);

    await api.post(
      '/users/review',
      {
        eventId,
        review,
        rating,
      },
      {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      },
    );
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
};
