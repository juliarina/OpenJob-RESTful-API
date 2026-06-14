import { nanoid } from "nanoid";
import { Pool } from 'pg';

class DocumentRepositories {
    constructor() {
        this.pool = new Pool();        
    }

    async addDocument({ userId, fileName, originalName, filePath, fileType, fileSize }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO documents(id, user_id, file_name, original_name, file_path, file_type, file_size) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, userId, fileName, originalName, filePath, fileType, fileSize]
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteDocument(id) {
        const query = {
            text: 'DELETE FROM documents WHERE id = $1 RETURNING id, file_path',
            values: [id],
        };

        const result = await this.pool.query(query);
        
        return result.rows[0];
    }

    async getDocuments() {
        const result = await this.pool.query('SELECT * FROM documents');

        return result.rows;
    }

    async getDocumentById(id) {
        const query = {
            text: 'SELECT * FROM documents WHERE id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }
}

export default new DocumentRepositories();