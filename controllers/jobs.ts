import { Queue } from '../models/queue.js';
import { JobStatus } from '../models/index.js';
import { Request, Response } from 'express';
import { Job } from '../models/job.js';
import { Printer } from '../models/printer.js';

export const createJob = async (req: Request, res: Response) => {
  try {
    const { documentName, documentPath, printerId } = req.body;
    const job = await Job.create({
      documentName,
      documentPath,
      status: JobStatus.QUEUED,
    });

    const printer = await Printer.findByPk(printerId);
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }

    const queueLength = await Queue.count({
      where: { printerId },
    });

    await Queue.create({
      printerId,
      jobId: job.id,
      position: queueLength + 1,
    });

    res.status(201).json({ jobId: job.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

export const getJobStatus = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ status: job.status });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job status', error });
  }
};

export const getPrinterQueue = async (req: Request, res: Response) => {
  try {
    const printerId = parseInt(req.params.printerId);
    const queueItems = await Queue.findAll({
      where: { printerId },
      include: [Job],
      order: [['position', 'ASC']]
    });

    const queue = queueItems.map(item => ({
      jobId: item.job?.id,
      documentName: item.job?.documentName,
      status: item.job?.status,
      position: item.position
    }));

    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching printer queue', error });
  }
};