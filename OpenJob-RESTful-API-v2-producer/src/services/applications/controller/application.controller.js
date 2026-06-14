import ApplicationRepositories from "../repositories/application-repositories.js";
import { ClientError, InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CacheService from "../../../cache/redis-config.js";
import ApplicationService from "../producers/application-service.js";

export const createApplication = async (req, res, next) => {
    const { user_id, job_id, status } = req.validated;
    let application;
    
    try {
        application = await ApplicationRepositories.createApplication({
            user_id, 
            job_id, 
            status
        });
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'unique_user_job') {
            throw new ClientError('You have already applied for this job');
        }
        next(error);
    }
    
    if (!application) {
        return next(new InvariantError('Failed to create application'));
    }

    await CacheService.delete(`applications:${application.id}`);
    await CacheService.delete(`applications:user:${user_id}`);
    await CacheService.delete(`applications:job:${job_id}`);

    const message = {
        application_id: application.id,
    };
    
    await ApplicationService.sendMessage('process:application', JSON.stringify(message));

    return response(res, 201, 'Application added successfully', application);
};

export const editApplicationStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.validated;

    const application = await ApplicationRepositories.editApplicationStatus({ id, status });

    if (!application) {
        return next(new NotFoundError('Application not found'));
    }

    await CacheService.delete(`applications:${id}`);
    await CacheService.delete(`applications:user:${application.user_id}`);
    await CacheService.delete(`applications:job:${application.job_id}`);

    return response(res, 200, 'Application updated successfully', application);
};

export const deleteApplication = async (req, res, next) => {
    const { id } = req.params;

    const deletedApplication = await ApplicationRepositories.deleteApplication(id);

    if (!deletedApplication?.id) {
        return next(new NotFoundError('Application not found'));
    }

    await CacheService.delete(`applications:${id}`);
    await CacheService.delete(`applications:user:${deletedApplication.user_id}`);
    await CacheService.delete(`applications:job:${deletedApplication.job_id}`);

    return response(res, 200, 'Application deleted successfully', deletedApplication);
};

export const getApplications = async (req, res, next) => {
    const applications = await ApplicationRepositories.getApplications();

    return response(res, 200, 'Applications retrieved successfully', { applications: applications });
};

export const getApplicationById = async (req, res, next) => {
    const { id } = req.params;
    let application;

    try {
        application = JSON.parse(await CacheService.get(`applications:${id}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch(error) {
        application = await ApplicationRepositories.getApplicationById(id);

        if (!application) {
            return next(new NotFoundError('Application not found'));
        }

        await CacheService.set(`applications:${id}`, JSON.stringify(application));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'Application retrieved successfully', application);
};

export const getApplicationsByUserId = async (req, res, next) => {
    const { userId } = req.params;
    let applications;

    try {
        applications = await JSON.parse(await CacheService.get(`applications:user:${userId}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch (error) {
        applications = await ApplicationRepositories.getApplicationsByUserId(userId);

        await CacheService.set(`applications:user:${userId}`, JSON.stringify(applications));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'Applications retrieved successfully', { applications: applications });
};

export const getApplicationsByJobId = async (req, res, next) => {
    const { jobId } = req.params;

    let applications;

    try {
        applications = await JSON.parse(await CacheService.get(`applications:job:${jobId}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch (error) {
        applications = await ApplicationRepositories.getApplicationsByJobId(jobId);

        await CacheService.set(`applications:job:${jobId}`, JSON.stringify(applications));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'Applications retrieved successfully', { applications: applications });
};