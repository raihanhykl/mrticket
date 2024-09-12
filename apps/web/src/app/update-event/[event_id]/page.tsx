'use client';

import { addEventAction } from '@/action/event.action';
import { api } from '@/config/axios.config';
import { eventSchema, updateEventSchema } from '@/schemas/event.schemas';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  params: {
    event_id: number;
  };
};

export default function Page({ params }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [event, setEvent] = useState<any>({
    event_name: ' ',
    event_desc: ' ',
    category: ' ',
    location: ' ',
    start_date: new Date(),
    end_date: new Date(),
    start_time: '00:00',
    end_time: '00:00',
  });
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      // tickets: [
      //   {
      //     ticket_type: '',
      //     price: 0,
      //     stock: 0,
      //     discount_price: 0,
      //     disc_start_date: new Date(),
      //     disc_end_date: new Date(),
      //   },
      // ],
    },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/admin/event/${params.event_id}`);
      setEvent(res.data.data);
    };
    fetchData();
  }, [params.event_id]);

  const onSubmit = async (values: z.infer<typeof updateEventSchema>) => {
    try {
      if (!selectedFile) {
        console.log(values.event_name, 'event name');
        // alert('Please upload an image file');
        // return;
      }
      const formData = new FormData();
      formData.append('event_name', values.event_name);
      formData.append('event_desc', values.event_desc);
      formData.append('category', values.category);
      formData.append('location', values.location);
      formData.append('start_date', values.start_date.toISOString());
      formData.append('end_date', values.end_date.toISOString());
      formData.append('start_time', values.start_time);
      formData.append('end_time', values.end_time);
      // formData.append('image', selectedFile);

      // const data = { ...values, image: selectedFile };

      console.log(formData, 'kiw');

      // if (ticket) await addEventAction(formData, ticket);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-7 items-center content-center py-[50px] text-sm text-left">
        <img
          src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg"
          alt="Logo"
        />
        <div className="border p-5 w-[70%] shadow-lg rounded-md">
          <p className="text-xl font-semibold text-center mt-3 mb-9">
            Update Event
          </p>
          <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
            <p>Event Image</p>
            <input
              type="file"
              accept="image/*"
              // value={event.image}
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              // {...register("image")}
              className="border w-full bg-[#F9FAFB] rounded-lg"
            />
            <div>
              <p>Event Name</p>
              <input
                type="text"
                defaultValue={event.event_name}
                {...register('event_name')}
                className="border w-full bg-[#F9FAFB] rounded-lg"
                // defaultValue={event.event_name}
              />
              <ErrorMessage errors={errors} name="event_name" />
            </div>

            {/* Event Description */}
            <div>
              <p>Event Description</p>
              <input
                type="text"
                {...register('event_desc')}
                className="border w-full bg-[#F9FAFB] rounded-lg"
                defaultValue={event.event_desc}
              />
              <ErrorMessage errors={errors} name="event_desc" />
            </div>

            {/* Category */}
            <div>
              <p>Category</p>
              <select
                {...register('category')}
                className="bg-gray-50 border w-full rounded-lg"
                defaultValue={event.category}
              >
                <option value="music">Music</option>
                <option value="theatre">Theatre</option>
                <option value="festival">Festival</option>
                <option value="hobbies">Hobbies</option>
              </select>
              <ErrorMessage errors={errors} name="category" />
            </div>

            {/* Location */}
            <div>
              <p>Location</p>
              <input
                type="text"
                {...register('location')}
                className="border w-full bg-[#F9FAFB] rounded-lg"
                defaultValue={event.location}
              />
              <ErrorMessage errors={errors} name="location" />
            </div>

            {/* Dates and Times */}
            {/* <p>{event.start_date}</p> */}
            <div className="flex gap-3">
              <div className="w-full">
                <p>Start Date</p>
                <input
                  type="date"
                  {...register('start_date')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                  // value={event.start_date}
                  defaultValue={
                    new Date(event.start_date).toISOString()?.split('T')[0]
                  }
                />

                <ErrorMessage errors={errors} name="start_date" />
              </div>

              <div className="w-full">
                <p>End Date</p>
                <input
                  type="date"
                  {...register('end_date')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                  defaultValue={
                    new Date(event.end_date).toISOString()?.split('T')[0]
                  }
                />
                <ErrorMessage errors={errors} name="end_date" />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-full">
                <p>Start Time</p>
                <input
                  type="time"
                  {...register('start_time')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                  defaultValue={event.start_time}
                />
                <ErrorMessage errors={errors} name="start_time" />
              </div>

              <div className="w-full">
                <p>End Time</p>
                <input
                  type="time"
                  {...register('end_time')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                  defaultValue={event.end_time}
                />
                <ErrorMessage errors={errors} name="end_time" />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#0049cc] text-white p-2 my-3 rounded-lg"
            >
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
