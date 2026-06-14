import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import { getUserById, getApplicationsByUserId, getBookmarksByUserId } from '../controller/profile-controller.js';

const router = Router();

// protected
router.get('/', authenticateToken, getUserById);
router.get('/applications', authenticateToken, getApplicationsByUserId);
router.get('/bookmarks', authenticateToken, getBookmarksByUserId);

export default router;