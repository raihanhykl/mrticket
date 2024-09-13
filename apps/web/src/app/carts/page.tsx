'use client';
import { api } from '@/config/axios.config';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { checkOut } from '@/action/user.action';
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
  const [selectedCarts, setSelectedCarts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const session = useSession();
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [usePoin, setUsePoin] = useState(false);
  const [poin, setPoin] = useState<number>(0);
  const [voucher, setVoucher] = useState<number>();
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [voucherType, setVoucherType] = useState<any>();

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
    };
    if (session.status == 'authenticated') {
      fetchData();
      getPoin();
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
  // const handleSelectAllChange = () => {
  //   setSelectAll(!selectAll);
  //   if (!selectAll) {
  //     const allCartIds = carts.map((cart: any) => cart.id);
  //     setSelectedCarts(allCartIds);
  //   } else {
  //     setSelectedCarts([]);
  //   }
  // };

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

  const handleQuantity = (cartId: number, quantity: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.map((cart: any) =>
        cart.id === cartId && cart.quantity > 0 ? { ...cart, quantity } : cart,
      ),
    );
  };

  // Delete cart item
  const handleDeleteCart = (cartId: number) => {
    setCarts((prevCarts: any[]) =>
      prevCarts.filter((cart: any) => cart.id !== cartId),
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

    if (usePoin) res -= poin;
    if (voucherAmount) res -= (voucherAmount / 100) * res;
    return res;
  };

  useEffect(() => {
    getTotalPrice();
  }, [voucherAmount]);

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

      await checkOut(access_token, total_price, voucher_id, usePoin, values);

      setIsCheckOut(!isCheckOut);
    } catch (error) {}

    // console.log('Selected carts:', carts);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 py-5 max-w-screen-xl px-5 border-2">
          {carts.map((cart: any) => (
            <Cart
              key={cart.id}
              cart={cart}
              // handleDecreaseQuantity={handleDecreaseQuantity}
              // handleIncreaseQuantity={handleIncreaseQuantity}
              handleQuantity={handleQuantity}
              handleDeleteCart={handleDeleteCart}
            />
          ))}

          <div className="text-right mt-5">
            <div>
              Use {poin} Poin?{' '}
              <span>
                <Switch onCheckedChange={(e) => setUsePoin(e)} />
              </span>
            </div>
            <h3 className="text-xl font-bold">
              Total Price: Rp.{' '}
              {usePoin
                ? getTotalPrice(usePoin).toLocaleString('id-ID')
                : getTotalPrice().toLocaleString('id-ID')}
            </h3>
          </div>

          <div className="">
            <p className="text-left">Available Voucher:</p>
            {userVoucher.map((voucher: any) => (
              <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
                <p>{voucher.Voucher.voucher_name}</p>
                <div className="flex">
                  <p>{voucher.Voucher.voucher_desc}</p>
                  <Switch
                    onCheckedChange={(e: boolean) => {
                      setVoucher(voucher.Voucher.id);
                      setVoucherAmount(e ? voucher.Voucher.amount : 0);
                      setVoucherType(voucher.Voucher.voucher_type);
                    }}
                  />
                </div>
              </div>
            ))}
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
