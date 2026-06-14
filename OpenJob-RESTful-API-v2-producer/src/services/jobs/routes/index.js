import { Router } from 'express';
import { getJobs, getJobById, createJob, editJob, deleteJob, getJobsByCompanyId, getJobsByCategoryId } from '../controller/job-controller.js';
import validate from '../../../middlewares/validate.js';
import { jobPayloadSchema, editJobPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

// public
router.get('/', getJobs);
router.get('/:id', getJobById);
router.get('/company/:companyId', getJobsByCompanyId);
router.get('/category/:categoryId', getJobsByCategoryId);

// protected
router.post('/', authenticateToken, validate(jobPayloadSchema), createJob);
router.put('/:id', authenticateToken, validate(editJobPayloadSchema), editJob);
router.delete('/:id', authenticateToken, validate(jobPayloadSchema), deleteJob);

export default router;