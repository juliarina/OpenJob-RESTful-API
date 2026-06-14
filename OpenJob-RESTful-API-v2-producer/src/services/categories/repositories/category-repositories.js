import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class CategoryRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createCategory({ name }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO categories(id, name) VALUES($1, $2) RETURNING id',
            values: [id, name],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async editCategory({ id, name }) {
        const query = {
            text: 'UPDATE categories SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
            values: [name, id],
        }

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteCategory(id) {
        const query = {
            text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this.pool.query(query);
        
        return result.rows[0];
    }

    async getAllCategories() {
        const result = await this.pool.query('SELECT * FROM categories');
        
        return result.rows;
    }

    async getCategoryById(id) {
        const query = {
            text: 'SELECT * FROM categories WHERE id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }
}

export default new CategoryRepositories();