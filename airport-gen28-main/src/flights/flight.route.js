import express from 'express';
import {
  createFlights,
  deleteFlights,
  findAllFlights,
  updateFlights,
  findOneFlights,
  approveFlight,
} from './flight.controller.js';
import { restrictTo } from '../auth/auth.middleware.js';

export const router = express.Router();

router
  .route('/')
  .get(findAllFlights)
  .post(restrictTo('admin', 'developer'), createFlights);

router.patch(
  '/approve-takeoff/:id',
  restrictTo('admin', 'developer'),
  approveFlight
)

router
  .route('/:id')
  .get(findOneFlights)
  .patch(restrictTo('admin', 'developer'), updateFlights)
  .delete(restrictTo('admin', 'developer'), deleteFlights);
