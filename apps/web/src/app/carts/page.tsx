'use client';
import { api } from '@/config/axios.config';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { checkOut } from '@/action/user.action';
import { log } from 'console';
import { redirect } from 'next/navigation';

type Props = {};

export default function page({}: Props) {
  const [carts, setCarts] = useState<any>([]);
  const [selectedCarts, setSelectedCarts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const session = useSession();
  const [isCheckOut, setIsCheckOut] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/users/cart`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      setCarts(res.data.data);
    };

    if (session.status == 'authenticated') {
      fetchData();
    }
  }, [session, isCheckOut]);
  
  // Handle checkbox change
  // const handleCheckboxChange = (cartId: number) => {
  //   setSelectedCarts((prevSelected) => {
  //     if (prevSelected.includes(cartId)) {
  //       return prevSelected.filter((id) => id !== cartId); // Remove if already selected
  //     } else {
  //       return [...prevSelected, cartId]; // Add if not selected
  //     }
  //   });
  // };

  // Handle "Select All" checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allCartIds = carts.map((cart: any) => cart.id);
      setSelectedCarts(allCartIds);
    } else {
      setSelectedCarts([]);
    }
  };

  // Increase quantity
  const handleIncreaseQuantity = (cartId: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.map((cart: any) =>
        cart.id === cartId ? { ...cart, quantity: cart.quantity + 1 } : cart,
      ),
    );
  };

  // Decrease quantity
  const handleDecreaseQuantity = (cartId: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.map((cart: any) =>
        cart.id === cartId && cart.quantity > 1
          ? { ...cart, quantity: cart.quantity - 1 }
          : cart,
      ),
    );
  };

  // Delete cart item
  const handleDeleteCart = (cartId: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.filter((cart: any) => cart.id !== cartId),
    );
  };

  const getTotalPrice = () => {
    return carts.reduce((total: number, cart: any) => {
      return total + cart.quantity * cart.Ticket.price;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const total_price = getTotalPrice();
      const voucher_id = 1;

      const access_token = String(session?.data?.user?.access_token);

      const values = carts.map((cart: any) => ({
        ticket_id: cart.Ticket.id,
        quantity: cart.quantity,
        price: cart.Ticket.price,
        discount: cart.Ticket.discount || 0,
        cartId: cart.id,
      }));

      console.log(values);

      await checkOut(access_token, total_price, voucher_id, values);
      
      setIsCheckOut(!isCheckOut)
    } catch (error) {}

    // console.log('Selected carts:', carts);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 py-5 max-w-screen-xl px-5 border-2">
          {carts.map((cart: any) => (
            <div className="flex gap-5" key={cart.id}>
              {/* <div className="content-center">
                <input
                  type="checkbox"
                  checked={selectedCarts.includes(cart.id)}
                  onChange={() => handleCheckboxChange(cart.id)}
                />
              </div> */}
              <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
                <div className="flex gap-5 justify-start">
                  <img
                    className="max-h-[100px] rounded-xl"
                    src={
                      'http://localhost:8000/events/' + cart.Ticket.Event.image
                    }
                    alt=""
                  />
                  <div className="flex flex-col content-center justify-center text-left">
                    <p>{cart.Ticket.Event.event_name}</p>
                    <p>Ticket: {cart.Ticket.ticket_type}</p>
                    <p>
                      Ticket Price: Rp.{' '}
                      {cart.Ticket.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="text-right content-center">
                  <div className="flex items-center justify-end mb-2">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQuantity(cart.id)}
                      className="px-3 py-1 bg-gray-300 rounded-l-lg border-[1px]"
                    >
                      -
                    </button>
                    <span className="px-4">{cart.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleIncreaseQuantity(cart.id)}
                      className="px-3 py-1 bg-gray-300 rounded-r-lg border-[1px]"
                    >
                      +
                    </button>
                  </div>
                  <p>Price: Rp. {cart.quantity * cart.Ticket.price}</p>
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
          ))}

          <div className="text-right mt-5">
            <h3 className="text-xl font-bold">
              Total Price: Rp. {getTotalPrice().toLocaleString('id-ID')}
            </h3>
          </div>
        </div>
        <button
          type="submit"
          className="my-5 btn btn-primary p-3 rounded-2xl border-[1px] content-end"
        >
          Checkout
        </button>
      </form>
    </>
  );
}
