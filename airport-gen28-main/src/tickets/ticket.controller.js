import { AppError, catchAsync } from "../errors/index.js"
import { validatePartialTicket, validateTicket } from "./ticket.schema.js";
import { TicketService } from "./ticket.service.js"

const ticketService = new TicketService()

export const findAllTickets = catchAsync(async(req, res, next) => {

  const tickets = await ticketService.findAll();

  return res.status(200).json(tickets)
})

export const createTicket = catchAsync(async(req, res, next) => {
  const { hasError, errorMessages, ticketData } = validateTicket(req.body)
  const { id: sessionUserId } = req.sessionUser;

  if(hasError){
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  const allData = {
    createdBy: sessionUserId,
    ...ticketData
  }

  const ticket = await ticketService.create(allData)

  return res.status(201).json(ticket)
})

export const findOneTicket = catchAsync(async(req, res, next) => {
  const { id } = req.params;

  const ticket = await ticketService.findOne(id)

  if(!ticket){
    return next(new AppError('ticket not found', 404))
  }

  return res.status(200).json(ticket)
})

export const updateTicket = catchAsync(async(req, res, next) => {
  const { id } = req.params;

  const { hasError, errorMessages, ticketData } = validatePartialTicket(req.body)

  if(hasError){
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  const ticket = await ticketService.findOne(id)

  if(!ticket){
    return next(new AppError('ticket not found', 404))
  }

  const ticketUpdated = await ticketService.update(ticket, ticketData);

  return res.status(200).json(ticketUpdated)
  
})

export const deleteTicket = catchAsync(async(req, res, next) => {
  const { id } = req.params;

  const ticket = await ticketService.findOne(id)

  if(!ticket){
    return next(new AppError('ticket not found', 404))
  }

  await ticketService.delete(ticket);

  return res.status(204).json(null)
})