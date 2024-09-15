'use client';
import React, { useState, useEffect } from 'react';
import { api } from '@/config/axios.config';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';

type Props = {};
const delay = 1000;

export default function page({}: Props) {
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<string>('');
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState('Loading...');
  const { debounce } = useDebounce();

  const performSearch = async () => {
    let res;
    
    if (categories != '' || search != '') res = await api.get(`/admin/search?search=${search}&category=${categories}`);
    else res = await api.get('/admin/event');
    setEvents(res.data.data);
  };

  const debouncedSearch = debounce(performSearch, delay);

  useEffect(() => {
    debouncedSearch();
  }, [search, categories]);

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
    <div className="max-w-screen-xl p-5">
      <div className="">
        <div className="flex justify-between">
          <div className="content-center">
            <p className="font-semibold text-2xl ">Events</p>
          </div>
          <div className="flex gap-2 text-sm">
            <input
              className="rounded-2xl color-[#7d8998] border-[1px]"
              type="text"
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Search Events Here"
            />
            <select
              className="rounded-2xl border-[1px] p-2"
              onChange={(e) => setCategories(e.currentTarget.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="">All Categories</option> 
              <option value="music">Music</option>
              <option value="theatre">Theatre</option>
              <option value="festival">Festival</option>
              <option value="hobbies">Hobbies</option>
            </select>
          </div>
        </div>

        {/* <div className=""> */}
          {events.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-5 mt-3 mb-5">
              {events.map((event: any) => (            
              <div key={event.id}>
                <Link href={`/event/${event.id}`}>
                  <div className=" border-[1px] rounded-xl">
                    <img
                      src={
                        event.image
                          ? 'http://localhost:8000/events/' + event.image
                          : 'https://assets.loket.com/neo/production/images/banner/20240423043810.jpg'
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
                    </div>
                  </div>
                </Link>
              </div>
            ))}     
            </div>
        ) : (
            <div className="p-9 flex justify-center">
                <p className='text-center text-xl font-semibold'>No events found</p>
            </div>
          ) }
        </div>
      </div>
    // </div>
  );
}
