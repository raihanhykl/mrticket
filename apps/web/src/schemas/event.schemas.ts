// event.schemas.ts
import { z } from 'zod';

export const eventSchema = z.object({
  event_name: z.string().nonempty('Event name is required'),
  event_desc: z.string().nonempty('Event description is required'),
  category: z.enum(['music', 'theatre', 'festival', 'hobbies']),
  location: z.string().nonempty('Location is required'),
  start_date: z.coerce.date({
    required_error: 'Start date is required',
  }),
  end_date: z.coerce.date({
    required_error: 'End date is required',
  }),
  start_time: z.string().nonempty('Start time is required'),
  end_time: z.string().nonempty('End time is required'),
  tickets: z
    .array(
      z.object({
        ticket_type: z.string().nonempty('Ticket type is required'),
        price: z.number({ invalid_type_error: 'Price must be a number' }),
        //   .positive('Price must be positive'),
        stock: z
          .number({ invalid_type_error: 'Stock must be a number' })
          .int('Stock must be an integer')
          .positive('Stock must be positive'),
        discount_price: z
          .number({ invalid_type_error: 'Discount price must be a number' })
          //   .positive('Discount price must be positive')
          .optional(),
        disc_start_date: z.coerce.date().optional(),
        disc_end_date: z.coerce.date().optional(),
      }),
    )
    .nonempty('At least one ticket is required')
    .optional(),
});
