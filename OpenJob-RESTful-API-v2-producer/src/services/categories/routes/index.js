import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import { categoryPayloadSchema } from '../../categories/validator/schema.js';
import { createCategory, editCategory, deleteCategory, getCategories, getCategoryById } from '../controller/category-controller.js';

const router = Router();

// public
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// protected
router.post('/', authenticateToken, validate(categoryPayloadSchema), createCategory);
router.put('/:id', authenticateToken, validate(categoryPayloadSchema), editCategory);
router.delete('/:id', authenticateToken, deleteCategory);

export default router;