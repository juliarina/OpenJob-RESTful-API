import CompanyRepositories from "../repositories/company-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CacheService from "../../../cache/redis-config.js";

export const createCompany = async (req, res, next) => {
    const { name, location, description } = req.validated;

    const company = await CompanyRepositories.createCompany({
        name,
        location,
        description
    });

    if (!company) {
        return next(new InvariantError('Failed to create company'));
    }

    await CacheService.delete(`companies:${company.id}`);

    return response(res, 201, 'Company added successfully', company);
};

export const editCompany = async (req, res, next) => {
    const { id } = req.params;
    const { name, location, description } = req.validated;

    const company = await CompanyRepositories.editCompany({
        id,
        name,
        location,
        description
    });

    if (!company) {
        return next(new NotFoundError('Company not found'));
    }

    await CacheService.delete(`companies:${id}`);

    return response(res, 200, 'Company updated successfully', company);
};

export const deleteCompany = async (req, res, next) => {
    const { id } = req.params;

    const deletedCompany = await CompanyRepositories.deleteCompany(id);

    if (!deletedCompany?.id) {
        return next(new NotFoundError('Company not found'));
    }

    await CacheService.delete(`companies:${id}`);

    return response(res, 200, 'Company deleted successfully', deletedCompany.id);
};

export const getCompanies = async (req, res, next) => {
    const companies = await CompanyRepositories.getCompanies();

    return response(res, 200, 'Companies retrieved successfully', { companies: companies });
};

export const getCompanyById = async (req, res, next) => {
    const { id } = req.params;
    let company;

    try {
        company = JSON.parse(await CacheService.get(`companies:${id}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch (error) {
        company = await CompanyRepositories.getCompanyById(id);

        if (!company) {
            return next(new NotFoundError('Company not found'));
        }

        await CacheService.set(`companies:${id}`, JSON.stringify(company));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'Company retrieved successfully', company);
};
