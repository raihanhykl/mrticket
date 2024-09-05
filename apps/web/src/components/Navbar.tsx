// 'use client';
// import { actionLogout } from '@/action/auth.action';
import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';

// import NavbarButton from './navbar/button.navbar';
import NavbarButton from './navbar/button.navbar';

type Props = {};

export default async function Navbar({}: Props) {
  const session = await auth();
  // const logOut

  return (
    <>
      <div className="hidden md:flex px-[30px] py-[10px] gap-5 bg-[#003899] text-white justify-end text-[12px]">
        <a href="">Tentang Loket</a>
        <a href="">Mulai Jadi Event Creator</a>
        <a href="">Biaya</a>
        <a href="">Blog</a>
        <a href="">Hubungi Kami</a>
        <a href="">Loket Screen</a>
      </div>

      <div className=" bg-[#152955] text-white px-[40px] py-[16px]  text-sm">
        <div className="flex justify-between content-center items-center">
          <Link href={'/'}>
            <img
              src="https://assets.loket.com/images/logo-loket-white.png"
              alt=""
              className="h-6 md:h-8 "
            />
          </Link>

          <div className="hidden md:flex content-center">search</div>

          <div className="hidden md:flex gap-5">
            <div className="content-center flex items-center gap-1">
              <img
                src="https://assets.loket.com/web/assets/img/ic_schedule.svg"
                alt=""
                className="w-[21px]"
              />
              <a href="">Buat Event</a>
            </div>
            <div className="content-center flex items-center gap-1">
              <img
                src="	https://assets.loket.com/web/assets/img/ic_explore_compass.svg"
                alt=""
                className="w-[21px]"
              />
              <a href="">Jelajah</a>
            </div>

            <div className="flex gap-2">
              <Link href={'/register'}>
                <div className="content-center border-[1px] rounded-md p-2">
                  <p>{session ? session.user.first_name : 'Daftar'}</p>
                </div>
              </Link>
              {session ? (
                <NavbarButton />
              ) : (
                <Link href={'/login'}>
                  <div className="content-center border-[1px] rounded-md p-2">
                    <p>Masuk</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-4 justify-center bg-[#152955] text-white text-sm">
          <Link href={''}>#LoketMart</Link>
          <Link href={''}>#Promo_Indodana</Link>
          <Link href={''}>#LOKETScreen</Link>
          <Link href={''}>#LOKET_Promo</Link>
          <Link href={''}>#motoGP</Link>
          <Link href={''}>#LoketAttraction</Link>
        </div>
      </div>
    </>
  );
}
