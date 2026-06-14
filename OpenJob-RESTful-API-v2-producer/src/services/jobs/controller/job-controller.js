import JobRepositories from "../repositories/job-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

export const createJob = async (req, res, next) => {
    const { company_id, category_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status } = req.validated;

    const owner_id = req.user.id;

    const job = await JobRepositories.createJob({
        company_id, 
        category_id, 
        owner_id,
        title, 
        description, 
        job_type, 
        experience_level, 
        location_type, 
        location_city, 
        salary_min, 
        salary_max, 
        is_salary_visible, 
        status
    });

    if (!job) {
        return next(new InvariantError('Failed to create job'));
    }

    return response(res, 201, 'Job added successfully', job);
};

export const editJob = async (req, res, next) => {
    const { id } = req.params;
    const fields = req.validated;

    const job = await JobRepositories.editJob({
        id,
        ...fields,
    });

    if (!job) {
        return next(new NotFoundError('Job not found'));
    }

    return response(res, 200, 'Job updated successfully', job);
};

export const deleteJob = async (req, res, next) => {
    const { id } = req.params;

    const deletedJob = await JobRepositories.deleteJob(id);

    if (!deletedJob?.id) {
        return next(new NotFoundError('Job not found'));
    }

    return response(res, 200, 'Job deleted successfully', deletedJob.id);
};

export const getJobs = async (req, res, next) => {
    const title = req.query.title;
    const companyName = req.query['company-name'];

    const jobs = await JobRepositories.getJobs(title, companyName);

    return response(res, 200, 'Jobs retrieved successfully', { jobs: jobs });
};

export const getJobById = async (req, res, next) => {
    const { id } = req.params;

    const job = await JobRepositories.getJobById(id);

    if (!job) {
        return next(new NotFoundError('Job not found'));
    }

    return response(res, 200, 'Job retrieved successfully', job);
};

export const getJobsByCompanyId = async (req, res, next) => {
    const { companyId } = req.params;

    const jobs = await JobRepositories.getJobsByCompanyId(companyId);

    return response(res, 200, 'Jobs retrieved successfully', { jobs: jobs });
};

export const getJobsByCategoryId = async (req, res, next) => {
    const { categoryId } = req.params;

    const jobs = await JobRepositories.getJobsByCategoryId(categoryId);

    return response(res, 200, 'Jobs retrieved successfully', { jobs: jobs });
};