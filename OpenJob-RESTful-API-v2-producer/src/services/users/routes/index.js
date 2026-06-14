import { Router } from 'express';
import { createUser, getUserById } from '../controller/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../validator/schema.js';

const router = Router();

// public 
router.post('/', validate(userPayloadSchema), createUser);
router.get('/:id', getUserById);

export default router;