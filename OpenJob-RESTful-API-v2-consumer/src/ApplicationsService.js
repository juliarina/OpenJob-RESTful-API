import { Pool } from 'pg';

class ApplicationsService {
    constructor() {
        this._pool = new Pool();
    }   

    async getApplicantData(id) {
        const query = {
            text:  `SELECT 
                    users.name AS applicant_name,
                    users.email AS applicant_email,
                    applications.created_at AS applied_at
                    FROM applications 
                    LEFT JOIN users ON applications.user_id=users.id 
                    WHERE applications.id = $1`,
            values: [id],
        };

        const result = await this._pool.query(query);

        return result.rows[0];
    }

    async getJobData(id) {
        const query = {
            text:  `SELECT 
                        users.email AS owner_email,
                        jobs.title AS job_title
                    FROM applications 
                    LEFT JOIN jobs ON applications.job_id=jobs.id
                    LEFT JOIN users ON jobs.owner_id=users.id 
                    WHERE applications.id = $1`,
            values: [id],
        };

        const result = await this._pool.query(query);

        return result.rows[0];
    }
}

export default ApplicationsService;