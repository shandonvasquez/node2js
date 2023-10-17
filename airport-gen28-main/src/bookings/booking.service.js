import User from "../auth/user.model.js";
import Flight from "../flights/flight.model.js";
import Passenger from "../passengers/passengers.model.js";
import Plane from "../plane/plane.model.js";
import Booking from "./booking.model.js";

export class BookingService {

  async findOne(id) {
    return await Booking.findOne({ where: { id, status: 'pending' } });
  }

  async findAll(status) {
    return await Booking.findAll({ 
      attributes: {
        exclude: ['flightId', 'passengerId']
      },
      where: { 
        status: status 
      },
      include: [
        {
          model: Flight,
          include: [
            {
              model: Plane
            }
          ]
        },
        {
          model: Passenger,
          include: [
            {
              model: User,
              attributes: ['fullname', 'email']
            }
          ]
        }
      ] 
    });
  }

  async create(data) {
    return await Booking.create(data);
  }

  async update(booking, data) {
    return await booking.update(data);
  }

  async delete(booking) {
    return await booking.update({ status: 'cancelled' });
  }

}