import { Router } from 'express';
import { login, refreshToken, logout } from '../controller/authentication-controller.js';
import validate from '../../../middlewares/validate.js';
import {
    postAuthenticationPayloadSchema,
    putAuthenticationPayloadSchema,
    deleteAuthenticationPayloadSchema
} from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

// public
router.post('/', validate(postAuthenticationPayloadSchema), login);
router.put('/', validate(putAuthenticationPayloadSchema), refreshToken);

// protected
router.delete('/', authenticateToken, validate(deleteAuthenticationPayloadSchema), logout);

export default router;