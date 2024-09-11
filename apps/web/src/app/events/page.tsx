'use client';
import React, { useState, useEffect } from 'react';
import { api } from '@/config/axios.config';
import useDebounce from '@/hooks/useDebounce';

type Props = {};
const delay = 1000;

export default function page({}: Props) {
  const [search, setSearch] = useState<string>('');
  const [event, setEvent] = useState([]);
  const { debounce } = useDebounce();

  const performSearch = async () => {
    let res;
    if (search != '') res = await api.get(`/admin/search?search=${search}`);
    else res = await api.get('/admin/event');
    setEvent(res.data.data);
  };

  const debouncedSearch = debounce(performSearch, delay);

  useEffect(() => {
    debouncedSearch();
  }, [search]);

  return (
    <div>
      <input type="text" onChange={(e) => setSearch(e.currentTarget.value)} />
      {event.map((e: any) => (
        <div>
          <div>{e.event_name}</div>
          <div>{e.location}</div>
        </div>
      ))}
    </div>
  );
}
