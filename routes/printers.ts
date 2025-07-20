import { Router } from 'express';
import * as printersController from '../controllers/printers.js';

const router = Router();

router.post('/', printersController.createPrinter);
router.get('/', printersController.getAllPrinters);
router.get('/:id', printersController.getPrinterStatus);

export default router;