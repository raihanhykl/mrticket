'use client';
import { actionRegister } from '@/action/auth.action';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

import { registerSchema } from '@/schemas/auth.schemas';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {};

export default function page({}: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    await actionRegister(values)
      .then((res) => {
        toast({
          description: res.message,
        });
        router.push('/login');
      })
      .catch((err) => {
        setError('f_referral_code', {
          type: 'manual',
          message: err.message,
        });
        toast({
          description: err.message,
        });

        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex flex-col gap-7 items-center content-center py-[50px] text-sm px-5 sm:px-0">
        <img
          src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg"
          alt=""
        />
        <div className="border-[1px] p-5 content-center items-center text-left max-w-[400px] shadow-lg rounded-md">
          <p className="text-xl font-semibold text-center mt-3 mb-9">
            Registration
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <div className="flex gap-3">
              <div className="">
                <p>First Name</p>
                <input
                  id="first_name"
                  type="text"
                  {...register('first_name')}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="first_name" />
              </div>
              <div className="">
                <p>Last Name</p>
                <input
                  id="last_name"
                  type="text"
                  {...register('last_name')}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
              </div>
            </div>
            <div className="">
              <p>Email</p>
              <input
                id="email"
                type="email"
                {...register('email')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              <ErrorMessage errors={errors} name="email" />
            </div>
            <div className="">
              <p>Phone Number</p>
              <input
                id="phone_number"
                type="text"
                {...register('phone_number')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              <ErrorMessage errors={errors} name="phone_number" />
            </div>
            <div className="">
              <p>Refferal Code</p>
              <input
                id="f_referral_code"
                type="text"
                {...register('f_referral_code')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              <ErrorMessage errors={errors} name="f_referral_code" />
            </div>
            <div className="">
              <p>Role</p>
              <select
                id="roleId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('roleId', { setValueAs: (v) => parseInt(v) })}
              >
                <option selected value="1">
                  Customer
                </option>
                <option value="2">Event Organizer</option>
              </select>
              <ErrorMessage errors={errors} name="roleId" />
            </div>
            <div className="">
              <p>Password</p>
              <input
                id="password"
                type="password"
                {...register('password')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              <ErrorMessage errors={errors} name="password" />
            </div>
            <button
              type="submit"
              className="bg-[#0049cc] text-white p-2 my-3 rounded-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
