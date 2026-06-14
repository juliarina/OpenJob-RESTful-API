import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class ApplicationRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createApplication({ user_id, job_id, status }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO applications(id, user_id, job_id, status) VALUES($1, $2, $3, $4) RETURNING *',
            values: [id, user_id, job_id, status],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async editApplicationStatus({ id, status }) {
        const query = {
            text: 'UPDATE applications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, user_id, job_id',
            values: [status, id],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteApplication(id) {
        const query = {
            text: 'DELETE FROM applications WHERE id = $1 RETURNING id, user_id, job_id',
            values: [id],
        };

        const result = await this.pool.query(query);

        return result.rows[0]; 
    }

    async getApplications() {
        const query = `SELECT 
                            applications.*,
                            jobs.title,
                            jobs.description,
                            jobs.job_type,
                            companies.id AS company_id,
                            companies.name AS company_name,
                            categories.id AS category_id,
                            categories.name AS category
                        FROM applications 
                        LEFT JOIN jobs ON applications.job_id=jobs.id 
                        LEFT JOIN companies ON jobs.company_id=companies.id 
                        LEFT JOIN categories ON jobs.category_id=categories.id`

        const result = await this.pool.query(query);

        return result.rows;
    }

    async getApplicationById(id) {
        const query = {
            text:  `SELECT 
                        applications.*, 
                        jobs.title, 
                        jobs.description, 
                        jobs.job_type, 
                        jobs.experience_level, 
                        jobs.location_type, 
                        jobs.location_city, 
                        jobs.salary_min, 
                        jobs.salary_max,
                        jobs.is_salary_visible,
                        companies.name AS company_name, 
                        categories.name AS category 
                    FROM applications 
                    LEFT JOIN jobs ON applications.job_id=jobs.id 
                    LEFT JOIN companies ON jobs.company_id=companies.id 
                    LEFT JOIN categories ON jobs.category_id=categories.id 
                    WHERE applications.id = $1`,
            values: [id],
        };

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async getApplicationsByUserId(userId) {
        const query = {
            text: `SELECT 
                        applications.*,
                        jobs.title,
                        jobs.description,
                        jobs.job_type,
                        jobs.experience_level, 
                        jobs.location_type,
                        companies.id AS company_id,
                        companies.name AS company_name,
                        categories.id AS category_id,
                        categories.name AS category
                    FROM applications 
                    LEFT JOIN jobs ON applications.job_id=jobs.id 
                    LEFT JOIN companies ON jobs.company_id=companies.id 
                    LEFT JOIN categories ON jobs.category_id=categories.id
                    WHERE applications.user_id = $1`,
            values: [userId],
        };

        const result = await this.pool.query(query);

        return result.rows;
    }

    async getApplicationsByJobId(jobId) {
        const query = {
            text: `SELECT 
                        applications.*, 
                        jobs.title, 
                        jobs.description, 
                        jobs.job_type, 
                        jobs.experience_level, 
                        jobs.location_type, 
                        jobs.location_city, 
                        jobs.salary_min, 
                        jobs.salary_max,
                        jobs.is_salary_visible,
                        companies.name AS company_name, 
                        categories.name AS category 
                    FROM applications 
                    LEFT JOIN jobs ON applications.job_id=jobs.id 
                    LEFT JOIN companies ON jobs.company_id=companies.id 
                    LEFT JOIN categories ON jobs.category_id=categories.id
                    WHERE applications.job_id = $1`,
            values: [jobId],
        };

        const result = await this.pool.query(query);

        return result.rows;
    }
}

export default new ApplicationRepositories();