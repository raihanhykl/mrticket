import { auth } from '@/auth';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';

type Props = {};

export default async function page({}: Props) {
  const session = await auth();
  return (
    <div>
      <div className="flex flex-col gap-7 items-center content-center py-[50px] text-sm ">
        <img
          src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg"
          alt=""
        />
        <div className="border-[1px] p-5 content-center items-center text-left w-[70%] shadow-lg rounded-md">
          <p className="text-xl font-semibold text-center mt-3 mb-9">
            Add Event
          </p>
          <form className="grid gap-3">
            <input type="hidden" value={session?.user.id} />
            <div className="">
              <p>Event Name</p>
              <input
                id="event_name"
                type="text"
                // {...register('first_name')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              {/* <ErrorMessage errors={errors} name="first_name" /> */}
            </div>

            <div className="">
              <p>Event Description</p>
              <input
                id="event_description"
                type="text"
                // {...register('first_name')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              {/* <ErrorMessage errors={errors} name="first_name" /> */}
            </div>

            <div className="">
              <p>Category</p>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // {...register('roleId', { setValueAs: (v) => parseInt(v) })}
              >
                <option selected value="music">
                  Music
                </option>
                <option value="theatre">Theatre</option>
                <option value="festival">Festival</option>
                <option value="hobbies">Hobbies</option>
              </select>
              {/* <ErrorMessage errors={errors} name="roleId" /> */}
            </div>

            <div className="">
              <p>Location</p>
              <input
                id="location"
                type="text"
                // {...register('first_name')}
                className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
              {/* <ErrorMessage errors={errors} name="first_name" /> */}
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <p>Start Date</p>
                <input
                  id="start_date"
                  type="date"
                  // {...register('email')}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                {/* <ErrorMessage errors={errors} name="email" /> */}
              </div>

              <div className="w-full">
                <p>End Date</p>
                <input
                  id="end_date"
                  type="date"
                  // {...register('email')}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                {/* <ErrorMessage errors={errors} name="email" /> */}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <div className="w-full">
                <p>Start Time</p>
                <input
                  id="start_time"
                  type="time"
                  // {...register('email')}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                {/* <ErrorMessage errors={errors} name="email" /> */}
              </div>

              <div className="w-full">
                <p>End Time</p>
                <input
                  id="end_time"
                  type="time"
                  // {...register('email')}
                  className=" border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
                />
                {/* <ErrorMessage errors={errors} name="email" /> */}
              </div>
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
