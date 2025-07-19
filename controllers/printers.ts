import { Request, Response } from 'express';
import * as printersService from '../services/printers.js';

export const createPrinter = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const printer = await printersService.createPrinter({ name, description });
    res.status(201).json(printer);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getAllPrinters = async (req: Request, res: Response) => {
  try {
    const printers = await printersService.getAllPrinters();
    res.json(printers);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getPrinterStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const printer = await printersService.getPrinterById(parseInt(id));
    if (!printer) {
      return res.status(404).json({ error: 'Printer not found' });
    }
    res.json({ status: printer.status });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};