'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

export default function page({}: Props) {
  const session = useSession();


  function formatDate(date: Date | undefined): string {
    if (!date) return '';
    return date.toString().split('T')[0];
  }

  return (
    <div className="p-8">
      <p className='text-xl font-semibold'>Profile</p>
      <div className="p-4 flex justify-center ">
        <div className="flex flex-col gap-2 border-2 p-7 rounded-2xl">
            <p>
                Name: {session.data?.user.first_name} {session.data?.user.last_name}
            </p>
            <p>Email: {session.data?.user.email}</p>
            <p>Phone Number: {session.data?.user.phone_number}</p>
            <p>Referral Code: {session.data?.user.referral_code}</p>
            <p>Poin: {session.data?.user.poin}</p>
            <p>Expired Poin: {formatDate(session.data?.user.exp_poin)}</p>
        </div>
      </div>
    </div>
  );
}
