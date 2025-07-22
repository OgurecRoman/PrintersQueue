import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

class Job extends Model {
  public id!: number;
  public documentName!: string;
  public documentPath!: string;
  public status!: 'queued' | 'printing' | 'completed' | 'failed';
  public completedAt!: Date | null;
}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  documentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('queued', 'printing', 'completed', 'failed'),
    defaultValue: 'queued',
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Jobs',
  tableName: 'jobs',
  timestamps: true,
});

export { Job };