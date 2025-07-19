import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelize } from './index.js';
import Printer from './printer.js';

interface JobAttributes {
  id?: number;
  documentName: string;
  documentPath: string;
  status?: 'queued' | 'printing' | 'completed' | 'failed';
  printerId: number;
  userId: number;
}

class Job extends Model<JobAttributes> implements JobAttributes {
  public id: CreationOptional<number>;
  public documentName!: string;
  public documentPath!: string;
  public status: 'queued' | 'printing' | 'completed' | 'failed';
  public printerId!: number;
  public userId!: number;

  public static associate(models: any) {}
}

Job.init(
  {
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
      allowNull: false,
      defaultValue: 'queued',
    },
    printerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'printers',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Job',
    tableName: 'jobs',
    timestamps: true,
  }
);

Job.belongsTo(Printer, { foreignKey: 'printerId' });
Printer.hasMany(Job, { foreignKey: 'printerId' });

export default Job;