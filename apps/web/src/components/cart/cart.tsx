'use client';
import { discountPrice } from '@/action/helper.action';
import { api } from '@/config/axios.config';
import useDebounce from '@/hooks/useDebounce';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type Props = {
  cart: any;

  handleDeleteCart: (id: number) => void;
  handleQuantity: (id: number, quantity: number) => void;
};

export default function Cart({
  cart,
  handleQuantity,
  handleDeleteCart,
}: Props) {
  const [qty, setQty] = useState<number>(cart.quantity);
  const { debounce } = useDebounce();
  const session = useSession();

  const updateQty = async () => {
    try {
      console.log(qty);

      let res = await api.patch(
        '/users/update-cart',
        { quantity: qty, cartId: cart.id },
        {
          headers: {
            Authorization: 'Bearer ' + session.data?.user?.access_token,
          },
        },
      );
      handleQuantity(cart.id, qty ? qty : 1);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const debounceQty = debounce(updateQty, 1000);

  useEffect(() => {
    debounceQty();
  }, [qty]);
  return (
    <div className="flex gap-5" key={cart.id}>
      <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
        <div className="flex gap-5 justify-start">
          <img
            className="max-h-[100px] rounded-xl"
            src={'http://localhost:8000/events/' + cart.Ticket.Event.image}
            alt=""
          />
          <div className="flex flex-col content-center justify-center text-left">
            <p>{cart.Ticket.Event.event_name}</p>
            <p>Ticket: {cart.Ticket.ticket_type}</p>
            <p>Ticket Price: Rp. {cart.Ticket.price.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="text-right content-center">
          <div className="flex items-center justify-end mb-2">
            <button
              type="button"
              onClick={() => setQty(qty - 1)}
              className="px-3 py-1 bg-gray-300 rounded-l-lg border-[1px]"
            >
              -
            </button>
            <input
              className="px-4 border-none w-16 text-center outline-none "
              type="number"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            ></input>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-gray-300 rounded-r-lg border-[1px]"
            >
              +
            </button>
          </div>
          <p>
            Price: Rp.{' '}
            {
              discountPrice(
                cart.Ticket.price,
                cart.Ticket.discount_price,
                cart.Ticket.disc_start_date,
                cart.Ticket.disc_end_date,
                cart.quantity,
              ).tag
            }
          </p>
          <button
            type="button"
            onClick={() => handleDeleteCart(cart.id)}
            className="text-red-600 mt-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
