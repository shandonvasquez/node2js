import { AppError, catchAsync } from "../errors/index.js";
import { TicketService } from "../tickets/ticket.service.js";
import { validateBooking, validatePartialBooking } from "./booking.schema.js";
import { BookingService } from "./booking.service.js";
import { hasDuplicateSeatNumber, validRepeatSeat } from "./utils/seat-availability-validator.js";

const bookingService = new BookingService()
const ticketService = new TicketService()

export const findAllBookings = catchAsync(async (req, res, next) => {
  const { status = 'pending' } = req.query;

  const bookings = await bookingService.findAll(status);

  res.status(200).json(bookings);
});


export const createBooking = catchAsync(async(req,res,next) => {
  //1. lo primero llamamos las validaciones
  const { hasError, errorMessages, bookingData} = validateBooking(req.body);
  //2. validamos informacion
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  //3. validar el arreglo de tickets enviados, para que no halla duplicidad de asientos
  const isRepeatSeat = validRepeatSeat(bookingData.tickets)

  //4. si esta repetido el asiento mandamos un error
  if(isRepeatSeat){
    return next(
      new AppError('You cannot sell two tickets with the same seat', 400)
    )
  }
  //5. buscamos todos los asientos vendidos del vuelo al cual se quiere hacer la reserva.
  const seatNumbersFlighs = await ticketService.findAllTicketsByFlightId(bookingData.dataBooking.flightId)
  //6. validar si alguno de los asientos que se estan intentando vender ya han sido vendidos antes
  const dontHasAvailavility = hasDuplicateSeatNumber(bookingData.tickets, seatNumbersFlighs)

  //TODO: Retornar el numero del asiento ocupado
  //7. si el algun asiento ha sido vendido retorno un error
  if(dontHasAvailavility){
    return next(new AppError('One of the chosen seats already taken', 400))
  }
  //TODO: Modificar tabla de aviones para indicar los numeros de acientos que tienen los aviones y aca hacer una validacion para saber si el aciento que se desea ingresar existe en ese avion

  bookingData.dataBooking.createdBy = req.sessionUser.id;

  const booking = await bookingService.create(bookingData.dataBooking)

  bookingData.tickets.forEach((ticket) => {
    ticket.bookingId = booking.id
    ticket.createdBy = req.sessionUser.id;
  })

  await ticketService.multipleCreation(bookingData.tickets)

  return res.status(201).json(booking)

})

export const findOneBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const booking = await bookingService.findOne(id);

  if (!booking) {
    return next(new AppError(`booking with id: ${id} not found!`, 404));
  }

  return res.status(200).json(booking);
});

export const updateBooking = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, bookingData } = validatePartialBooking(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const booking = await bookingService.findOne(id);

  if (!booking) {
    return next(new AppError(`Booking with id: ${id} not found`));
  }

  const bookingUpdated = await bookingService.update(booking, bookingData);

  return res.status(200).json(bookingUpdated);
});

export const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const booking = await bookingService.findOne(id);

  if (!booking) {
    return next(new AppError(`Booking with id: ${id} not found`));
  }

  await bookingService.delete(booking);

  return res.status(204).json(null);
});
