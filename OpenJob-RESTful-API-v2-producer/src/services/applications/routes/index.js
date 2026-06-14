import { Router } from 'express';
import validate from '../../../middlewares/validate.js';
import { applicationPayloadSchema, statusUpdatePayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import { createApplication, getApplications, getApplicationById, getApplicationsByUserId, getApplicationsByJobId, editApplicationStatus, deleteApplication } from '../controller/application.controller.js';

const router = Router();

// protected
router.post('/', authenticateToken, validate(applicationPayloadSchema), createApplication);
router.get('/', authenticateToken, getApplications);
router.get('/:id', authenticateToken, getApplicationById);
router.get('/user/:userId', authenticateToken, getApplicationsByUserId);
router.get('/job/:jobId', authenticateToken, getApplicationsByJobId);
router.put('/:id', authenticateToken, validate(statusUpdatePayloadSchema), editApplicationStatus);
router.delete('/:id', authenticateToken, deleteApplication);

export default router;