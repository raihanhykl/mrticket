// 'use client';
// import { actionLogout } from '@/action/auth.action';
import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';

// import NavbarButton from './navbar/button.navbar';
import NavbarButton from './navbar/button.navbar';
import MobileNavbar from './navbar/mobile.navbar';

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

          {/* <div className="hidden md:flex content-center">search</div> */}

          <div className="dekstop hidden md:flex gap-5">
            {session?.user.roleId == 2 ? (
              <div className="content-center">
                <Link href={'/dashboard'}>
                  <div className="content-center flex items-center gap-1">
                    <img
                      src="https://assets.loket.com/web/assets/img/ic_schedule.svg"
                      alt=""
                      className="w-[21px]"
                    />
                    <p>Dashboard</p>
                  </div>
                </Link>
              </div>
            ) : null}

            <div className="content-center">
              <Link href={'/events'}>
                <div className="content-center flex items-center gap-1">
                  <img
                    src="	https://assets.loket.com/web/assets/img/ic_explore_compass.svg"
                    alt=""
                    className="w-[21px]"
                  />
                  <p>Jelajah</p>
                </div>
              </Link>
            </div>

            <div className="content-center">
              <Link href={session ? `/carts` : `/login`}>
                <div className="content-center flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M9 20c0 1.1-.9 2-2 2s-1.99-.9-1.99-2S5.9 18 7 18s2 .9 2 2m8-2c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2m.396-5a2 2 0 0 0 1.952-1.566L21 5H7V4a2 2 0 0 0-2-2H3v2h2v11a2 2 0 0 0 2 2h12a2 2 0 0 0-2-2H7v-2z"
                    />
                  </svg>
                  <p>Keranjang</p>
                </div>
              </Link>
            </div>

            <div className="content-center">
              <Link href={session ? `/my-tickets` : `/login`}>
                <div className="content-center flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="m21.485 8.071l-5.364-5.364c-1.128-1.128-3.111-1.136-4.248-.018l-9.148 9.002a2.97 2.97 0 0 0-.891 2.115a2.96 2.96 0 0 0 .873 2.121l5.365 5.365c.567.567 1.325.88 2.133.88c.799 0 1.551-.307 2.115-.862l9.147-9.003a2.96 2.96 0 0 0 .891-2.115a2.96 2.96 0 0 0-.873-2.121m-1.421 2.811l-9.146 9.003c-.381.373-1.056.37-1.432-.006l-1.275-1.275a2 2 0 0 0-.062-2.752a1.997 1.997 0 0 0-2.752-.063l-1.275-1.274c-.186-.187-.288-.435-.287-.699s.105-.513.293-.697l9.148-9.002c.189-.186.441-.288.713-.288c.273 0 .529.104.719.294l1.275 1.275a1.995 1.995 0 0 0 .062 2.751a1.997 1.997 0 0 0 2.752.063l1.274 1.274c.187.187.288.435.287.699s-.105.512-.294.697m-8.463 6.16l-4.657-4.656l5.649-5.429l4.657 4.656zm-3.23-4.643l3.243 3.242L15.82 11.6l-3.241-3.242z"
                    />
                  </svg>
                  <p>Tiket Saya</p>
                </div>
              </Link>
            </div>

            <div className="flex gap-2">
              {session ? (
                <Link href={'/profile'}>
                  <div className="content-center border-[1px] rounded-md p-2">
                    <p>{session.user.first_name}</p>
                  </div>
                </Link>
              ) : (
                <Link href={'/register'}>
                  <div className="content-center border-[1px] rounded-md p-2">
                    <p>Daftar</p>
                  </div>
                </Link>
              )}

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

          <div className="mobile md:hidden relative">
            <MobileNavbar />
            {/* <button className="text-white" id="mobile-menu-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                />
              </svg>
            </button> */}
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
