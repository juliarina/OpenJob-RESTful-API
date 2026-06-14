import ClientError from "../../../exceptions/client-error.js";
import NotFoundError from "../../../exceptions/not-found-error.js";
import response from "../../../utils/response.js";
import DocumentRepositories from "../repositories/document-repositories.js";
import { download, _delete } from "../storage/storage-config.js";

export const uploadDocument = async (req, res, next) => {
    if (!req.file) {
        return next(new ClientError('File is required'));
    }

    const userId = req.user.id;
    const fileName = req.file.filename;
    const originalName = req.file.originalname;
    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;

    const document = await DocumentRepositories.addDocument({
        userId, 
        fileName, 
        originalName, 
        filePath, 
        fileType, 
        fileSize
    });

    return response(res, 201, 'File uploaded successfully', { documentId: document.id, filename: fileName, originalName, size: fileSize });
};

export const deleteDocument = async (req, res, next) => {
    const { id } = req.params;

    const deletedDocument = await DocumentRepositories.deleteDocument(id);
    
    if (!deletedDocument?.file_path) {
        return next(new NotFoundError('document not found'));
    }

    _delete(deletedDocument.file_path);

    return response(res, 200, 'Document deleted successfully', deletedDocument.id);
};

export const getDocuments = async (req, res, next) => {
    const documents = await DocumentRepositories.getDocuments();

    return response(res, 200, 'Documents retrieved successfully', { documents: documents });
};

export const getDocumentById = async (req, res, next) => {
    const { id } = req.params;

    const document = await DocumentRepositories.getDocumentById(id);

    if (!document) {
        return next(new NotFoundError('Document not found'));
    }

    const { file_path, file_name } = document;

    download(res, file_path, file_name);
};