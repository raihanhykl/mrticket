'use client';
import { actionRegister } from '@/action/auth.action';
import router from 'next/router';
import React, { useState } from 'react';

type Props = {};

export default function page({}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [f_referral_code, setFReferralCode] = useState('');
  const [roleId, setRoleId] = useState(1);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const data = {
      email,
      password,
      phone_number,
      first_name,
      last_name,
      f_referral_code,
      roleId: Number(roleId),
    };
    console.log(data);
    // await actionRegister(data)
    //   .then((res) => {
    //     console.log(res);
    //     // router.push('/');
    //     router.push('/login');
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };

  // const onSubmit = async (values: z.infer<typeof registerSchema>) => {
  //   await actionRegister(values)
  //     .then((res) => {
  //       form.reset();
  //       router.push("/login");
  //       toast.success(res.message);
  //     })
  //     .catch((err) => {
  //       toast.success(err.message);
  //     });
  // };

  return (
    <div>
      <div className="flex flex-col gap-7 items-center content-center py-[50px] text-sm ">
        <img
          src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg"
          alt=""
        />
        <div className="border-[1px] p-5 content-center items-center text-left w-[400px] shadow-lg rounded-md">
          <p className="text-xl font-semibold text-center mt-3 mb-9">Registration</p>
          <form onSubmit={onSubmit} className="grid gap-3">
            <div className="flex gap-3">
              <div className="">
                <p>First Name</p>
                <input
                  id="first_name"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
              </div>
              <div className="">
                <p>Last Name</p>
                <input
                  id="last_name"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
              </div>
            </div>
            <div className="">
              <p>Email</p>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Phone Number</p>
              <input
                id="phone_number"
                type="text"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Refferal Code</p>
              <input
                id="f_referral_code"
                type="text"
                value={f_referral_code}
                onChange={(e) => setFReferralCode(e.target.value)}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Role</p>
              <select
                id="roleId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setRoleId(Number(e.target.value))}
              >
                <option selected value="1">
                  Customer
                </option>
                <option value="2">Event Organizer</option>
              </select>
            </div>
            <div className="">
              <p>Password</p>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
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
