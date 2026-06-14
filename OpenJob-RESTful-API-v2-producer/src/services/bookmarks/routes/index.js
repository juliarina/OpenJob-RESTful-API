import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import { createBookmark, getBookmarkById, deleteBookmark, getBookmarksByUserId } from '../controller/bookmark-controller.js';

const router = Router();

// protected
router.post('/jobs/:jobId/bookmark', authenticateToken, createBookmark);
router.get('/jobs/:jobId/bookmark/:id', authenticateToken, getBookmarkById);
router.delete('/jobs/:jobId/bookmark', authenticateToken, deleteBookmark);
router.get('/bookmarks', authenticateToken, getBookmarksByUserId);

export default router;