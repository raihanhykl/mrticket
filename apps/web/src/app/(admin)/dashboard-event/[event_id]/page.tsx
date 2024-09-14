'use client';
import { api } from '@/config/axios.config';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type Props = {
  params: {
    event_id: number;
  };
};

export default function page({ params }: Props) {
  const [event, setEvent] = useState<any[]>([]);
  const session = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/admin/event-transaction/${params.event_id}`, {
        headers: {
          Authorization: 'Bearer ' + session?.data?.user.access_token,
        },
      });
      setEvent(res.data.data);
    };
    if (session.status == 'authenticated') fetchData();
  }, [session, params.event_id]);

  return (
    <div className="max-w-screen-xl p-5">
      <p className="font-bold text-3xl">
        {event[0]?.event_name ?? 'No Event Data Available'}
      </p>
      <div className="flex flex-col gap-2">
        {event.map((event: any) => (
          <div key={event.id} className="flex justify-between">
            <p>
              {event.user.User.first_name} {event.user.User.last_name}
            </p>
            <p>{event.ticket_type}</p>
            <p>{event.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
