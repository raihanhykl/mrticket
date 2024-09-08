'use client';
import { api } from '@/config/axios.config';
import React, { useEffect, useState } from 'react';

type Props = {
  params: {
    event_id: number;
  };
};
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export default function page({ params }: Props) {
  const [tickets, setTickets] = useState<any>([]);
  const [event, setEvent] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await api.get(`/admin/event-ticket/${params.event_id}`);
      const res2 = await api.get(`/admin/event/${params.event_id}`);
      setTickets(res1.data.data);
      setEvent(res2.data.data);
    };
    fetchData();
  }, []);

  // const resTicket = await api.get(`/admin/event-ticket/${params.event_id}`);
  // const test = resTicket.data.message;
  // const ticket = resTicket.data.data;
  return (
    <>
      {/* <p>{test}</p> */}
      <div className="max-w-screen-xl p-9 ">
        <div className="flex gap-8">
          {/* <div className=""> */}
            <img 
              className="rounded-xl w-[65%] h-auto shadow-md"
              src="https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"
              alt=""
            />
          {/* </div> */}
          <div className="shadow-md border-[1px] w-full text-left p-7 rounded-xl content-center">
            <p className='text-2xl font-semibold'>{event.event_name}</p>
            <div className="py-5 grid gap-2">
              <p>{new Date(event.start_date).getDate()} {month[new Date(event.start_date).getMonth()]} - {new Date(event.end_date).getDate()} {month[new Date(event.end_date).getMonth()]} {new Date(event.end_date).getFullYear()}</p>
              <p>{event.start_time} - {event.end_time}</p>
              <p>{event.location}</p>
            </div>
          </div>
        </div>
        <div className="text-left py-5">
          <div className="max-w-[65%]">
            <p>{event.event_desc}</p>
          </div>
        </div>
        {/* <div>{params.event_id}</div> */}

        {tickets.map((ticket: any) => {
          return (
            <>
              <div key={ticket.id} className='flex border-[2px] my-3 shadow-sm rounded-sm'>
                <div className="p-5 flex justify-between w-full">
                  <div className="flex flex-col gap-4 text-left">
                    <p className='font-bold text-lg'>{ticket.ticket_type}</p>
                    <p className='font-semibold'>{ticket.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                  </div>
                  <div className="content-center">
                    <p className='text-sm'>Ticket(s) Available: {ticket.stock}</p>
                  </div>
                </div>
              
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
