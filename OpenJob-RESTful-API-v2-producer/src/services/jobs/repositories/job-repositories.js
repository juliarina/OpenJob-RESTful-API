import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class JobRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createJob({ company_id, category_id, owner_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO jobs(id, company_id, category_id, owner_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id',
            values: [id, company_id, category_id, owner_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async editJob({ id, ...fields}) {
        const keys = Object.keys(fields);

        const setClause = keys.map((key, index) => `${key} = $${index+2}`).join(', ');
        const values = Object.values(fields);
        
        const query = {
            text: `UPDATE jobs SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
            values: [id, ...values],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteJob(id) {
        const query = {
            text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this.pool.query(query);

        return result.rows[0]; 
    }

    async getJobs(title = undefined, companyName = undefined) {
        let query = `SELECT 
                        jobs.id,
                        jobs.company_id, 
                        jobs.category_id, 
                        jobs.title, 
                        jobs.description, 
                        jobs.job_type, 
                        jobs.experience_level, 
                        jobs.location_type, 
                        jobs.location_city, 
                        jobs.salary_min, 
                        jobs.salary_max, 
                        jobs.is_salary_visible, 
                        jobs.status 
                    FROM jobs 
                    LEFT JOIN companies ON jobs.company_id=companies.id 
                    LEFT JOIN categories ON jobs.category_id=categories.id`;
        let conditions = [];
        let values = [];

        if (title) {
            values.push(`%${title}%`);
            conditions.push(`title ILIKE $${values.length}`);
        }

        if (companyName) {
            values.push(`%${companyName}%`);
            conditions.push(`companies.name ILIKE $${values.length}`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await this.pool.query(query, values);

        return result.rows;
    }

    async getJobById(id) {
        const query = {
            text: 'SELECT jobs.*, companies.name AS company_name, categories.name AS category FROM jobs LEFT JOIN companies ON jobs.company_id=companies.id LEFT JOIN categories ON jobs.category_id=categories.id WHERE jobs.id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async getJobsByCompanyId(companyId) {
        const query = {
            text: 'SELECT jobs.*, companies.name AS company_name, categories.name AS category FROM jobs INNER JOIN companies ON jobs.company_id=companies.id INNER JOIN categories ON jobs.category_id=categories.id WHERE company_id = $1',
            values: [companyId],
        };

        const result = await this.pool.query(query);

        return result.rows;
    }

    async getJobsByCategoryId(categoryId) {
        const query = {
            text: 'SELECT jobs.*, companies.name AS company_name, categories.name AS category FROM jobs INNER JOIN companies ON jobs.company_id=companies.id INNER JOIN categories ON jobs.category_id=categories.id WHERE category_id = $1',
            values: [categoryId],
        };

        const result = await this.pool.query(query);

        return result.rows;
    }
}

export default new JobRepositories();