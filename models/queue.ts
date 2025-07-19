import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelize } from './index.js';
import Job from './job.js';
import Printer from './printer.js';

interface QueueAttributes {
  id: number;
  jobId: number;
  printerId: number;
  position: number;
}

class Queue extends Model<QueueAttributes> implements QueueAttributes {
  public id!: CreationOptional<number>;
  public jobId!: number;
  public printerId!: number;
  public position!: number;
}

Queue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id',
      },
    },
    printerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'printers',
        key: 'id',
      },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Queue',
    tableName: 'queues',
    timestamps: true,
  }
);

Queue.belongsTo(Job, { foreignKey: 'jobId' });
Queue.belongsTo(Printer, { foreignKey: 'printerId' });

export default Queue;