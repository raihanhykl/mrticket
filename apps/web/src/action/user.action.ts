'use server';
import { auth } from '@/auth';
import { api } from '@/config/axios.config';
import { log } from 'console';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

export const addToCart = async (
  cart: { ticketId: Number; quantity: Number }[],
) => {
  const session = await auth();
  try {
    const userId = session?.user.id;
    console.log(cart);
    console.log(userId);
    
    for (let index = 0; index < cart.length; index++) {
        if(cart[index].quantity){
            await api.post('/user/addToCart', {
              userId,
              ...cart[index],
            });
        }
    }
    return { success: true };
  } catch (error) {
        console.log(error);
  }
};

export const getCart = async () => {
  const session = await auth();
  try {
    const userId = session?.user.id;
    const res = await api.get(`/user/cart/${userId}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
