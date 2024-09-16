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
  const { debounce } = useDebounce();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); 

  const performSearch = async () => {
    let res;
    const limit = 8;

    if (categories !== '' || search !== '') {
      res = await api.get(
        `/admin/search?&search=${search}&category=${categories}&page=${currentPage}&limit=${limit}`,
      );
    } else {
      res = await api.get(`/admin/event?page=${currentPage}&limit=${limit}`);
    }

    setEvents(res.data.data.data);
    setTotalPages(Math.ceil(Number(res.data.data.total) / limit)); 
  };

  const debouncedSearch = debounce(performSearch, delay);

  useEffect(() => {
    debouncedSearch();
  }, [search, categories, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
        <div className="sm:flex justify-between grid grid-cols-1 gap-2 py-3">
          <div className="content-center">
            <p className="font-semibold text-2xl ">Events</p>
          </div>
          <div className="flex gap-2 text-sm">
            <input
              className="rounded-2xl color-[#7d8998] border-[1px] text-[12px]"
              type="text"
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Search Events Here"
            />
            <select
              className="rounded-2xl border-[1px] p-2 text-[12px]"
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

        {events.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-5 mt-3 mb-5">
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
                          {new Date(event.start_date).getDate()}{' '}
                          {month[new Date(event.start_date).getMonth()]}{' '}
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

            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
              >
                Previous
              </button>
              <p className="text-center py-2">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="p-9 flex justify-center">
            <p className="text-center text-xl font-semibold">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
