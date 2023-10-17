import { DataTypes } from 'sequelize';
import sequelize from '../config/database/database.js';

const Flight = sequelize.define('flights', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  originId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'origin_id',
  },
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'destination_id',
  },
  planeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'plane_id',
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'departure_date',
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'check_in',
  },
  status: {
    type: DataTypes.ENUM('pending', 'inProgress', 'done', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

export default Flight;
