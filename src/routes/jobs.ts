import { Router } from 'express';
import * as jobsController from '../controllers/jobs.js';

const router = Router();

router.post('/', jobsController.createJob);
router.get('/:id', jobsController.getJobStatus);
router.get('/queue/:printerId', jobsController.getPrinterQueue);

export default router;