import express from 'express';
import {
  createPlane,
  deletePlane,
  findAllPlanes,
  findOnePlane,
  updatePlane,
} from './plane.controller.js';
import { restrictTo } from '../auth/auth.middleware.js';

export const router = express.Router();

router
  .route('/')
  .get(restrictTo('receptionist', 'developer', 'admin'), findAllPlanes)
  .post(restrictTo('developer', 'admin'), createPlane);

router
  .route('/:id')
  .get(restrictTo('receptionist', 'developer', 'admin'), findOnePlane)
  .patch(restrictTo('developer', 'admin'), updatePlane)
  .delete(restrictTo('developer', 'admin'), deletePlane);
