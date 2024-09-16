import React from 'react';
import Image from 'next/image';
import KfcSuccess from '@/../public/giphy.webp';
import { AxiosError } from 'axios';
import { api } from '@/config/axios.config';

type Props = {
  params: {
    token: string;
  };
};

export default async function Page({ params }: Props) {
  try {
    await api.get('/auth/verification/' + params.token);
    return (
      <div className=" flex flex-col justify-center items-center my-6">
        {/* <Image
          alt="success"
          src={KfcSuccess}
          width={320}
          height={320}
          className=" rounded-full aspect-square object-cover w-60"
        /> */}
        <h1 className=" my-5 text-2xl font-semibold">Email Verified</h1>
        <p>Your email has been verified</p>
      </div>
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
}
