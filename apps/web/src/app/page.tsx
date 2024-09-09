'use client';

import { api } from '@/config/axios.config';
import { Card, Carousel } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Component() {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/admin/event', {
        // params: {
        //   categoryId: category.id,
        // },
      });

      setEvents(res.data.data);
    };
    fetch();
  }, []);

  

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <>
      <div className="max-w-screen-xl px-7 md:px-2">
        <div className=" max-w-7xl my-10 rounded-xl">
          <img
            src="https://assets.loket.com/images/ss/1725154887_YG4LZL.jpg"
            alt=""
            className="rounded-md"
          />
        </div>

        <div className="">
          <h1 className="text-2xl font-semibold md:text-left">Event Pilihan</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-5 mt-3 mb-5">
            {events.map((event: any) => (
              // let start_date = new Date(event.start_date);
              // let end_date = new Date(event.end_date);

              <div key={event.id}>
                <Link href={`/event/${event.id}`}>
                  <div className=" border-[1px] rounded-xl">
                    
                    <img
                      src={event.image ? 'http://localhost:8000/events/' + event.image :"https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"}
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
                        {month[new Date(event.start_date).getMonth()]}{' - '}
                        {new Date(event.end_date).getDate()}{' '}
                        {month[new Date(event.end_date).getMonth()]}
                      </p>
                      <p className="font-semibold text-gray-700 dark:text-gray-400">
                        Rp 700.000
                      </p>
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
