import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const City = sequelize.define('city', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT(),
    allowNull: false
  },
  long: {
    type: DataTypes.FLOAT(),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},{
  indexes: [
    {
      unique: true,
      fields: ['name', 'country']
    }
  ]
})

export default City