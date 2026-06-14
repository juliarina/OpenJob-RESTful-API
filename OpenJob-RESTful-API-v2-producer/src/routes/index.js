import { Router } from 'express';
import applicationsRoutes from '../services/applications/routes/index.js';
import authenticationsRoutes from '../services/authentications/routes/index.js';
import bookmarksRoutes from '../services/bookmarks/routes/index.js';
import categoriesRoutes from '../services/categories/routes/index.js';
import companiesRoutes from '../services/companies/routes/index.js';
import jobsRoutes from '../services/jobs/routes/index.js';
import profileRoutes from '../services/profile/routes/index.js';
import usersRoutes from '../services/users/routes/index.js';
import documentsRoutes from '../services/documents/routes/index.js';

const router = Router();

router.use('/applications', applicationsRoutes);
router.use('/authentications', authenticationsRoutes);
router.use('/', bookmarksRoutes);
router.use('/categories', categoriesRoutes);
router.use('/companies', companiesRoutes);
router.use('/jobs', jobsRoutes);
router.use('/profile', profileRoutes);
router.use('/users', usersRoutes);
router.use('/documents', documentsRoutes);

export default router;