'use client';
import { loginAction } from '@/action/auth.action';
import { log } from 'console';
import { useRouter } from 'next/navigation';
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
        alert('Login Success page');
        router.push('/');
      })
      .catch((err) => {
        alert(err as Error);
      });
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit} className="">
          <label>Masukkan Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" border border-black"
          />
          <br />
          <label>Masukkan Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" border border-black"
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
