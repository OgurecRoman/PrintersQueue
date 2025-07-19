import { Request, Response } from 'express';
import * as jobsService from '../services/jobs.js';
import * as printersService from '../services/printers.js';

export const createJob = async (req: Request, res: Response) => {
  try {
    const { documentName, documentPath, printerId, userId } = req.body;
    
    // Check if printer exists
    const printer = await printersService.getPrinterById(printerId);
    if (!printer) {
      return res.status(404).json({ error: 'Printer not found' });
    }

    const job = await jobsService.createJob({
      documentName,
      documentPath,
      printerId,
      userId,
    });

    // If printer is ready, start printing
    if (printer.status === 'ready') {
      await printersService.updatePrinterStatus(printerId, 'busy');
      await jobsService.updateJobStatus(job.id, 'printing');
    }

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getJobStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await jobsService.getJobById(parseInt(id));
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ status: job.status });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getPrinterQueue = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;
    const queue = await jobsService.getJobsByPrinterId(parseInt(printerId));
    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};