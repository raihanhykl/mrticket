'use client';

import { addEventAction } from '@/action/event.action';
import { eventSchema } from '@/schemas/event.schemas';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

export default function Page() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      tickets: [
        {
          ticket_type: '',
          price: 0,
          stock: 0,
          discount_price: 0,
          disc_start_date: new Date(),
          disc_end_date: new Date(),
        },
      ],
    },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  // Use useFieldArray for handling dynamic arrays
  const { fields, append } = useFieldArray({
    control,
    name: 'tickets',
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    try {
      const ticket = values.tickets;
      delete values.tickets;
      // const dor = values.location;
      const data = {...values, image: selectedFile?.name};

      console.log(data);
      
      // if(selectedFile && ticket) await addEventAction(data, ticket);
      if (ticket) await addEventAction(data, ticket);

    } catch (err) {
      console.error(err);

    }
  };

  const handleAddTicket = () => {
    append({
      ticket_type: '',
      price: Number(''),
      stock: 0,
      discount_price: 0,
      disc_start_date: new Date(),
      disc_end_date: new Date(),
    });
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
            Add Event
          </p>
          <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
            <p>Event Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} 
                // {...register("image")}
                className="border w-full bg-[#F9FAFB] rounded-lg"
              />
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
            <div className="flex gap-3">
              <div className="w-full">
                <p>Start Date</p>
                <input
                  type="date"
                  {...register('start_date')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="start_date" />
              </div>

              <div className="w-full">
                <p>End Date</p>
                <input
                  type="date"
                  {...register('end_date')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
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
                />
                <ErrorMessage errors={errors} name="start_time" />
              </div>

              <div className="w-full">
                <p>End Time</p>
                <input
                  type="time"
                  {...register('end_time')}
                  className="border w-full bg-[#F9FAFB] rounded-lg"
                />
                <ErrorMessage errors={errors} name="end_time" />
              </div>
            </div>

            {/* Dynamic Ticket Fields */}
            {fields.map((field, index) => (
              <div key={field.id} style={{ marginBottom: '10px' }}>
                <div>
                  <p>Ticket Type</p>
                  <input
                    type="text"
                    {...register(`tickets.${index}.ticket_type`)}
                    className="border w-full bg-[#F9FAFB] rounded-lg"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tickets.${index}.ticket_type`}
                  />
                </div>

                <div>
                  <p>Price</p>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`tickets.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    className="border w-full bg-[#F9FAFB] rounded-lg"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tickets.${index}.price`}
                  />
                </div>

                <div>
                  <p>Stock</p>
                  <input
                    type="number"
                    {...register(`tickets.${index}.stock`, {
                      valueAsNumber: true,
                    })}
                    className="border w-full bg-[#F9FAFB] rounded-lg"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tickets.${index}.stock`}
                  />
                </div>

                <div>
                  <p>Discount Price</p>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`tickets.${index}.discount_price`, {
                      valueAsNumber: true,
                    })}
                    className="border w-full bg-[#F9FAFB] rounded-lg"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tickets.${index}.discount_price`}
                  />
                </div>

                <div>
                  <p>Discount Start Date</p>
                  <input
                    type="date"
                    {...register(`tickets.${index}.disc_start_date`)}
                    className="border w-full bg-[#F9FAFB] rounded-lg"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tickets.${index}.disc_start_date`}
                  />
                </div>

                <div>
                  <p>Discount End Date</p>
                  <input
                    type="date"
                    {...register(`tickets.${index}.disc_end_date`)}
                    className="border w-full bg-[#F9FAFB] rounded-lg"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tickets.${index}.disc_end_date`}
                  />
                </div>
              </div>
            ))}

            {/* Add Ticket Button */}
            <button
              type="button"
              className="bg-gray-500 text-white p-2 my-3 rounded-lg"
              onClick={handleAddTicket}
            >
              Add Another Ticket
            </button>

            {/* Submit Button */}
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
