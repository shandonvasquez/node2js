import express from 'express';

import { restrictTo } from './../auth/auth.middleware.js'
import {
  findAllTickets,
  createTicket,
  findOneTicket,
  updateTicket,
  deleteTicket,
} from './ticket.controller.js'

export const router = express.Router()



router.route('/')
  .get(restrictTo('receptionist', 'developer', 'admin'), findAllTickets)
  .post(restrictTo('receptionist', 'developer'), createTicket)

router.route('/:id')
  .get(restrictTo('receptionist', 'developer', 'admin'), findOneTicket)
  .patch(restrictTo('receptionist', 'developer'), updateTicket)
  .delete(restrictTo('receptionist', 'developer'), deleteTicket)

