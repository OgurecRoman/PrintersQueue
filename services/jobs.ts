import { CreationAttributes } from 'sequelize';
import initializeModels from '../models';
import Job from '../models/job.js';
import Queue from '../models/queue.js';

const models = initializeModels();

export const createJob = async (jobData: CreationAttributes<Job>) => {
  const job = await models['Job'].create({
    ...jobData,
    status: 'queued',
  });

  // Add to queue
  const lastInQueue = await models['Queue'].findOne({
    where: { printerId: jobData.printerId },
    order: [['position', 'DESC']],
  });

  const position = lastInQueue ? lastInQueue.position + 1 : 1;

  await models['Queue'].create({
    jobId: job.id,
    printerId: jobData.printerId,
    position,
  } as CreationAttributes<Queue> );

  return job;
};

export const getJobById = async (id: number) => {
  return await models['Job'].findByPk(id);
};

export const getJobsByPrinterId = async (printerId: number) => {
  return await models['Queue'].findAll({
    where: { printerId },
    include: [
      {
        model: models['Job'],
        as: 'Job',
      },
    ],
    order: [['position', 'ASC']],
  });
};

export const updateJobStatus = async (id: number, status: 'queued' | 'printing' | 'completed' | 'failed') => {
  const job = await models['Job'].findByPk(id);
  if (!job) {
    throw new Error('Job not found');
  }
  job.status = status;
  await job.save();

  // If job is completed or failed, remove from queue
  if (status === 'completed' || status === 'failed') {
    await models['Queue'].destroy({ where: { jobId: id } });
    
    // Update printer status if it was busy
    const printer = await models['Printer'].findByPk(job.printerId);
    if (printer && printer.status === 'busy') {
      printer.status = 'ready';
      await printer.save();
    }
  }

  return job;
};