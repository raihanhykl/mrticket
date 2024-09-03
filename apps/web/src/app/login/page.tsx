'use client';
import { loginAction } from '@/action/auth.action';
import { log } from 'console';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {};

interface userLogin {
  email: string;
  password: string;
}

export default function page({}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const data = { email, password };
    console.log(data);
    await loginAction(data)
      .then((res) => {
        console.log(res);
        // router.push('/');
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <>
    <div className="py-5">
        <img src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg" alt="" />
        <div className=" flex justify-around max-w-screen-xl py-[100px] h-full items-center content-center">
          <div className="">
              <img src="https://assets.loket.com/web/assets/img/auth.svg" alt="" />
              <h1 className="text-xl font-semibold">Tidak lagi ketinggalan event dan film favoritmu</h1>
              <p className="text-[#686562] text-sm">Gabung dan rasakan kemudahan bertransaksi dan mengelola event di Loket.</p>
          </div>
          <div className="items-center content-center">
            <div className="border-[1px] p-5 content-center items-center text-left w-[400px] shadow-lg rounded-md">
              <form onSubmit={onSubmit} className="grid gap-3">
                {/* <label>Masukkan Email</label> */}
                <p>Email</p>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                {/* <br /> */}
                {/* <label>Masukkan Password</label> */}
                <p>Password</p>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                <button type="submit" className='bg-[#0049cc] text-white p-2 my-3 rounded-lg'>Login</button>
              </form>
            </div>
          </div>
        </div>

    </div>
      
    </>
  );
}
