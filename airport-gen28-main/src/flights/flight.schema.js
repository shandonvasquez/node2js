import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';


const flightSchema = z.object({
  originId: z.number().positive(),
  destinationId: z.number().positive(),
  planeId: z.number().positive(),
  departureDate: z.string(),
  checkIn: z.date().optional(),
  status: z.enum(['pending', 'inProgress', 'done', 'cancelled']).optional(),
});

export const validateFlight = (data) => {
  const result = flightSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: flightData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    flightData,
  };
};

export const validatePartialFlight = (data) => {
  const result = flightSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: flightData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    flightData,
  };
};
