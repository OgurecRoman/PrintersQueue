import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import { Printer } from './printer';
import { Job } from './job';

class Queue extends Model {
  public id!: number;
  public printerId!: number;
  public jobId!: number;
  public position!: number;
}

Queue.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  printerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Printer,
      key: 'id',
    },
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Job,
      key: 'id',
    },
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Queue',
  tableName: 'queue',
  timestamps: true,
});

export { Queue };