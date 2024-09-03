'use client';

import { Card, Carousel } from 'flowbite-react';
import Link from 'next/link';

export default function Component() {
  return (
    <>
      <div className="max-w-screen-xl px-7 md:px-2">
        <div className=" max-w-7xl my-10 rounded-xl">
          {/* <Carousel>
            <img
              className="rounded-xl"
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
            <img
              className="rounded-xl"
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="..."
            />
            <img
              className="rounded-xl"
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              className="rounded-xl"
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              className="rounded-xl"
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel> */}
          <img src="https://assets.loket.com/images/ss/1725154887_YG4LZL.jpg" alt="" className='rounded-md'/>
        </div>


        <div className="">
          <h1 className="text-2xl font-semibold md:text-left">Event Pilihan</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-5 mt-3 mb-5">
            <Link href="">
              <div className=" border-[1px] rounded-xl">
                <img
                  src="https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"
                  alt="..."
                  className="max-h-[150px] object-cover rounded-t-xl"
                />
                <div className="text-left gap-2 p-5">
                  <p className="text-md tracking-tight text-gray-900 dark:text-white">
                    Pertamina Grand Prix of Indonesia 2024
                  </p>
                  <p className="text-sm text-gray-500 my-2">
                    27 Sep - 29 Sep 2024
                  </p>
                  <p className="font-semibold text-gray-700 dark:text-gray-400">
                    Rp 700.000
                  </p>
                </div>
              </div>
            </Link>

            <Link href="">
              <div className=" border-[1px] rounded-xl">
                <img
                  src="https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"
                  alt="..."
                  className="max-h-[150px] object-cover rounded-t-xl"
                />
                <div className="text-left gap-2 p-5">
                  <p className="text-md tracking-tight text-gray-900 dark:text-white">
                    Pertamina Grand Prix of Indonesia 2024
                  </p>
                  <p className="text-sm text-gray-500 my-2">
                    27 Sep - 29 Sep 2024
                  </p>
                  <p className="font-semibold text-gray-700 dark:text-gray-400">
                    Rp 700.000
                  </p>
                </div>
              </div>
            </Link>

            <Link href="">
              <div className=" border-[1px] rounded-xl">
                <img
                  src="https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"
                  alt="..."
                  className="max-h-[150px] object-cover rounded-t-xl"
                />
                <div className="text-left gap-2 p-5">
                  <p className="text-md tracking-tight text-gray-900 dark:text-white">
                    Pertamina Grand Prix of Indonesia 2024
                  </p>
                  <p className="text-sm text-gray-500 my-2">
                    27 Sep - 29 Sep 2024
                  </p>
                  <p className="font-semibold text-gray-700 dark:text-gray-400">
                    Rp 700.000
                  </p>
                </div>
              </div>
            </Link>

            <Link href="">
              <div className=" border-[1px] rounded-xl">
                <img
                  src="https://assets.loket.com/neo/production/images/banner/20240423043810.jpg"
                  alt="..."
                  className="max-h-[150px] object-cover rounded-t-xl"
                />
                <div className="text-left gap-2 p-5">
                  <p className="text-md tracking-tight text-gray-900 dark:text-white">
                    Pertamina Grand Prix of Indonesia 2024
                  </p>
                  <p className="text-sm text-gray-500 my-2">
                    27 Sep - 29 Sep 2024
                  </p>
                  <p className="font-semibold text-gray-700 dark:text-gray-400">
                    Rp 700.000
                  </p>
                </div>
              </div>
            </Link>

            
          </div>
        </div>

        <div className="my-10">
          <img
            src="https://assets.loket.com/images/temporary/20240901/1725154848_gtp0ub.jpg"
            alt=""
            className="rounded-xl"
          />
        </div>
      </div>
    </>
  );
}
