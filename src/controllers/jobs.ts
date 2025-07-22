import { Queue } from '../models/queue.js';
import { Request, Response } from 'express';
import { Job } from '../models/job.js';
import { Printer } from '../models/printer.js';

export const createJob = async (req: Request, res: Response) => {
  try {
      if (!req.body.documentName || !req.body.documentPath || !req.body.printerId) {
            return res.status(400).json({ 
                message: 'documentName, documentPath and printerId are required',
                received: req.body
        });
      }
    const { documentName, documentPath, printerId } = req.body;

    const printer = await Printer.count({
      where: { id: printerId },
    });

    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }

    const job = await Job.create({
      documentName,
      documentPath,
      status: 'queued'
    })

    const queueLength = await Queue.count({
      where: { printerId }
    });

     const jobId = Number(job.getDataValue('id'))

    const queueItem = await Queue.create({
      printerId,
      jobId: jobId,
      position: queueLength + 1
    });
    
    return res.status(201).json({
      job: {
        id: jobId,
      },
      queuePosition: {
        position: queueItem.getDataValue("position")
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

export const getJobStatus = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.id);
        
        if (isNaN(jobId)) {
            return res.status(400).json({
                message: 'Invalid printer ID format'
            });
        }

        const job = await Job.findByPk(jobId);

        if (!job) {
            return res.status(404).json({
                message: 'Printer not found',
                requestedId: jobId
            });
        }

        res.json({
            status: job.getDataValue("status")
        });

    } catch (error) {
        console.error('Error fetching printer:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

interface JobQueue {
  [position: number]: Job | null;
}

export const getPrinterQueue = async (req: Request, res: Response) => {
  try {
    const printerId = parseInt(req.params.printerId);

    const queueItems = await Queue.findAll({
      where: { printerId },
    });

    const queue: JobQueue = {}

    for (let i=0;i<queueItems.length;i++){
      const job = await Job.findByPk(Number(queueItems[i].getDataValue("jobId")));
      const pos = queueItems[i].getDataValue("position");
      queue[pos] = job;
    }

    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching printer queue', error });
  }
};