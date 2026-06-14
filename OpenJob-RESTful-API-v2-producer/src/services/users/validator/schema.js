import Joi from 'joi';

export const userPayloadSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
});