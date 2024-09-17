'use client';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function page({}: Props) {
  const [transactions, setTransactions] = useState<any>([]);
  const [review, setReview] = useState<any>([]);

  const session = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/users/transaction`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      const resReview = await api.get(`/users/review`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      setTransactions(res.data.data);
      setReview(resReview.data.data);
    };

    if (session.status == 'authenticated') {
      fetchData();
    }
  }, [session]);
  console.log(review);
  return (
    <div className="max-w-screen-xl mx-auto p-5">
      {transactions.map((transaction: any) => (
        <div
          key={transaction.id}
          className="flex flex-col gap-5 p-5 border rounded-md shadow-md"
        >
          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            <p className="font-medium">{transaction.invoice}</p>
            <p className="text-sm text-gray-600">
              {transaction.transaction_date.split('T')[0]}
            </p>
          </div>

          <div className="flex flex-col w-full gap-4 py-3">
            {transaction.transaction_detail.map((detail: any) => {
              return (
                <div
                  key={detail.id}
                  className="p-3 border rounded-lg flex flex-col sm:flex-row gap-4"
                >
                  <img
                    className="w-full sm:w-48 rounded-lg object-cover"
                    src={
                      'http://localhost:8000/events/' +
                      detail.Ticket.Event?.image
                    }
                    alt={detail.Ticket.Event?.event_name}
                  />
                  <div className="flex-1 text-left content-center">
                    <p className="font-semibold">
                      {detail.Ticket.Event.event_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ticket: {detail.Ticket.ticket_type}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ticket Price: Rp.{' '}
                      {detail.Ticket.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="text-right flex flex-col gap-1 text-sm content-center">
                    <p className="text-gray-600">Quantity: {detail.quantity}</p>
                    <p className="font-semibold">
                      Total Price: Rp. {detail.Ticket.price * detail.quantity}
                    </p>
                    {review?.Event.id == detail.Ticket.Event.id ? (
                      <div
                        className={` inline-block p-2 border rounded-lg bg-gray-500 text-white text-center cursor-not-allowed}`}
                      >
                        <p>Already Reviewed</p>
                      </div>
                    ) : (
                      <Link href={'/review/' + detail.Ticket.Event.id}>
                        <div
                          className={` inline-block p-2 border rounded-lg bg-[#003899] text-white text-center }`}
                        >
                          <p>Rate This Experience</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-right">
            <h3 className="text-lg md:text-xl font-bold">
              Total Price: Rp. {transaction.total_price.toLocaleString('id-ID')}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
