'use client';

import { addEventAction, updateEventAction } from '@/action/event.action';
import { api } from '@/config/axios.config';
import { eventSchema, updateEventSchema } from '@/schemas/event.schemas';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
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
  const form = useForm<z.infer<typeof updateEventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {},
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
      const fetchedData = res.data.data;

      const formattedData = {
        ...fetchedData,
        start_date: new Date(fetchedData.start_date)
          .toISOString()
          .split('T')[0],
        end_date: new Date(fetchedData.end_date).toISOString().split('T')[0],
      };
      setEvent(formattedData);
      form.reset(formattedData);
    };
    fetchData();
  }, [params.event_id]);

  const session = useSession();

  const onSubmit = async (values: z.infer<typeof updateEventSchema>) => {
    try {
      const formData = new FormData();
      formData.append('event_name', values.event_name);
      formData.append('event_desc', values.event_desc);
      formData.append('category', values.category);
      formData.append('location', values.location);
      formData.append('start_date', values.start_date.toISOString());
      formData.append('end_date', values.end_date.toISOString());
      formData.append('start_time', values.start_time);
      formData.append('end_time', values.end_time);

      if (selectedFile) {
        formData.append('image', selectedFile);

        // const data = { ...values, image: selectedFile };

        console.log(formData, 'kiw');
      }

      const accessToken = String(session.data?.user.access_token);
      await updateEventAction(formData, accessToken);

      // if (ticket) await addEventAction(formData, ticket);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center content-center py-12 text-sm text-left">
        <img
          src="https://assets.loket.com/web/assets/img/logo-loket-blue.svg"
          alt="Logo"
          className="mb-8"
        />
        <div className="border p-5 w-full max-w-3xl shadow-lg rounded-md">
          <p className="text-xl font-semibold text-center mt-3 mb-9">Update Event</p>
          <form className="grid gap-5 text-left" onSubmit={handleSubmit(onSubmit)}>
            {/* Event Image */}
            <div>
              <p>Event Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="border w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
  
            {/* Event Name */}
            <div>
              <p>Event Name</p>
              <input
                type="text"
                {...register('event_name')}
                className="border w-full bg-[#F9FAFB] rounded-lg"
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
              />
              <ErrorMessage errors={errors} name="event_desc" />
            </div>
  
            {/* Category */}
            <div>
              <p>Category</p>
              <select
                {...register('category')}
                className="bg-gray-50 border w-full rounded-lg"
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
              />
              <ErrorMessage errors={errors} name="location" />
            </div>
  
            {/* Dates and Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p>Start Date</p>
                <input
                  type="date"
                  {...register('start_date')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="start_date" />
              </div>
  
              <div>
                <p>End Date</p>
                <input
                  type="date"
                  {...register('end_date')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="end_date" />
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p>Start Time</p>
                <input
                  type="time"
                  {...register('start_time')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="start_time" />
              </div>
  
              <div>
                <p>End Time</p>
                <input
                  type="time"
                  {...register('end_time')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="end_time" />
              </div>
            </div>
  
            {/* Submit Button */}
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
