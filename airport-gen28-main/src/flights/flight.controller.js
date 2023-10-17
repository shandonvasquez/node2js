
import { promise } from 'zod';
import { CityService } from '../city/city.service.js';
import { envs } from '../config/enviroments/enviroments.js';
import { httpClient } from '../config/plugins/http-client.plugin.js';
import { AppError, catchAsync } from '../errors/index.js';
import { validateFlight, validatePartialFlight } from './flight.schema.js';
import { FlightService } from './flight.service.js';
import { TicketService } from '../tickets/ticket.service.js';

const flightService = new FlightService();
const cityService = new CityService()
const ticketService = new TicketService()

export const findAllFlights = catchAsync(async (req, res, next) => {
  const flights = await flightService.findAllWithAllData();

  return res.status(200).json(flights);
});

export const findOneFlights = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;

  const flight = await flightService.findOne(id, status)

  if (!flight) {
    return next(new AppError(`flight with id: ${id} not found!`, 400));
  }

  return res.status(200).json(flight);

})

export const createFlights = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, flightData } = validateFlight(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const flight = await flightService.create(flightData);

  return res.status(200).json(flight);
});

export const updateFlights = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, flightData } = validatePartialFlight(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const flight = await flightService.findOne(id);

  if (!flight) {
    return next(new AppError(`flight with id: ${id} not found!`));
  }

  const updatedFlight = await flightService.update(flight, flightData);

  return res.status(200).json(updatedFlight);
});

export const deleteFlights = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const flight = await flightService.findOne(id, 'pending');

  if (!flight) {
    return next(new AppError(`can't find flight with id: ${id}`));
  } 

  const ticket = await ticketService.findOneTicketByFlightId(id)

  if(ticket){
    return next(
      new AppError(
        `a flight cannot be deleted if tickets have been for it`,
        400
      )
    )
  }

  await flightService.delete(flight);

  return res.status(204).json(null);
});

export const approveFlight = catchAsync(async(req, res, next) => {
  const { id } = req.params;

  const flight = await flightService.findOne(id, 'pending');
  if(!flight){
    return next(new AppError(`flight with id: ${id} not found!`, 404))
  }

  const originCityPromise = cityService.findOneCity(flight.originId);

  const destinationCityPromise =  cityService.findOneCity(flight.destinationId)
  
  const [originCity, destinationCity] = await Promise.all([originCityPromise, destinationCityPromise])


  if (!originCity){
    return next(new AppError('city of origin does not exist'));
  }

  if(!destinationCity){
    return next(new AppError("city of destiny doesn't exists"));
  }

  const weatherConditions = await httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.long}&appid=${envs.API_KEY_WEATHERMAP}`
  )
  if(weatherConditions.weather[0].main === 'Rain'){
    return next(
      new AppError('weather conditions do not meet the requeriments for tokeoff', 400)
    )
  }

  const updatedFlight = await flightService.update(flight, {
    status: 'inProgress',
    checkIn: new Date()
  })

  return res.status(200).json(updatedFlight)
})