import User from "../../auth/user.model.js";
import Booking from "../../bookings/booking.model.js";
import City from "../../city/city.model.js";
import Flight from "../../flights/flight.model.js";
import Passenger from "../../passengers/passengers.model.js";
import Plane from "../../plane/plane.model.js";
import Ticket from "../../tickets/ticket.model.js";

export const initModel = () => {
  User.hasMany(Passenger, { foreignKey: 'created_by', as: 'userCreatePassenger' })
  Passenger.belongsTo(User, { foreignKey: 'created_by' })

  Passenger.hasMany(Booking, { foreignKey: 'passenger_id', as: 'passengerHasBookings' })
  Booking.belongsTo(Passenger, { foreignKey: 'passenger_id' })

  User.hasMany(Booking, {foreignKey: 'created_by', as: 'userCreateBooking'})
  Booking.belongsTo(User, {foreignKey: 'created_by'})

  Flight.hasMany(Booking, { foreignKey: 'flight_id', as: 'flighHasBookings' })
  Booking.belongsTo(Flight, { foreignKey: 'flight_id' })

  Booking.hasMany(Ticket, { foreignKey: 'booking_id', as: 'bookingHasTicket' })
  Ticket.belongsTo(Booking, { foreignKey: 'booking_id' })

  User.hasMany(Ticket ,{ foreignKey: 'created_by', as: 'userSoldTicket' })
  Ticket.belongsTo(User, { foreignKey: 'created_by' })

  Passenger.hasMany(Ticket, { foreignKey: 'passenger_id', as: 'passengerHasTicket' })
  Ticket.belongsTo(Passenger, { foreignKey: 'passenger_id' });

  Flight.hasMany(Ticket, { foreignKey: 'flight_id', as: 'flightHasTickets' })
  Ticket.belongsTo(Flight, { foreignKey: 'flight_id' })

  Plane.hasMany(Flight, { foreignKey: 'plane_id', as: 'planeHasFlight'})
  Flight.belongsTo(Plane, { foreignKey: 'plane_id' })

  City.hasMany(Flight, { foreignKey: 'destination_id'})
  Flight.belongsTo(City, { foreignKey: 'destination_id', as: 'destination'})

  City.hasMany(Flight, { foreignKey: 'origin_id'})
  Flight.belongsTo(City, { foreignKey: 'origin_id', as: 'origin'})


}

