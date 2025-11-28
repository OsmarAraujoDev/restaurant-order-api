const OrderService = require('../services/order.service');
const orderSchema = require('../validations/order.validations');
const logger = require('../utils/logger');

class OrderController {

    static async create(req, res) {
        const { error, value } = orderSchema.create.validate(req.body);
        const { userId } = req.params;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const orderData = {
            observation: value.observation,
            address: value.address,
            paymentMethod: value.paymentMethod,
            userId: userId
        };

        try {
            const order = await OrderService.create(orderData, value.products);

            if (order?.OrderNotCreated) {
                return res.status(500).json({
                    success: false,
                    message: 'falha na operação de criar pedido'
                });
            }

            if (order?.productNotCreated) {
                return res.status(500).json({
                    success: false,
                    message: 'falha na execução de inserir os produtos do pedido'
                });
            }

            return res.status(201).json({
                success: true,
                message: `order.id: ${order}`,
                data: { orderId: order } 
            });
        } catch (err) {
            logger.error('Error in OrderController.create(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    } 

    static async findAll(req, res) {
        const { error, value } = orderSchema.findAll.validate(req.query);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const orders = await OrderService.findAll(value);

            if (!orders.length) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum pedido encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                message: `${orders.length} pedidos encontrados`,
                data: orders
            });
        } catch (err) {
            logger.error('Error in OrderService.findAll(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }

    static async update(req, res) {
        const { error, value } = orderSchema.update.validate(req.body);
        const { id } = req.params;
        
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const order = await OrderService.update({
                field: value.field,
                value: value.value,
                orderId: id
            });

            if (order?.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum produto encontrado com esse id'
                });
            }

            if (!order.isUpdated) {
                return res.status(404).json({
                    success: false,
                    message: 'falha na operação de atualizar pedido'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'pedido atualizado com sucesso'
            });
        } catch (err) {
            logger.error('Error in OrderController.update(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (typeof Number(id) != 'number') {
            return res.statu(400).json({
                success: false,
                message: ''
            });
        }

        try {
            const order = await OrderService.delete(id);

            if (order?.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum pedido encontrado com esse id'
                });
            }

             if (!order.isDeleted) {
                return res.status(404).json({
                    success: false,
                    message: 'falha na operação de deletar pedido'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'pedido deletado com sucesso'
            });
        } catch (err) {
            logger.error('Error in OrderController.delete(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }
}

module.exports = OrderController;