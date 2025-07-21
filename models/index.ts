import { Printer } from './printer';
import { Job } from './job';
import { Queue } from './queue.js';
import { sequelize } from '../config/config.js';

// Установка ассоциаций
function setupAssociations() {
  Printer.hasMany(Queue, { foreignKey: 'printerId' });
  Job.hasOne(Queue, { foreignKey: 'jobId' });
  Queue.belongsTo(Printer, { foreignKey: 'printerId' });
  Queue.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
}

export {
  sequelize,
  Printer,
  Job,
  Queue,
  setupAssociations
};

export enum PrinterStatus {
  READY = 'ready',
  BUSY = 'busy',
}

export enum JobStatus {
  QUEUED = 'queued',
  PRINTING = 'printing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}