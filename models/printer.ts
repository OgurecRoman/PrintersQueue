import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelize } from './index.js';

interface PrinterAttributes {
  id?: number;
  name: string;
  description: string;
  status?: 'ready' | 'busy';
}

class Printer extends Model<PrinterAttributes> implements PrinterAttributes {
  public id: CreationOptional<number>;
  public name!: string;
  public description!: string;
  public status: 'ready' | 'busy';
}

Printer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ready', 'busy'),
      allowNull: false,
      defaultValue: 'ready',
    },
  },
  {
    sequelize,
    modelName: 'Printer',
    tableName: 'printers',
    timestamps: true,
  }
);

export default Printer;