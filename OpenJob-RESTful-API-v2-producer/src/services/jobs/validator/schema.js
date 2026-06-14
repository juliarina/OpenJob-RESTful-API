import Joi from "joi";

export const jobPayloadSchema = Joi.object({
    company_id: Joi.string().required(),
    category_id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    job_type: Joi.string(),
    experience_level: Joi.string(),
    location_type: Joi.string(),
    location_city: Joi.string(),
    salary_min: Joi.number(),
    salary_max: Joi.number(),
    is_salary_visible: Joi.boolean().default(false),
    status: Joi.string().default('open'),
});

export const editJobPayloadSchema = Joi.object({
    company_id: Joi.string(),
    category_id: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    job_type: Joi.string(),
    experience_level: Joi.string(),
    location_type: Joi.string(),
    location_city: Joi.string(),
    salary_min: Joi.number(),
    salary_max: Joi.number(),
    is_salary_visible: Joi.boolean(),
    status: Joi.string(),
});