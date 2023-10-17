import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

export const bookingSchema = z.object({
  dataBooking: z.object({
    bookingDate: z.string().min(3).max(60),
    passengerId: z.number().int().positive(),
    flightId: z.number().int().positive(),
    nroTickets: z.number().int().positive(),
    totalPrice: z.number().positive(),
  }),
  tickets: z.array(
    z.object({
      passengerId: z.number().int().positive(),
      flightId: z.number().int().positive(),
      class: z.enum(['economic', 'executive', 'first']),
      price: z.number().positive(),
      seatNumber: z.number().int().positive(),
    })
  )
});

export const validateBooking = (data) => {
  const result = bookingSchema.safeParse(data);

  const { 
    hasError,
    errorMessages,
    data: bookingData
  } = extractValidationData(result)

  return {
    hasError,
    errorMessages,
    bookingData
  }
}

export const validatePartialBooking = (data) => {
  const result = bookingSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: bookingData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    bookingData,
  };
};
