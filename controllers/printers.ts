import { Request, Response } from 'express';
import { Printer } from '../models/printer.js';

export const createPrinter = async (req: Request, res: Response) => {
  try {
    const { name, model } = req.body;
    const printer = await Printer.create({ name, model, status: 'ready' });
    res.status(201).json({ printerId: printer.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating printer', error });
  }
};

export const getAllPrinters = async (req: Request, res: Response) => {
  try {
    const printers = await Printer.findAll();
    res.json(printers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching printers', error });
  }
};

export const getPrinterStatus = async (req: Request, res: Response) => {
  try {
    const printer = await Printer.findByPk(req.params.id);
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }
    res.json({ status: printer.status });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching printer status', error });
  }
};