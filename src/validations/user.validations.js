const Joi = require('joi');

const userSchemas = {
    register: Joi.object({
        nickname: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).max(20).required(),
        password: Joi.string().min(8).required()
    }),

    getById: Joi.object({
        id: Joi.number().integer().min(1).required()
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }),

    update: Joi.object({
           field: Joi.string().valid('nickname', 'email', 'phone', 'is_active').required(),
           value: Joi.alternatives().try(Joi.string(), Joi.boolean()).required()
    }),

    delete: Joi.object({
        id: Joi.number().integer().required()
    }),
}

module.exports = userSchemas;