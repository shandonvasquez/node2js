import express from 'express';

//controllers
import {
  findAllBookings,
  createBooking,
  findOneBooking,
  updateBooking,
  deleteBooking,
} from './booking.controller.js';
import { restrictTo } from '../auth/auth.middleware.js';

export const router = express.Router();


router
  .route('/')
  .get(restrictTo('receptionist', 'developer', 'manager'), findAllBookings)
  .post(restrictTo('developer', 'receptionist'), createBooking);

router
  .route('/:id')
  .get(restrictTo('receptionist', 'developer', 'manager'), findOneBooking)
  .patch(restrictTo('developer', 'receptionist'), updateBooking)
  .delete(restrictTo('developer', 'receptionist'), deleteBooking);
