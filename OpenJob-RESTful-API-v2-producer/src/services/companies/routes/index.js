import { Router } from 'express';
import { getCompanies, getCompanyById, createCompany, editCompany, deleteCompany } from '../controller/company-controller.js';
import validate from '../../../middlewares/validate.js'
import { companyPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

// public
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
    
// protected
router.post('/', authenticateToken, validate(companyPayloadSchema), createCompany);
router.put('/:id', authenticateToken, validate(companyPayloadSchema), editCompany);
router.delete('/:id', authenticateToken, deleteCompany);

export default router;