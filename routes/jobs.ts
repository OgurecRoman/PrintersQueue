import { Router } from 'express';
import * as jobsController from '../controllers/jobs.js';
// import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/', jobsController.createJob);
router.get('/:id', jobsController.getJobStatus);
router.get('/queue/:printerId', jobsController.getPrinterQueue);

// router.post('/', authenticateToken, jobsController.createJob);
// router.get('/:id', authenticateToken, jobsController.getJobStatus);
// router.get('/queue/:printerId', authenticateToken, jobsController.getPrinterQueue);

export default router;