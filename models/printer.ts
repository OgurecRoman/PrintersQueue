import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

class Printer extends Model {
  public id!: number;
  public name!: string;
  public model!: string;
  public status!: 'ready' | 'busy';
}

Printer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ready', 'busy'),
    defaultValue: 'ready',
  },
}, {
  sequelize,
  tableName: 'printers',
  timestamps: true,
});

export { Printer };