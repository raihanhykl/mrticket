'use client';
import { api } from '@/config/axios.config';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { addToCart, checkOut } from '@/action/user.action';
import { Switch } from '@/components/ui/switch';
import { log } from 'console';
import { redirect } from 'next/navigation';
import { discountPrice } from '@/action/helper.action';
import useDebounce from '@/hooks/useDebounce';
import Cart from '@/components/cart/cart';

type Props = {};

export default function page({}: Props) {
  const [carts, setCarts] = useState<any>([]);
  const [userVoucher, setUserVoucher] = useState<any>([]);
  const session = useSession();
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [usePoin, setUsePoin] = useState(false);
  const [poin, setPoin] = useState<number>(0);
  const [voucher, setVoucher] = useState<number>();
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [finalPoin, setfinalPoin] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/users/cart`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });

      const userVoucher = await api.get('/users/user-voucher', {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      setCarts(res.data.data);
      setUserVoucher(userVoucher.data.data);
    };

    const getPoin = async () => {
      const res = await api.get('/users/get-user', {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      setPoin(res.data.data.poin);
      setfinalPoin(res.data.data.poin);
    };
    if (session.status == 'authenticated') {
      fetchData();
      getPoin();
    }
  }, [session, isCheckOut]);
  const handleIncreaseQuantity = (cartId: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.map((cart: any) =>
        cart.id === cartId ? { ...cart, quantity: cart.quantity + 1 } : cart,
      ),
    );
  };

  // useEffect(() => {
  //   let price;
  //   if (usePoin) {
  //     price = getTotalPrice(usePoin);
  //     setfinalPoin((prev) => prev - poin);
  //   } else {
  //     price = getTotalPrice();
  //     setfinalPoin((prev) => (prev = poin));
  //   }
  // }, [usePoin]);

  const handleQuantity = (cartId: number, quantity: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.map((cart: any) =>
        cart.id === cartId && cart.quantity > 0 ? { ...cart, quantity } : cart,
      ),
    );
  };

  // Delete cart item
  const handleDeleteCart = async (cartId: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.filter((cart: any) => cart.id !== cartId),
    );
    let res = await api.patch(
      '/users/delete-cart',
      { cartId: cartId },
      {
        headers: {
          Authorization: 'Bearer ' + session.data?.user?.access_token,
        },
      },
    );
  };

  const getTotalPrice = (usePoin: boolean = false) => {
    let res = carts.reduce((total: number, cart: any) => {
      return (
        total +
        discountPrice(
          cart.Ticket.price,
          cart.Ticket.discount_price,
          cart.Ticket.disc_start_date,
          cart.Ticket.disc_end_date,
          cart.quantity,
        ).final
      );
    }, 0);

    if (voucherAmount) res -= (voucherAmount / 100) * res;
    if (usePoin) {
      // res -= poin;
      if (poin > res) {
        // setfinalPoin(poin - res);
        res = 0;
      } else {
        res -= poin;
      }
    }
    // setfinalPoin(poin);
    return res;
  };

  useEffect(() => {
    getTotalPrice();
  }, [voucherAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const total_price = getTotalPrice(usePoin);
      const voucher_id = voucher;

      const access_token = String(session?.data?.user?.access_token);

      const values = carts.map((cart: any) => ({
        ticket_id: cart.Ticket.id,
        quantity: cart.quantity,
        price: cart.Ticket.price,
        discount: cart.Ticket.discount || 0,
        cartId: cart.id,
      }));

      await checkOut(access_token, voucher_id, usePoin);
      setIsCheckOut(!isCheckOut);
    } catch (error) {}

    // console.log('Selected carts:', carts);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 py-5 max-w-screen-xl px-5 border-2 mx-auto">
          {carts.map((cart: any) => (
            <Cart
              key={cart.id}
              cart={cart}
              handleQuantity={handleQuantity}
              handleDeleteCart={handleDeleteCart}
            />
          ))}

          <div className="text-right mt-5">
            <div className="flex items-center justify-end gap-2 text-sm">
              <p>Use {poin} Poin?</p>
              <Switch onCheckedChange={(e) => setUsePoin(e)} />
            </div>
            <h3 className=" text-lg md:text-xl font-bold">
              Total Price: Rp.{' '}
              {usePoin
                ? getTotalPrice(usePoin).toLocaleString('id-ID')
                : getTotalPrice().toLocaleString('id-ID')}
            </h3>
          </div>

          <div className="mt-5">
            <p className="text-left font-semibold mb-2">Available Voucher:</p>
            {getTotalPrice() > 0 &&
              userVoucher.map((voucher: any) => (
                <div
                  key={voucher.Voucher.id}
                  className="border-[1px] px-5 py-3 flex flex-col md:flex-row justify-between rounded-2xl w-full mb-2"
                >
                  <p>{voucher.Voucher.voucher_name}</p>
                  <div className="flex items-center justify-between gap-2 md:gap-5">
                    <p className="text-sm">{voucher.Voucher.voucher_desc}</p>
                    <Switch
                      onCheckedChange={(e: boolean) => {
                        setVoucher(voucher.id);
                        setVoucherAmount(e ? voucher.Voucher.amount : 0);
                        console.log(
                          'ini poin',
                          poin,
                          'ini final poin: ',
                          finalPoin,
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="my-5 btn btn-primary p-3 rounded-2xl border-[1px] w-full md:w-auto px-5"
          >
            Checkout
          </button>
        </div>
      </form>
    </>
  );
}
