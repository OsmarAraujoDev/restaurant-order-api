const Joi = require('joi');

const orderSchema = {

    create: Joi.object({
        observation: Joi.string().min(2).max(255).optional(),
        address: Joi.object({
            street: Joi.string().required(),
            number: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            observation: Joi.string().max(255).optional()
        }).required(),
        paymentMethod: Joi.number().integer().required(),
        products: Joi.array().items(
            Joi.object({
                price: Joi.number().precision(2).required(),
                quantity: Joi.number().integer().min(1).required(),
                id: Joi.number().integer().required(),
                observation: Joi.string().max(255).optional()
            })
        ).min(1).required()
    }),

    findAll: Joi.object({
        limit: Joi.number().integer().min(1).max(999999).default(100).optional(),
        offset: Joi.number().integer().min(1).max(999999).default(0).optional(),
        sortBy: Joi.string().valid('id', 'total_price', 'created_at').default('id').optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC').optional(),
        id: Joi.number().integer().min(1).optional(),
        user_nickname: Joi.string().min(2).max(100).optional(),
        created_at_start: Joi.date().iso().optional(),
        created_at_start: Joi.date().iso().optional(),
        status: Joi.number().valid(1, 2, 3, 4, 5).optional()
    }),

    update: Joi.object({
        field: Joi.string().valid('delivery_at', 'status', 'was_paid').required(),
        value: Joi.alternatives().try(Joi.string().min(2), Joi.number().integer(), Joi.boolean()).required()
    })

}

module.exports = orderSchema;