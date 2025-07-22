import { Router } from 'express';
import printersRouter from './printers.js';
import jobsRouter from './jobs.js';

const router = Router();

router.use('/printers', printersRouter);
router.use('/jobs', jobsRouter);

export default router;