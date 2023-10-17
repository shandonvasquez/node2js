import { Router } from 'express';
import { 
  findAllCities,
  createCity ,
  findOneCity,
  updateCity,
  deleteCity,
} from './city.controller.js'

import { validateExistCity } from './city.middleware.js'
import { protect } from '../auth/auth.middleware.js';

export const router = Router()

// router.use(protect)

router.route("/")
  .get(findAllCities)
  .post(createCity)

router
  .use('/:id', validateExistCity)
  .route("/:id")
  .get(findOneCity)
  .patch(updateCity)
  .delete(deleteCity)
