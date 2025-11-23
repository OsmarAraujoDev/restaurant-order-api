const Joi = require('joi');

const productSchema = {
    create: Joi.object({
        name: Joi.string().min(2).max(100).required(), 
        description: Joi.string().min(2).max(255).required(),
        price: Joi.number().precision(2).required()
    }),

    findAll: Joi.object({
        limit: Joi.number().integer().min(1).max(999999).default(100).optional(),
        offset: Joi.number().integer().min(1).max(999999).default(0).optional(),
        sortBy: Joi.string().valid('id', 'name', 'price').default('id').optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC').optional(),
        id: Joi.number().integer().min(1).optional(),
        name: Joi.string().min(2).max(100).optional(),
        description: Joi.string().min(2).max(255).optional(),
        price_start: Joi.number().precision(2).optional(),
        price_end: Joi.number().precision(2).optional()
    }),

    update: Joi.object({
        field: Joi.string().valid('name', 'description', 'price', 'discount').required(),
        value: Joi.alternatives().try(Joi.string().min(2), Joi.number().precision(2)).required()
    })
}

module.exports = productSchema;