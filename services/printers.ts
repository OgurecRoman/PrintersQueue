import { CreationAttributes } from 'sequelize'
import initializeModels from '../models';
import Printer from '../models/printer.js';

const models = initializeModels();

export const createPrinter = async (printerData: CreationAttributes<Printer>) => {
  const printer = await models['Printer'].create({
    ...printerData,
    status: 'ready',
  });
  return printer;
};

export const getAllPrinters = async () => {
  return await models['Printer'].findAll();
};

export const getPrinterById = async (id: number) => {
  return await models['Printer'].findByPk(id);
};

export const updatePrinterStatus = async (id: number, status: 'ready' | 'busy') => {
  const printer = await models['Printer'].findByPk(id);
  if (!printer) {
    throw new Error('Printer not found');
  }
  printer.status = status;
  await printer.save();
  return printer;
};