'use client';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function page({}: Props) {
  const [transactions, setTransactions] = useState<any>([]);

  const session = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/users/transaction`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      setTransactions(res.data.data);
    };

    if (session.status == 'authenticated') {
      fetchData();
    }
  }, [session]);
  return (
    <div className="max-w-screen-xl flex flex-col gap-5 p-5">
      {transactions.map((transaction: any) => (
        <div
          key={transaction.id}
          className="flex flex-col items-center justify-center p-5 border-[1px] rounded-md"
        >
          <div className="flex w-full justify-between">
            <p>{transaction.invoice}</p>
            <p>{transaction.transaction_date.split('T')[0]}</p>
          </div>
          {/* <div className="flex flex-col items-center justify-center p-5">
          
          </div> */}
          <div className="flex flex-col w-full gap-4 py-3">
            {transaction.transaction_detail.map((detail: any) => (
              <div className="">
                <div className="p-3 border-[1px] w-full flex gap-3 justify-between">
                  <div className="flex gap-3">
                    <img
                      className="w-[200px] rounded-lg"
                      src={
                        'http://localhost:8000/events/' +
                        detail.Ticket.Event.image
                      }
                      alt=""
                    />
                    <div className="content-center text-left">
                      <p>{detail.Ticket.Event.event_name}</p>
                      <p>Ticket: {detail.Ticket.ticket_type}</p>
                      <p>
                        Ticket Price: Rp.{' '}
                        {detail.Ticket.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="content-center text-right flex flex-col gap-1 text-sm">
                    <p>Quantity: {detail.quantity}</p>
                    <p>
                      Total Price: Rp. {detail.Ticket.price * detail.quantity}
                    </p>
                    <Link href={''}>
                      <div className="p-2 border-[1px] rounded-lg bg-[#003899] text-white">
                        <p>Rate This Experience</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold">
              Total Price: Rp. {transaction.total_price.toLocaleString('id-ID')}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
