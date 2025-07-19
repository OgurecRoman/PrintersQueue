import { Router } from 'express';
import * as printersController from '../controllers/printers.js';
// import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/', printersController.createPrinter);
router.get('/', printersController.getAllPrinters);
router.get('/:id', printersController.getPrinterStatus);

// router.post('/', authenticateToken, printersController.createPrinter);
// router.get('/', authenticateToken, printersController.getAllPrinters);
// router.get('/:id', authenticateToken, printersController.getPrinterStatus);

export default router;