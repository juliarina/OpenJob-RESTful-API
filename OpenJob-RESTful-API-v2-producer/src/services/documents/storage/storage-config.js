import fs from 'fs';
import path from 'path';
import multer from 'multer';
import ClientError from '../../../exceptions/client-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const UPLOAD_FOLDER = path.resolve(process.cwd(), 'src/services/uploads/documents');

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new ClientError('File is required'), false);
    }
});

export const download = (res, filePath, fileName) => {
    if (!fs.existsSync(filePath)) {
        throw new NotFoundError('Document not found');
    }

    return res.download(filePath, fileName);
}

export const _delete = async (filePath) => {
    if (!fs.existsSync(filePath)) {
        throw new NotFoundError('Document not found');
    }

    await fs.unlinkSync(filePath);
}

export default { UPLOAD_FOLDER, storage, upload };