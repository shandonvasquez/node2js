import { DataTypes } from 'sequelize';
import sequelize from '../config/database/database.js';

const Plane = sequelize.define('planes', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  planeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'plane_number',
  },
  model: {
    type: DataTypes.STRING(90),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  airline: {
    type: DataTypes.ENUM(
      'AeroGlobe',
      'AeroTronix',
      'VelocityAir',
      'AirQuest',
      'StarLinx'
    ),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Plane;
