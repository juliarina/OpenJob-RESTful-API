import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class BookmarkRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createBookmark({ userId, jobId }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO bookmarks(id, user_id, job_id) VALUES($1, $2, $3) RETURNING id',
            values: [id, userId, jobId],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteBookmark(userId, jobId) {
        const query = {
            text: 'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
            values: [userId, jobId],
        };

        const result = await this.pool.query(query);

        return result.rows[0]; 
    }

    async getBookmarksByUserId(userId) {
        const query = {
            text: `SELECT 
                        bookmarks.*, 
                        jobs.title, 
                        jobs.description, 
                        jobs.job_type, 
                        jobs.experience_level, 
                        jobs.location_type, 
                        jobs.location_city, 
                        jobs.salary_min, 
                        jobs.salary_max,
                        jobs.is_salary_visible,
                        jobs.status, 
                        companies.id AS company_id,
                        companies.name AS company_name, 
                        categories.id AS category_id,
                        categories.name AS category 
                    FROM bookmarks 
                    LEFT JOIN jobs ON bookmarks.job_id=jobs.id 
                    LEFT JOIN companies ON jobs.company_id=companies.id 
                    LEFT JOIN categories ON jobs.category_id=categories.id 
                    WHERE bookmarks.user_id = $1`,
            values: [userId],
        };

        const result = await this.pool.query(query);

        return result.rows;
    }

    async getBookmarkById(userId, id) {
        const query = {
            text: `SELECT 
                        bookmarks.*, 
                        jobs.title, 
                        jobs.description, 
                        jobs.job_type, 
                        jobs.experience_level, 
                        jobs.location_type, 
                        jobs.location_city, 
                        jobs.salary_min, 
                        jobs.salary_max,
                        jobs.is_salary_visible,
                        jobs.status, 
                        companies.name AS company_name, 
                        categories.name AS category 
                    FROM bookmarks 
                    LEFT JOIN jobs ON bookmarks.job_id=jobs.id 
                    LEFT JOIN companies ON jobs.company_id=companies.id 
                    LEFT JOIN categories ON jobs.category_id=categories.id  
                    WHERE bookmarks.user_id = $1 AND bookmarks.id = $2`,
            values: [userId, id],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }
}

export default new BookmarkRepositories();