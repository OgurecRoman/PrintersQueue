import { Request, Response } from 'express';
import { Printer } from '../models/printer.js';

export const createPrinter = async (req: Request, res: Response) => {
    try {
        if (!req.body.name || !req.body.model) {
            return res.status(400).json({ 
                message: 'Name and model are required',
                received: req.body
            });
        }

        const { name, model } = req.body;
        
        const printer = await Printer.create({ 
            name: name.trim(),
            model: model.trim(),
            status: 'ready'
        });

        res.status(201).json({
            printerId: printer.getDataValue("id")
        });

    } catch (error) {
        console.error('Error creating printer:', error);
        res.status(500).json({ 
            message: 'Failed to create printer',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
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
        const printerId = parseInt(req.params.id);
        
        if (isNaN(printerId)) {
            return res.status(400).json({
                message: 'Invalid printer ID format'
            });
        }

        const printer = await Printer.findByPk(printerId);

        if (!printer) {
            return res.status(404).json({
                message: 'Printer not found',
                requestedId: printerId
            });
        }

        res.json({
            status: printer.getDataValue("status")
        });

    } catch (error) {
        console.error('Error fetching printer:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};