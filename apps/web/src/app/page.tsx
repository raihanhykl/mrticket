'use client';

import { api } from '@/config/axios.config';
import { Card, Carousel } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Component() {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/admin/event/?page=1&limit=4`, {
        // params: {
        //   categoryId: category.id,
        // },
      });

      setEvents(res.data.data.data);
    };
    fetch();
  }, []);

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <>
      <div className="max-w-screen-xl px-7 md:px-2">
        <div className=" max-w-7xl my-10 rounded-xl">
          <img
            src="https://assets.loket.com/images/ss/1726131365_greI27.jpg"
            alt=""
            className="rounded-md"
          />
        </div>

        <div className="">
          <h1 className="text-xl sm:text-2xl font-semibold md:text-left">Event Pilihan</h1>
          <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-5 mt-3 mb-5">
            {events.map((event: any) => (
              <div key={event.id}>
                <Link href={`/event/${event.id}`}>
                  <div className=" border-[1px] rounded-xl">
                    <img
                      src={
                        event.image
                          ? 'http://localhost:8000/events/' + event.image
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZzHDbVL49ogGcSz6il6oYJkaYXbQvVwr1tw&s'
                      }
                      alt="..."
                      className="w-[300px] h-[150px] object-cover rounded-t-xl"
                    />
                    <div className="text-left gap-2 p-5">
                      <p className="text-md tracking-tight text-gray-900 dark:text-white">
                        {event.event_name}
                      </p>
                      <p className="text-sm text-gray-500 my-2">
                        {/* {new Date(event.start_date).getDate()} -{' '} */}
                        {new Date(event.start_date).getDate()}{' '}
                        {month[new Date(event.start_date).getMonth()]}
                        {' - '}
                        {new Date(event.end_date).getDate()}{' '}
                        {month[new Date(event.end_date).getMonth()]}
                      </p>
                      {/* <p className="font-semibold text-gray-700 dark:text-gray-400">
                        Rp 700.000
                      </p> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10">
          <img
            src="https://assets.loket.com/images/temporary/20240901/1725154848_gtp0ub.jpg"
            alt=""
            className="rounded-xl"
          />
        </div>
      </div>
    </>
  );
}
