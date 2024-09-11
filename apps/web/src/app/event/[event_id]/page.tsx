'use client';
import { addToCart } from '@/action/user.action';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import router from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {
  params: {
    event_id: number;
  };
};



const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function Page({ params }: Props) {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
  const [event, setEvent] = useState<any>({});
  const [quantities, setQuantities] = useState<{ [ticketId: number]: number }>({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await api.get(`/admin/event-ticket/${params.event_id}`);
      const res2 = await api.get(`/admin/event/${params.event_id}`);
      setTickets(res1.data.data);
      setEvent(res2.data.data);
    };
    fetchData();
  }, [params.event_id]);

  const handleQuantityChange = (ticketId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cartData = tickets.map((ticket) => ({
        ticketId: Number(ticket.id),
        quantity: quantities[ticket.id] || 0,
      }));
      const accessToken = session?.user?.access_token;
      console.log(cartData);
      const res = await addToCart(cartData, String(accessToken));
      if (res?.success) {
        router.push('/');
      } else {
        console.log('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  return (
    <div className="max-w-screen-xl p-9">
      <div className="flex gap-8">
        <img
          className="rounded-xl w-[65%] h-auto max-h-[500px] object-cover shadow-md"
          src={
            event.image
              ? 'http://localhost:8000/events/' + event.image
              : 'https://assets.loket.com/neo/production/images/banner/20240423043810.jpg'
          }
          alt=""
        />
        <div className="shadow-md border-[1px] w-full text-left p-7 rounded-xl content-center">
          <p className="text-2xl font-semibold">{event.event_name}</p>
          <div className="py-5 grid gap-2">
            <p>
              {new Date(event.start_date).getDate()} {month[new Date(event.start_date).getMonth()]} -{' '}
              {new Date(event.end_date).getDate()} {month[new Date(event.end_date).getMonth()]}{' '}
              {new Date(event.end_date).getFullYear()}
            </p>
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

      <form onSubmit={handleSubmit}>
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex border-[2px] my-3 shadow-sm rounded-sm">
            <div className="p-5 flex justify-between w-full">
              <div className="flex flex-col gap-4 text-left">
                <p className="font-bold text-lg">{ticket.ticket_type}</p>
                <p className="font-semibold">
                  {ticket.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </p>
              </div>
              <div className="content-center">
                <p className="text-sm">Ticket(s) Available: {ticket.stock}</p>
                <div className="flex gap-3 content-center justify-center items-center text-center text-sm">
                  <p>Quantity:</p>
                  <input
                    className="rounded-xl border-[#b5b7ba]"
                    type="number"
                    id="quantity"
                    name={`quantity_${ticket.id}`}
                    min="0"
                    max={ticket.stock}
                    value={quantities[ticket.id] || ""}
                    onChange={(e) => handleQuantityChange(ticket.id, parseInt(e.target.value))}
                  />
                  {/* <input type="number" id="quantity" name="quantity" min="1" max="5"></input> */}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button className="bg-[#0049cc] text-white p-3 rounded-lg border-[1px] content-end" type="submit">
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  );
}
