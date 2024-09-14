import React from 'react';

type Props = {};

export default function page({}: Props) {
  return (
    <div className="max-w-screen-xl p-5">
      <div className="flex flex-col gap-3">
        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-bold">Dashboard</p>
        </div>
        <div className="text-left p-5 border-2 rounded-xl shadow-md">
          <p className="font-semibold">Event List</p>
        </div>
      </div>
    </div>
  );
}
