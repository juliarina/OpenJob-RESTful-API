import { Router } from "express";
import { deleteDocument, getDocumentById, getDocuments, uploadDocument } from "../controller/document-controller.js";
import authenticateToken from "../../../middlewares/auth.js";
import { upload } from '../storage/storage-config.js';

const router = Router();

// public
router.get('/', getDocuments);
router.get('/:id', getDocumentById);

// protected
router.post('/', authenticateToken, upload.single('document'), uploadDocument);
router.delete('/:id', authenticateToken, deleteDocument);

export default router;