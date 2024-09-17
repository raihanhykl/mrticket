'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { actionLogout } from '@/action/auth.action';

export default function MobileNavbar({}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    await actionLogout().then((res) => {
      alert('Logout Success');
    });
  };

  const session = useSession();

  return (
    <div className="mobile md:hidden">
      <button onClick={toggleMobileMenu} className="text-white">
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
      </button>

      {isMobileMenuOpen && (
        <div className="flex flex-col gap-3 bg-[#152955] text-white p-4 mt-2 rounded-lg absolute left-[-150%] content-center items-center text-[12px]">
        {session.data?.user.roleId == 2 ? <Link href={'/dashboard'}>Dashboard</Link> : null}
          
          <Link href={'/events'}>Jelajah</Link>
          <Link href={'/carts'}>Keranjang</Link>
          <Link href={'/my-tickets'}>Tiket Saya</Link>
          {session ? (
            <Link href={'/profile'}>
              <div className="border-[1px] rounded-md p-2">
                <p>{session.data?.user.first_name}</p>
              </div>
            </Link>
          ) : (
            <Link href={'/register'}>
              <div className="border-[1px] rounded-md p-2">
                <p>Daftar</p>
              </div>
            </Link>
          )}
          {session ? (
            <button onClick={logout} className="border-[1px] rounded-md p-2">Logout</button>
          ) : (
            <Link href={'/login'}>
              <div className="border-[1px] rounded-md p-2">
                <p>Masuk</p>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
