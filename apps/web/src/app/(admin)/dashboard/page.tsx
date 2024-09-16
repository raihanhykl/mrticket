'use client';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function page({}: Props) {
  const session = useSession();
  const [event, setEvents] = useState([]);
  const [transactionDaily, setTransactionDaily] = useState([]);
  const [transactionWeekly, setTransactionWeekly] = useState([]);
  const [transactionMonthly, setTransactionMonthly] = useState([]);
  const [transactionYearly, setTransactionYearly] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchEvents = await api.get(`/admin/event-organizer`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });

      const fetchTransactionDaily = await api.get(
        `/admin/get-transaction-by-date/daily`,
        {
          headers: {
            Authorization: 'Bearer ' + session?.data?.user.access_token,
          },
        },
      );

      const fetchTransactionWeekly = await api.get(
        `/admin/get-transaction-by-date/weekly`,
        {
          headers: {
            Authorization: 'Bearer ' + session?.data?.user.access_token,
          },
        },
      );

      const fetchTransactionMonthly = await api.get(
        `/admin/get-transaction-by-date/monthly`,
        {
          headers: {
            Authorization: 'Bearer ' + session?.data?.user.access_token,
          },
        },
      );

      const fetchTransactionYearly = await api.get(
        `/admin/get-transaction-by-date/yearly`,
        {
          headers: {
            Authorization: 'Bearer ' + session?.data?.user.access_token,
          },
        },
      );

      setEvents(fetchEvents.data.data);
      setTransactionDaily(fetchTransactionDaily.data.data);
      setTransactionWeekly(fetchTransactionWeekly.data.data);
      setTransactionMonthly(fetchTransactionMonthly.data.data);
      setTransactionYearly(fetchTransactionYearly.data.data);
    };
    if (session.status == 'authenticated') {
      fetchData();
    }
  }, [session]);

  return (
    <div className="max-w-screen-xl p-5">
      <div className="flex flex-col gap-3">
        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-bold text-xl md:text-2xl">Dashboard</p>
        </div>
        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-semibold">Your Event</p>
          <div className="">
            {event.map((event: any) => (
              <Link href={`/dashboard-event/${event.id}`}>
                <div className="border-[1px] px-5 py-3 rounded-2xl w-full">
                  <div className="flex justify-between">
                    <div className="block md:flex gap-3">
                      <p>{event.event_name}</p>
                      {event.is_active ? (
                        <p className="text-green-500">Active</p>
                      ) : (
                        <p className="text-red-500">Inactive</p>
                      )}
                    </div>
                    {event.is_active ? (
                      <div className="flex gap-5 text-sm">
                      <Link href={`update-event/${event.id}`}>
                        <p className="text-[#003899]">Edit</p>
                      </Link>
                      <Link href={`delete-event/${event.id}`}>
                        <p className="text-red-500">Delete</p>
                      </Link>
                    </div>
                    ) : (
                    <div className=""></div>
                    )}

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-semibold">Total Transaction Today</p>
          <div className="">
            {transactionDaily.map((data: any) => (
              <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
                <p>{data.event_name}</p>
                <p>{data.ticket_type}</p>
                <p>{data.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-semibold">Total Transaction Weekly</p>
          <div className="">
            {transactionWeekly.map((data: any) => (
              <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
                <p>{data.event_name}</p>
                <p>{data.ticket_type}</p>
                <p>{data.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-semibold">Total Transaction This Month</p>
          <div className="">
            {transactionMonthly.map((data: any) => (
              <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
                <p>{data.event_name}</p>
                <p>{data.ticket_type}</p>
                <p>{data.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-semibold">Total Transaction This Year</p>
          <div className="">
            {transactionYearly.map((data: any) => (
              <div className="border-[1px] px-5 py-3 flex justify-between rounded-2xl w-full">
                <p>{data.event_name}</p>
                <p>{data.ticket_type}</p>
                <p>{data.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
