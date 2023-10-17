import { AppError, catchAsync } from '../errors/index.js'
import { validatePartialPassenger, validatePassenger } from "./passengers.schema.js";
import { PassengerService } from "./passengers.service.js";

const passengerService = new PassengerService();

export const findAllPassengers = catchAsync(async (req, res, next) => {
    const passengers = await passengerService.findAllPassengers()
    return res.json(passengers)
})

export const createPassenger = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, passengerData } = validatePassenger(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
      })
    }
    
    const passenger = await passengerService.createPassenger(passengerData)
    return res.status(201).json(passenger)
})

export const findOnePassenger = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const passenger = await passengerService.findOnePassenger(id)

    if(!passenger){
      return next(new AppError(`Passenger with id: ${id} not found`, 404))
    }

    return res.json(passenger)
})

export const updatePassenger = catchAsync(async(req, res) => {
    const { hasError, errorMessages, passengerData } = validatePartialPassenger(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
      })
    }
    
    const { id } = req.params;
  
    const passenger = await passengerService.findOnePassenger(id)
    
    if(!passenger){
      return res.status(404).json({
        status: 'error',
        message: `passenger with id ${ id } not found`
      })
    }

    //4. en caso de que exista, se procede a actualizar el pasajero
    const updatedPassenger = await passengerService.updatePassenger(passenger, passengerData)
    //5. retornamos el pasajero actualizado.
    return res.json(updatedPassenger)
})

export const deletePassenger = catchAsync(async(req, res) => {
    const { id } = req.params;

    const passenger = await passengerService.findOnePassenger(id)

    if(!passenger){
      return res.status(404).json({
        status: 'error',
        message: `Passenger with id ${id} not found`
      })
    }
    
    await passengerService.deletePassenger(passenger)
    
    return res.status(204).json(null)
})