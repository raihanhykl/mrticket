'use client';
import { loginAction } from '@/action/auth.action';
import { loginSchema } from '@/schemas/auth.schemas';
import { log } from 'console';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';

type Props = {};

export default function page({}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = form;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);  // Set ke true ketika proses dimulai
    await loginAction(values)
      .then((res) => {
        console.log(res,' ini di page');
        router.push('/');
      })
      .catch((err) => {
        setError('password', {
          type: 'manual',
          message: 'check your email and password',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <>
      <div className="py-5">
        <img
          src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg"
          alt=""
        />
        <div className=" flex justify-around max-w-screen-xl py-[100px] h-full items-center content-center">
          <div className="">
            <img
              src="https://assets.loket.com/web/assets/img/auth.svg"
              alt=""
            />
            <h1 className="text-xl font-semibold">
              Tidak lagi ketinggalan event dan film favoritmu
            </h1>
            <p className="text-[#686562] text-sm">
              Gabung dan rasakan kemudahan bertransaksi dan mengelola event di
              Loket.
            </p>
          </div>
          <div className="items-center content-center">
            <div className="border-[1px] p-5 content-center items-center text-left w-[400px] shadow-lg rounded-md">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
                {/* <label>Masukkan Email</label> */}
                <p>Email</p>
                <input
                  id="email"
                  type="email"
                  // value={email}
                  {...register('email')}
                  // onChange={(e) => setEmail(e.target.value)}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name={'email'} />
                {/* <br /> */}
                {/* <label>Masukkan Password</label> */}
                <p>Password</p>
                <input
                  id="password"
                  type="password"
                  // value={password}
                  {...register('password')}
                  // onChange={(e) => setPassword(e.target.value)}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name={'password'} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0049cc] text-white p-2 my-3 rounded-lg"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
