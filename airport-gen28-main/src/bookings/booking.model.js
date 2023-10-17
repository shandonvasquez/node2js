import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Booking = sequelize.define('booking', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'booking_date'
  },
  passengerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'passenger_id'
  },
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'flight_id'
  },
  nroTickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'nro_tickets'
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'total_price'
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'created_by'
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  }
})


export default Booking;