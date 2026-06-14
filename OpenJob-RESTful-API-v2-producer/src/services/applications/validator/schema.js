import Joi from "joi";

export const applicationPayloadSchema = Joi.object({
   user_id: Joi.string().required(),
   job_id: Joi.string().required(),
   status: Joi.string(), 
});

export const statusUpdatePayloadSchema = Joi.object({
    status: Joi.string().required(),
});